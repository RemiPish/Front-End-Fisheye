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

//affiche le nombre total de like sur les photos d'un photographe sur sa page de profil
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

//remplit la liste de media d'un photographe
function hydrate(mediaList, id) {
    let list = mediaList.filter(elt => {
        return id == elt.photographerId;
    });
    let factory = new mediaFactory();
    list.forEach(item => {
        medias.push(factory.build(item, photographerName))
    })
}

//affiche les medias sur la page du profil du photographe en ordre en fonction du filtre (popularite, titre, date)
function display(medias) {
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

//ecoute les events sur les coeurs pour chaque media afin d'incrementer son like/ like total du photographe
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

//compte le nombre total de like du photographe
function countTotal() {
    totalLikes = 0;
    medias.forEach(elt => {
        totalLikes += elt.mediaLikes;
    })
}

//ouvre le lightbox au clique sur un media
export function openLightbox(mediaElt) {
    isLightboxOpen = true;
    lightboxContainer.style.display = "block";
    selectedMediaID = mediaElt.id;
    checkLightboxArrows(mediaElt);
}

//ecoute les events sur lightbox pour aller sur le media precedent/suivant avec fleches au clique- fleche de clavier ainsi que pour fermer le lightbox
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
    document.addEventListener("keydown", ({ key }) => {
        if (key === "Escape") {
            closeLightbox();
        }
    })

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

//verifie la visibilite des fleches de lightbox au premier/dernier media de la liste
function checkLightboxArrows(mediaElt) {
    prevMediaBtn.style.visibility = "visible";
    nextMediaBtn.style.visibility = "visible";
    prevMediaBtn.disabled = false;
    nextMediaBtn.disabled = false;
    if (mediaElt === medias[0]) {
        prevMediaBtn.style.visibility = "hidden";
        prevMediaBtn.disabled = true;
        nextMediaBtn.focus();
    }
    else if (mediaElt === medias[medias.length - 1]) {
        nextMediaBtn.style.visibility = "hidden";
        nextMediaBtn.disabled = true;
        prevMediaBtn.focus();
    }
    else prevMediaBtn.focus();
}

//ferme le lightbox
export function closeLightbox() {
    isLightboxOpen = false;
    lightboxContainer.style.display = "none";
}

//ecoute les event du dropdown de tri: ouvre au clique, selectionne le tri, ferme lors qu'on clique ailleur
function listenDropdown() {
    document.getElementById('sort-select').addEventListener('click', function () {
        this.querySelector('.select').classList.toggle('open');
    })

    document.getElementById('sort-select').addEventListener('focusin', function () {
        document.addEventListener("keydown", ({ key }) => {
            if (key === "Enter") {
                this.querySelector('.select').classList.toggle('open');

            }
        })
    })


    for (const option of document.querySelectorAll(".dropdown-option")) {
        option.setAttribute("aria-label", `Selectionner ${option.dataset.value}`)

        option.addEventListener('click', function () {

            let optionText = option.textContent;
            let optionValue = option.dataset.value;
            sortType = optionValue;

            option.textContent = this.closest('.select').querySelector('.dropdown-btn a').textContent;
            option.dataset.value = this.closest('.select').querySelector('.dropdown-btn a').dataset.value;
            option.setAttribute("aria-label", `Selectionner ${option.dataset.value}`)

            this.closest('.select').querySelector('.dropdown-btn a').textContent = optionText;
            this.closest('.select').querySelector('.dropdown-btn a').dataset.value = optionValue;
            this.closest('.select').querySelector('.dropdown-btn a').setAttribute("aria-label", `Selectionner ${optionValue}`)


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


