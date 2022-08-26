let photographers;
let medias;

async function getPhotographers() {
    let path = '../../data/photographers.json';
    let res = await fetch(path);
    let data = await res.json();
    let photographers = [...data.photographers];
    return photographers;
}

async function getMedia() {
    let path = '../../data/photographers.json';
    let res = await fetch(path);
    let data = await res.json();
    let media = [...data.media];
    return media;
}

function getPhotographerID() {
    let params = (new URL(document.location)).searchParams;
    return params.get('id');
}

async function getPhotographerMedia() {
    let id = getPhotographerID();
    const media = await getMedia();
    return media.filter(elt => id == (elt.photographerId))
}

function getPhotographerByID(id) {
    let photographer = photographers.filter(elt => parseInt(id) === elt.id);
    return photographer[0];
}
