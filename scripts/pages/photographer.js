//Mettre le code JavaScript lié à la page photographer.html
let photographerName = "";
let totalLikes = 0;
let photographerClass;
let medias = [];
let selectedMediaID = "";
const lightboxContainer = document.querySelector(".lightbox-container");
const lightboxImg = document.querySelector(".lightbox-img");
const prevMediaBtn = document.querySelector('.lightbox-prev');
const nextMediaBtn = document.querySelector('.lightbox-next');
let isLightboxOpen = false;

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
}

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
    isLightboxOpen = false;
    photographers = await getPhotographers();
    displayPhotographer();
    hydrate([...photographers.media]);
    countTotal();
    displayTotalCount(photographerClass);
    await display(medias);
    listen(medias);
    listenLightbox(medias);

    let contactBtn = document.querySelector(".contact_button");
    contactBtn.addEventListener("click", displayModal);

    let sortDropdown = document.getElementById("sort-select");
    sortDropdown.addEventListener("change", () => {
        sortType = sortDropdown.value;
        display(medias);
        listen(medias);
    })

}

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
    mediaSection.innerHTML = '';

    switch (sortType) {
        case 'popularite': {
            medias.sort((a, b) => a.mediaLikes > b.mediaLikes ? -1 : 1);
        }
            break;
        case 'titre': {
            medias.sort((a, b) => a.mediaName > b.mediaName ? 1 : -1);
        }
            break;
        case 'date': {
            medias.sort((a, b) => a.mediaDate > b.mediaDate ? 1 : -1);
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

function openLightbox(mediaElt) {
    isLightboxOpen = true;
    lightboxContainer.style.display = "block";
    selectedMediaID = mediaElt.id;
    checkLightboxArrows(mediaElt);

}

function listenLightbox() {
    prevMediaBtn.addEventListener('click', () => {
        let previousMediaIndex = medias.map((elt => elt.id)).indexOf(selectedMediaID) - 1;
        medias[previousMediaIndex].showMediaInLightbox();
        selectedMediaID = medias[previousMediaIndex].id;
        checkLightboxArrows(medias[previousMediaIndex]);

    })

    nextMediaBtn.addEventListener('click', () => {
        let nextMediaIndex = medias.map((elt => elt.id)).indexOf(selectedMediaID) + 1;
        medias[nextMediaIndex].showMediaInLightbox();
        selectedMediaID = medias[nextMediaIndex].id;
        checkLightboxArrows(medias[nextMediaIndex]);
    })
}

function checkLightboxArrows(mediaElt) {
    prevMediaBtn.style.visibility = "visible";
    nextMediaBtn.style.visibility = "visible";
    prevMediaBtn.disabled = false;
    nextMediaBtn.disabled = false;
    if (mediaElt === medias[0]) {
        prevMediaBtn.style.visibility = "hidden";
        prevMediaBtn.disabled = true;
    }
    if (mediaElt === medias[medias.length - 1]) {
        nextMediaBtn.style.visibility = "hidden";
        nextMediaBtn.disabled = true;
    }
}

function closeLightbox() {
    isLightboxOpen = false;
    lightboxContainer.style.display = "none";
}


init();
document.onkeydown = function (e) {
    if (isLightboxOpen) {
        switch (e.code) {
            case 'ArrowLeft':
                if (selectedMediaID != medias[0].id) {
                    let previousMediaIndex = medias.map((elt => elt.id)).indexOf(selectedMediaID) - 1;
                    medias[previousMediaIndex].showMediaInLightbox();
                    selectedMediaID = medias[previousMediaIndex].id;
                    checkLightboxArrows(medias[previousMediaIndex]);
                }
                break;
            case 'ArrowRight':
                if (selectedMediaID != medias[medias.length - 1].id) {
                    let nextMediaIndex = medias.map((elt => elt.id)).indexOf(selectedMediaID) + 1;
                    medias[nextMediaIndex].showMediaInLightbox();
                    selectedMediaID = medias[nextMediaIndex].id;
                    checkLightboxArrows(medias[nextMediaIndex]);
                }
                break;

        }
    }
};