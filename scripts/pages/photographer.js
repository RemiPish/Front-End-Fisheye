//Mettre le code JavaScript lié à la page photographer.html
let photographerName = "";

function getPhotographerByID(id) {
    let photographerList = [...photographers.photographers];
    let photographer = photographerList.filter(elt => parseInt(id) === elt.id);
    return photographer[0];
}

async function displayPhotographer() {

    const photographerData = getPhotographerByID(getPhotographerID());
    photographerName = photographerData.name;
    let photographerClass = new photographer(photographerData);

    const photographersSection = document.querySelector(".photograph-header");
    photographersSection.appendChild(photographerClass.renderPhotographer());

};

async function displayMedia() {
    const mediaSection = document.querySelector(".media-list");
    let id = getPhotographerID();
    let mediaList = [...photographers.media];
    let list = mediaList.filter(elt => {
        return id == elt.photographerId;
    })
    let factory = new mediaFactory();
    let media = [];
    list.forEach(item => {
        media.push(factory.build(item, photographerName))
    })

    media.forEach((elt) => {
        mediaSection.appendChild(elt.render());
    });

}
async function init() {
    photographers = await getPhotographers();
    displayPhotographer();
    displayMedia();

};


init();