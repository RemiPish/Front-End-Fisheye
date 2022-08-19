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


async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers);
};

init();
