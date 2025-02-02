use std::sync::{Arc, Mutex};
use tauri::{Manager, SystemTray, SystemTrayMenu, SystemTrayMenuItem, CustomMenuItem, SystemTrayEvent};

fn main() {
    // Estado interno para rastrear el estado de las opciones
    let ignore_cursor_events = Arc::new(Mutex::new(false));
    let always_on_top = Arc::new(Mutex::new(false));

    // Crear un menú para el system tray
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("toggle_ignore_cursor".to_string(), "Ignorar eventos del cursor"))
        .add_item(CustomMenuItem::new("toggle_always_on_top".to_string(), "Siempre visible"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("quit".to_string(), "Salir"));

    // Clonar los estados para usarlos dentro del closure
    let ignore_cursor_events_clone = Arc::clone(&ignore_cursor_events);
    let always_on_top_clone = Arc::clone(&always_on_top);

    tauri::Builder::default()
        .system_tray(SystemTray::new().with_menu(tray_menu))
        .on_system_tray_event(move |app, event| {
            match event {
                SystemTrayEvent::MenuItemClick { id, .. } => {
                    let window = app.get_window("main").unwrap();
                    match id.as_str() {
                        "toggle_ignore_cursor" => {
                            let mut ignore_cursor_events = ignore_cursor_events_clone.lock().unwrap();
                            *ignore_cursor_events = !*ignore_cursor_events;
                            window.set_ignore_cursor_events(*ignore_cursor_events).unwrap();
                            let tray_handle = app.tray_handle();
                            let new_label = if *ignore_cursor_events {
                                "Habilitar eventos del cursor"
                            } else {
                                "Ignorar eventos del cursor"
                            };
                            tray_handle.get_item(&id).set_title(new_label).unwrap();
                        }
                        "toggle_always_on_top" => {
                            let mut always_on_top = always_on_top_clone.lock().unwrap();
                            *always_on_top = !*always_on_top;
                            window.set_always_on_top(*always_on_top).unwrap();
                            let tray_handle = app.tray_handle();
                            let new_label = if *always_on_top {
                                "Desactivar siempre visible"
                            } else {
                                "Siempre visible"
                            };
                            tray_handle.get_item(&id).set_title(new_label).unwrap();
                        }
                        "quit" => {
                            std::process::exit(0);
                        }
                        _ => {}
                    }
                }
                _ => {}
            }
        })
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            window.set_ignore_cursor_events(false).unwrap();
            window.set_always_on_top(false).unwrap();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}