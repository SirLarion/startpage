use actix_files::{Files, NamedFile};
use actix_web::{get, App, HttpRequest, HttpResponse, HttpServer};
use dotenv::dotenv;
use error::AppError;

use std::{env, io, net::Ipv4Addr};

mod error;
mod services;

pub const LOCALHOST: Ipv4Addr = Ipv4Addr::new(127, 0, 0, 1);

#[get("/")]
async fn index(req: HttpRequest) -> Result<HttpResponse, AppError> {
  let file = NamedFile::open("./build/index.html")?;
  Ok(file.into_response(&req))
}

#[actix_web::main]
async fn main() -> io::Result<()> {
  dotenv().ok();

  HttpServer::new(|| {
    App::new()
      .service(services::init_theater)
      .service(services::get_applications)
      .service(services::execute_command)
      .service(services::content::get_content)
      .service(index)
      .service(Files::new("/", "./build"))
  })
  .bind((
    LOCALHOST,
    env::var("PORT")
      .expect("PORT env variable not configured")
      .parse()
      .expect("PORT env variable invalid"),
  ))?
  .run()
  .await
}
