use std::{fmt, io, string::FromUtf8Error};

use actix_web::{
  http::{header::ContentType, StatusCode},
  HttpResponse, ResponseError,
};

use serde_json;

#[derive(Debug)]
pub enum AppError {
  IoError(String),
  CmdError(String),
}

impl fmt::Display for AppError {
  fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
    write!(f, "{:?}", self)
  }
}

impl From<io::Error> for AppError {
  fn from(error: io::Error) -> AppError {
    AppError::IoError(error.to_string())
  }
}

impl From<FromUtf8Error> for AppError {
  fn from(error: FromUtf8Error) -> AppError {
    AppError::IoError(error.to_string())
  }
}

impl From<serde_json::Error> for AppError {
  fn from(error: serde_json::Error) -> AppError {
    AppError::IoError(error.to_string())
  }
}

impl ResponseError for AppError {
  fn error_response(&self) -> HttpResponse {
    HttpResponse::build(self.status_code())
      .insert_header(ContentType::html())
      .body(self.to_string())
  }

  fn status_code(&self) -> StatusCode {
    match *self {
      AppError::IoError(_) => StatusCode::INTERNAL_SERVER_ERROR,
      AppError::CmdError(_) => StatusCode::INTERNAL_SERVER_ERROR,
    }
  }
}
