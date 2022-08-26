//Mettre le code JavaScript lié à la page photographer.html
function getPhotographerByID(id) {
    let photographer = photographers.filter(elt => parseInt(id) === elt.id);
    return photographer[0];
}

async function displayData() {
    let mediaList = await getPhotographerMedia();

    const photographerData = getPhotographerByID(getPhotographerID());
    const photographerName = photographerData.name;
    let photographerClass = new photographer(photographerData);

    const photographersSection = document.querySelector(".photograph-header");
    photographersSection.appendChild(photographerClass.render());

    const mediaSection = document.querySelector(".media-list");
    mediaList.forEach((elt) => {
        let media = new photographerMedia(elt, photographerName);
        mediaSection.appendChild(media.render());
    });


};

async function init() {
    photographers = await getPhotographers();
    displayData();
    
};

init();