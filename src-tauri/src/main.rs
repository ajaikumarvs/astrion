// src-tauri/src/main.rs
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use std::path::PathBuf;
use std::fs;

#[derive(Default)]
#[allow(dead_code)]
struct FileState {
    last_dir: std::sync::Mutex<Option<PathBuf>>,
}

#[tauri::command]
async fn read_file(
    path: String,
    app: tauri::AppHandle,
) -> Result<String, String> {
    // Validate and sanitize the path
    let path = PathBuf::from(path);
    // Ensure the path is within allowed boundaries
    if !is_path_allowed(&path, &app) {
        return Err("Access denied: path is outside allowed boundaries".into());
    }
    fs::read_to_string(&path)
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn write_file(
    path: String,
    content: String,
    app: tauri::AppHandle,
) -> Result<(), String> {
    let path = PathBuf::from(path);
    if !is_path_allowed(&path, &app) {
        return Err("Access denied: path is outside allowed boundaries".into());
    }
    // Ensure parent directory exists
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)
            .map_err(|e| e.to_string())?;
    }
    fs::write(&path, content)
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn list_directory(
    directory: String,
    app: tauri::AppHandle,
) -> Result<Vec<FileEntry>, String> {
    let path = PathBuf::from(directory);
    if !is_path_allowed(&path, &app) {
        return Err("Access denied: path is outside allowed boundaries".into());
    }
    let mut entries = Vec::new();
    for entry in fs::read_dir(path).map_err(|e| e.to_string())? {
        let entry = entry.map_err(|e| e.to_string())?;
        let path = entry.path();
        let metadata = entry.metadata().map_err(|e| e.to_string())?;
        if let Some(name) = path.file_name().and_then(|n| n.to_str()) {
            entries.push(FileEntry {
                name: name.to_string(),
                path: path.to_string_lossy().into_owned(),
                is_file: metadata.is_file(),
                is_directory: metadata.is_dir(),
            });
        }
    }
    Ok(entries)
}

#[derive(serde::Serialize)]
struct FileEntry {
    name: String,
    path: String,
    is_file: bool,
    is_directory: bool,
}

fn is_path_allowed(path: &PathBuf, app: &tauri::AppHandle) -> bool {
    // Use Tauri's path methods for v2
    let app_dir = app.path().app_config_dir()
        .unwrap_or_else(|_| PathBuf::from("."));
    let document_dir = app.path().app_data_dir()
        .unwrap_or_else(|_| PathBuf::from("."));

    // Normalize paths
    let canonical_path = path.canonicalize().unwrap_or_else(|_| path.clone());
    let canonical_app_dir = app_dir.canonicalize().unwrap_or_else(|_| app_dir.clone());
    let canonical_doc_dir = document_dir.canonicalize().unwrap_or_else(|_| document_dir.clone());

    // Check if path is within allowed directories
    canonical_path.starts_with(&canonical_app_dir) ||
    canonical_path.starts_with(&canonical_doc_dir)
}

fn main() {
    tauri::Builder::default()
        .manage(FileState::default())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_clipboard::init())
        .invoke_handler(tauri::generate_handler![
            read_file,
            write_file,
            list_directory
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}