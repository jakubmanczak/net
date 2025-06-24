use std::env;
use std::env::VarError;
use std::path::Path;
use std::path::PathBuf;
use std::process::Command;

pub fn get_binary_path() -> Result<PathBuf, VarError> {
    env::var("TAILWIND_BIN").map(PathBuf::from)
}

pub fn watch_css() -> Result<(), Box<dyn std::error::Error>> {
    println!("Building CSS in watch mode with Tailwind...");
    let bin = match get_binary_path() {
        Ok(b) => b,
        Err(e) => return Err(format!("Tailwind binary unavailable: {}", e).into()),
    };
    let basedir = std::env::var("CARGO_MANIFEST_DIR").unwrap_or_else(|_| ".".into());
    let input = Path::new(&basedir).join("web").join("input.css");
    let inputstr = input.to_str().unwrap();
    let output = Path::new(&basedir).join("web").join("styles.css");
    let outputstr = output.to_str().unwrap();
    let args = vec!["-i", inputstr, "-o", outputstr, "--watch"];

    let child = Command::new(&bin).args(args).spawn()?;
    println!("Tailwind watch process has PID: {:?}", child.id());

    Ok(())
}

pub fn build_css() -> Result<(), Box<dyn std::error::Error>> {
    println!("Building CSS with Tailwind...");

    let bin = match get_binary_path() {
        Ok(b) => b,
        Err(e) => return Err(format!("Tailwind binary unavailable: {}", e).into()),
    };
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
