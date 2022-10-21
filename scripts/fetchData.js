import { photographers } from "./pages/index.js";
export async function getPhotographers() {
    let path = '../../data/photographers.json';
    let res = await fetch(path);
    let data = await res.json();
    return data;
}


export function getPhotographerID() {
    let params = (new URL(document.location)).searchParams;
    return params.get('id');
}


export function getPhotographerByID(id) {
    let photographer = photographers.filter(elt => parseInt(id) === elt.id);
    return photographer[0];
}
