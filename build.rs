use std::env;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("cargo:rerun-if-changed=build.rs");

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
