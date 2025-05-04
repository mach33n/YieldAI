use ort::{inputs, session::{Session, builder::GraphOptimizationLevel}, value::TensorRef};
use serde::de::Error;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn call() -> String {
    return greet("Test").unwrap_or("Random".to_string())
}
fn greet(name: &str) -> Result<String,ort::Error> {
    // Load our model
	let mut session = Session::builder()?
		.with_optimization_level(GraphOptimizationLevel::Level1)?
		.with_intra_threads(1)?
		.commit_from_file("https://cdn.pyke.io/0/pyke:ort-rs/example-models@0.0.0/gpt2.onnx")?;

    return Err(ort::Error::new("Test"));
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![call])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
