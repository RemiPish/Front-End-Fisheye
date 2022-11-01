import photographer from "../factories/photographer.js";
import { getData, getMedia, getPhotographers } from "../fetchData.js";
import { displayModal } from "../utils/contactForm.js";
import mediaFactory from "../factories/mediaFactory.js";


export let photographerName = "";
let totalLikes = 0;
let photographerClass;
let medias = [];
let selectedMediaID = "";
const lightboxContainer = document.querySelector(".lightbox-container");
export const lightboxImg = document.querySelector(".lightbox-img");
const prevMediaBtn = document.querySelector('.lightbox-prev');
const nextMediaBtn = document.querySelector('.lightbox-next');
let isLightboxOpen = false;
let sortType = "popularite";



//retourne le photographe en fonction de son id
function getPhotographerByID(photographers, id) {
    let photographer = photographers.filter(elt => parseInt(id) === elt.id);
    return photographer[0];
}

//affiche les info du photographe en fonction de son id
function displayPhotographer(photographers, id) {
    const photographerData = getPhotographerByID(photographers, id);
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

function hydrate(mediaList, id) {
    let list = mediaList.filter(elt => {
        return id == elt.photographerId;
    });
    let factory = new mediaFactory();
    list.forEach(item => {
        medias.push(factory.build(item, photographerName))
    })
}

function display(medias) {
    const mediaSection = document.querySelector(".media-list");
    console.log(sortType)
    mediaSection.innerHTML = '';

    switch (sortType) {
        case 'popularite': {
            medias.sort((a, b) => a.mediaLikes > b.mediaLikes ? -1 : 1);
            console.log("ZULUL");
        }
            break;
        case 'titre': {
            medias.sort((a, b) => a.mediaName > b.mediaName ? 1 : -1);
            console.log("POG");
        }
            break;
        case 'date': {
            medias.sort((a, b) => a.mediaDate > b.mediaDate ? 1 : -1);
            console.log("Pepepains");
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

export function openLightbox(mediaElt) {
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

    const lightboxCloseButton = document.querySelector(".lightbox-close");
    lightboxCloseButton.addEventListener("click", closeLightbox);

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

export function closeLightbox() {
    isLightboxOpen = false;
    lightboxContainer.style.display = "none";
}

export function showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function listenDropdown() {
    document.getElementById('sort-select').addEventListener('click', function () {
        this.querySelector('.select').classList.toggle('open');
    })

    for (const option of document.querySelectorAll(".dropdown-option")) {
        option.addEventListener('click', function () {
            let optionText = this.textContent;
            let optionValue = this.dataset.value;
            sortType = optionValue;
            document.getElementById('sort-select').classList.add('open');
            this.textContent = this.closest('.select').querySelector('.dropdown-btn span').textContent;
            this.dataset.value = this.closest('.select').querySelector('.dropdown-btn span').dataset.value;
            this.closest('.select').querySelector('.dropdown-btn span').textContent = optionText;
            this.closest('.select').querySelector('.dropdown-btn span').dataset.value = optionValue;

            display(medias);
            listen(medias);
        })
    }
    window.addEventListener('click', function (e) {
        const select = document.querySelector('.select')
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    });
}

async function init() {
    let id = (new URL(document.location)).searchParams.get('id');
    isLightboxOpen = false;
    let data = await getData();
    displayPhotographer(getPhotographers(data), id);
    let media = getMedia(data);
    hydrate(media, id);
    countTotal();
    displayTotalCount(photographerClass);
    await display(medias);
    listen(medias);
    listenLightbox(medias);

    let contactBtn = document.querySelector(".contact_button");
    contactBtn.addEventListener("click", displayModal);
    contactBtn.setAttribute('aria-label', "ouvrir la modale formulaire");

    listenDropdown();

}

init();


