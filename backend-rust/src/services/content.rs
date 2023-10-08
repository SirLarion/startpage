use actix_web::{get, http::header::ContentType, web, HttpResponse};

use super::get_env_var;
use crate::error::AppError;
use std::{fs, path::Path};

#[get("/content/{content_type}")]
pub async fn get_content(content_type: web::Path<String>) -> Result<HttpResponse, AppError> {
  let theater_path = get_env_var("THEATER_PATH");
  let file_names: Vec<String> =
    fs::read_dir(Path::new(&theater_path).join(content_type.to_string()))?
      .filter_map(|res| match res.map(|f| f.file_name().into_string()) {
        Ok(Ok(name)) => Some(name),
        _ => None,
      })
      .collect();

  let content = serde_json::to_string(&file_names)?;

  Ok(
    HttpResponse::Ok()
      .content_type(ContentType::json())
      .body(content),
  )
}
