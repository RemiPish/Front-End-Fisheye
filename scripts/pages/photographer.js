//Mettre le code JavaScript lié à la page photographer.html
let photographerName = "";
let totalLikes = 0;
let photographerClass;
let medias = [];

let sortType = "popularite";

function getPhotographerByID(id) {
    let photographerList = [...photographers.photographers];
    let photographer = photographerList.filter(elt => parseInt(id) === elt.id);
    return photographer[0];
}

async function displayPhotographer() {

    const photographerData = getPhotographerByID(getPhotographerID());
    photographerName = photographerData.name;
    photographerClass = new photographer(photographerData);

    const photographersSection = document.querySelector(".photograph-header");
    photographersSection.appendChild(photographerClass.renderPhotographer());
};

function displayTotalCount(photographerClass) {

    const totalLikesPriceSection = document.querySelector(".totalLikes-price");

    const totalLikesDiv = document.createElement('div');
    totalLikesDiv.className += "totalLikes";

    const totalLikesNumber = document.createElement('span');
    totalLikesNumber.textContent = totalLikes;
    totalLikesNumber.className += "totalLikesNumber";

    const likeIcon = document.createElement('i');
    likeIcon.className += "totalLikesIcon fa fa-heart";

    const price = document.createElement('span');
    price.textContent = photographerClass.price;
    price.className += "price";

    totalLikesPriceSection.appendChild(totalLikesDiv);
    totalLikesDiv.appendChild(totalLikesNumber);
    totalLikesDiv.appendChild(likeIcon);
    totalLikesPriceSection.appendChild(price);
}

async function init() {
    photographers = await getPhotographers();
    displayPhotographer();
    hydrate([...photographers.media]);
    countTotal();
    displayTotalCount(photographerClass);
    await display(medias);
    listen(medias);

    let contactBtn = document.querySelector(".contact_button");
    contactBtn.addEventListener("click", displayModal);

    let sortDropdown = document.getElementById("sort-select");
    sortDropdown.addEventListener("change", () => {
        sortType = sortDropdown.value;
        display(medias);
    })
};

function hydrate(mediaList) {
    let id = getPhotographerID();
    let list = mediaList.filter(elt => {
        return id == elt.photographerId;
    });
    let factory = new mediaFactory();
    list.forEach(item => {
        medias.push(factory.build(item, photographerName))
    })
}

async function display(medias) {
    const mediaSection = document.querySelector(".media-list");
    removeAllChildNodes(mediaSection);

    switch(sortType)
    {
        case 'popularite':{
            medias.sort((a,b) =>a.mediaLikes>b.mediaLikes  ? -1 : 1);
        }
        break;
        case 'titre':{
            medias.sort((a,b) =>a.mediaName>b.mediaName  ? 1 : -1);
        }
        break;
        case 'date':{
            medias.sort((a,b) =>a.mediaDate>b.mediaDate  ? 1 : -1);
        }
        break;
    }
    medias.forEach((elt) => {
        mediaSection.appendChild(elt.render());
    });
}

function listen(medias) {
    medias.forEach((media) => {
        media.dom.likeButton.addEventListener("click", () => {
            media.toggleLikes();
            countTotal();
            const totalLikesPrice = document.querySelector(".totalLikesNumber");
            totalLikesPrice.textContent = totalLikes;
        })
    })
}

function countTotal() {
    totalLikes = 0;
    medias.forEach(elt => {
        totalLikes += elt.mediaLikes;
    })
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

init();