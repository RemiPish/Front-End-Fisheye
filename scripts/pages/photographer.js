//Mettre le code JavaScript lié à la page photographer.html
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

async function displayData() {
    let id = getPhotographerID();
    let photographers = await getPhotographers();
    let photographer = photographers.filter(elt => parseInt(id) === elt.id);
    let media = await getPhotographerMedia();

    const photographersSection = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer[0]);
    const photographerDOM = photographerModel.getPhotographerDOM();
    photographersSection.appendChild(photographerDOM);

    const mediaSection = document.querySelector(".media-list");
    media.forEach((elt) => {
        const mediaModel = mediaFactory(photographer[0].name, elt);
        const mediaDOM = mediaModel.getMediaDOM();
        mediaSection.appendChild(mediaDOM);
    });


};

displayData();
