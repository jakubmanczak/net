use image::Luma;
use image::codecs::png::PngEncoder;
use image::{EncodableLayout, ImageEncoder};
use qrcode::{QrCode, render::svg};
use wasm_bindgen::JsCast;
use wasm_bindgen::prelude::*;
use web_sys::js_sys;
use web_sys::{Blob, BlobPropertyBag, Event, HtmlAnchorElement, HtmlInputElement, Url, window};

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen(start)]
pub fn main() {
    let document = window().unwrap().document().unwrap();

    let qr_output = document.query_selector("#qroutput").unwrap().unwrap();
    let qrcode = QrCode::new(&[]).unwrap().render::<svg::Color>().build();
    qr_output.set_inner_html(&qrcode);
    let qr_input: HtmlInputElement = document
        .query_selector("#qrinput")
        .unwrap()
        .unwrap()
        .dyn_into()
        .unwrap();

    let closure = Closure::wrap(Box::new(move |event: Event| {
        let target = event.target();
        let value = if let Some(t) = target {
            if let Ok(input) = t.dyn_into::<HtmlInputElement>() {
                input.value()
            } else {
                String::new()
            }
        } else {
            String::new()
        };

        let document = window().unwrap().document().unwrap();
        let qr_output = match document.query_selector("#qroutput").unwrap() {
            Some(el) => el,
            None => {
                log("qroutput element not found");
                return;
            }
        };

        match QrCode::new(&value) {
            Ok(code) => {
                let svg = code.render::<svg::Color>().build();
                qr_output.set_inner_html(&svg);
            }
            Err(e) => {
                log(&format!("Failed to generate QR code: {:?}", e));
                qr_output.set_inner_html("");
            }
        }
    }) as Box<dyn FnMut(_)>);

    qr_input
        .add_event_listener_with_callback("input", closure.as_ref().unchecked_ref())
        .unwrap();
    closure.forget();

    let download_button = document.query_selector("#downloadsvg").unwrap().unwrap();
    let download_closure = Closure::wrap(Box::new(move |_event: Event| {
        let document = window().unwrap().document().unwrap();
        let qr_output = match document.query_selector("#qroutput").unwrap() {
            Some(el) => el,
            None => {
                log("qroutput element not found");
                return;
            }
        };
        let svg_content = qr_output.inner_html();
        if svg_content.is_empty() {
            log("No QR code to download");
            return;
        }
        let array = js_sys::Array::new();
        array.push(&JsValue::from_str(&svg_content));
        let blob_props = BlobPropertyBag::new();
        blob_props.set_type("image/svg+xml");
        let blob = match Blob::new_with_str_sequence_and_options(&array, &blob_props) {
            Ok(b) => b,
            Err(_) => {
                log("Failed to create blob");
                return;
            }
        };
        let url = match Url::create_object_url_with_blob(&blob) {
            Ok(u) => u,
            Err(_) => {
                log("Failed to create object URL");
                return;
            }
        };
        let a: HtmlAnchorElement = document.create_element("a").unwrap().dyn_into().unwrap();
        a.set_href(&url);
        a.set_download("your-qr-code.svg");
        a.click();

        let _ = Url::revoke_object_url(&url);
    }) as Box<dyn FnMut(_)>);

    download_button
        .add_event_listener_with_callback("click", download_closure.as_ref().unchecked_ref())
        .unwrap();
    download_closure.forget();

    let downloadpng_button = document.query_selector("#downloadpng").unwrap().unwrap();
    let downloadpng_closure = Closure::wrap(Box::new(move |_event: Event| {
        let document = window().unwrap().document().unwrap();
        let value = document
            .query_selector("#qrinput")
            .unwrap()
            .unwrap()
            .dyn_into::<HtmlInputElement>()
            .unwrap()
            .value();
        let qr = QrCode::new(&value)
            .unwrap()
            .render::<Luma<u8>>()
            .min_dimensions(1024, 1024)
            .build();

        let mut png_data = Vec::new();
        let encoder = PngEncoder::new(&mut png_data);
        if let Err(e) = encoder.write_image(
            qr.as_bytes(),
            qr.width() as u32,
            qr.height() as u32,
            image::ExtendedColorType::L8,
        ) {
            log(&format!("Failed to encode PNG: {:?}", e));
            return;
        }

        let uint8_array = js_sys::Uint8Array::new_with_length(png_data.len() as u32);
        uint8_array.copy_from(&png_data);

        let array = js_sys::Array::new();
        array.push(&uint8_array);

        let blob_props = BlobPropertyBag::new();
        blob_props.set_type("image/png");
        let blob = match Blob::new_with_u8_array_sequence_and_options(&array, &blob_props) {
            Ok(b) => b,
            Err(_) => {
                log("Failed to create blob");
                return;
            }
        };
        let url = match Url::create_object_url_with_blob(&blob) {
            Ok(u) => u,
            Err(_) => {
                log("Failed to create object URL");
                return;
            }
        };
        let a: HtmlAnchorElement = document.create_element("a").unwrap().dyn_into().unwrap();
        a.set_href(&url);
        a.set_download("your-qr-code.png");
        a.click();

        let _ = Url::revoke_object_url(&url);
    }) as Box<dyn FnMut(_)>);

    downloadpng_button
        .add_event_listener_with_callback("click", downloadpng_closure.as_ref().unchecked_ref())
        .unwrap();
    downloadpng_closure.forget();
}
