use std::env;
use std::error::Error;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;

use wasm_bindgen_cli_support::Bindgen;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rerun-if-changed=web");
    println!("cargo:rerun-if-changed=wasm-qr");

    let os = env::var("CARGO_CFG_TARGET_OS").unwrap_or_else(|_| String::from("unknown"));
    let arch = env::var("CARGO_CFG_TARGET_ARCH").unwrap_or_else(|_| String::from("unknown"));
    let download_url = match (os.as_str(), arch.as_str()) {
        ("macos", "aarch64") => {
            "https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-arm64"
        }
        ("linux", "x86_64") => {
            "https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64"
        }
        ("linux", "aarch64") => {
            "https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-arm64"
        }
        _ => return Err(format!("Unsupported platform: {} {}", os, arch).into()),
    };

    let out_dir = PathBuf::from(env::var("OUT_DIR")?);
    let tailwind_binary = out_dir.join("tailwind");
    fs::create_dir_all(&out_dir)?;

    download_tailwind(&download_url, &tailwind_binary)?;

    println!("cargo:rustc-env=TAILWIND_BIN={}", tailwind_binary.display());

    run_tailwind(&tailwind_binary)?;

    compile_wasm_qr()?;
    Ok(())
}

fn compile_wasm_qr() -> Result<(), Box<dyn Error>> {
    let manifest_dir = PathBuf::from(env::var("CARGO_MANIFEST_DIR")?);
    let status = Command::new("cargo")
        .args(&[
            "build",
            "-p",
            "wasm-qr",
            "--target",
            "wasm32-unknown-unknown",
            "--target-dir",
            "target-wasm",
            "--release",
        ])
        .current_dir(&manifest_dir)
        .status()?;

    if !status.success() {
        return Err("cargo build for wasm-qr failed".into());
    }

    let wasm_file = manifest_dir
        .join("target-wasm")
        .join("wasm32-unknown-unknown")
        .join("release")
        .join("wasm_qr.wasm");

    if !wasm_file.exists() {
        return Err(format!(
            "expected wasm output at '{}' but it does not exist",
            wasm_file.display()
        )
        .into());
    }

    Bindgen::new()
        .input_path(&wasm_file)
        .web(true)?
        .generate(PathBuf::from(env::var("CARGO_MANIFEST_DIR")?).join("web"))?;
    Ok(())
}

fn run_tailwind(bin: &PathBuf) -> Result<(), Box<dyn Error>> {
    println!("Building CSS with Tailwind...");

    let basedir = std::env::var("CARGO_MANIFEST_DIR").unwrap_or_else(|_| ".".into());
    let input = Path::new(&basedir).join("web").join("input.css");
    let inputstr = input.to_str().unwrap();
    let output = Path::new(&basedir).join("web").join("styles.css");
    let outputstr = output.to_str().unwrap();
    let args = vec!["-i", inputstr, "-o", outputstr, "--minify"];

    let run = Command::new(&bin).args(args).status()?;
    match run.success() {
        true => println!("Tailwind CSS build complete."),
        false => println!("Tailwind CSS build failed."),
    };
    Ok(())
}

fn download_tailwind(url: &str, target_path: &Path) -> Result<(), Box<dyn std::error::Error>> {
    if target_path.exists() {
        return Ok(()); // if present, assume the file is the appropriate tailwind binary
    }

    let tmp_download = target_path.with_extension("tmp");
    let download_status = if Command::new("curl").arg("--version").output().is_ok() {
        Command::new("curl")
            .arg("-L") // Follow redirects
            .arg("-o")
            .arg(&tmp_download)
            .arg(url)
            .status()?
    } else if Command::new("wget").arg("--version").output().is_ok() {
        Command::new("wget")
            .arg("-O")
            .arg(&tmp_download)
            .arg(url)
            .status()?
    } else {
        return Err("Neither curl nor wget is available".into());
    };

    if !download_status.success() {
        return Err(format!("Tailwind binary download failed: {}", download_status).into());
    }
    fs::rename(&tmp_download, target_path)?;

    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let mut perms = fs::metadata(target_path)?.permissions();
        perms.set_mode(0o777);
        fs::set_permissions(target_path, perms)?;
    }

    Ok(())
}
