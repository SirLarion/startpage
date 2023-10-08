use actix_web::http::header::ContentType;
use actix_web::{get, post, web, HttpResponse};
use serde::{Deserialize, Serialize};

use std::process::Command;
use std::{env, fs, path::Path};

use crate::error::AppError;

pub mod content;
pub mod play;

pub fn get_env_var(var_name: &str) -> String {
  let var = env::var(var_name).expect(&format!("{} env var not configured", var_name));
  var
}

fn run_cmd(cmd: String, args: &[&str]) -> Result<String, AppError> {
  let output = Command::new(cmd).args(args).output()?;
  let stdout = String::from_utf8(output.stdout)?;
  let stderr = String::from_utf8(output.stderr)?;
  let status_code = output.status.code().unwrap_or(1);

  if status_code == 0 {
    Ok(stdout)
  } else {
    Err(AppError::CmdError(stderr))
  }
}

#[get("/run/pirate-init")]
pub async fn init_theater() -> Result<HttpResponse, AppError> {
  let theater_path = get_env_var("THEATER_PATH");
  if Path::new(&theater_path).exists() {
    Ok(HttpResponse::Ok().body("Initialized"))
  } else {
    let uuid = get_env_var("DISK_UUID");
    let _ = run_cmd(
      "sh".to_string(),
      &[
        "-c",
        &format!("cat .env.pwd | sudo -S mount -t ntfs UUID={uuid} /mnt/hdd > /dev/null 2>&1"),
      ],
    );

    if Path::new(&theater_path).exists() {
      Ok(HttpResponse::Ok().body("Initialized"))
    } else {
      Err(AppError::IoError("Theater content not found".to_string()))
    }
  }
}

#[get("/run/{cmd}")]
pub async fn execute_command(cmd: web::Path<String>) -> Result<HttpResponse, AppError> {
  let mut args: Vec<&str> = vec![];
  let mut iter = cmd.split(' ');
  let command = iter.next().unwrap_or("exit").to_string();
  while let Some(arg) = iter.next() {
    args.push(arg);
  }
  let stdout = run_cmd(command, &args[..])?;

  Ok(HttpResponse::Ok().body(stdout))
}

#[derive(Serialize, Deserialize)]
pub struct Mode {
  mode: String,
  apps: Vec<String>,
}

#[get("/applications")]
pub async fn get_applications() -> Result<HttpResponse, AppError> {
  let app_type = get_env_var("TYPE");
  let file_path = app_type.clone() + ".json";
  let file = fs::read_to_string(&file_path)?;

  Ok(
    HttpResponse::Ok()
      .content_type(ContentType::json())
      .body(file),
  )
}

#[post("/applications")]
pub async fn set_applications(json: web::Json<Mode>) -> Result<HttpResponse, AppError> {
  let app_type = get_env_var("TYPE");
  let file_path = app_type.clone() + ".json";

  fs::write(file_path, serde_json::to_string_pretty(&json).unwrap())?;
  Ok(HttpResponse::Ok().body("Updated"))
}
