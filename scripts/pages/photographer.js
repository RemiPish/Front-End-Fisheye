//Mettre le code JavaScript lié à la page photographer.html
let photographerName = "";
let totalLikes = 0;
let photographerClass;
let medias = [];
let selectedMediaID = "";
const lightboxContainer = document.querySelector(".lightbox-container");

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
    listenLightbox(medias);

    let contactBtn = document.querySelector(".contact_button");
    contactBtn.addEventListener("click", displayModal);

    let sortDropdown = document.getElementById("sort-select");
    sortDropdown.addEventListener("change", () => {
        sortType = sortDropdown.value;
        display(medias);
        listen(medias);
        listenLightbox(medias);
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

function listenLightbox(medias) {
    const lightbox = document.querySelector(".lightbox-img");
    const mediaList = document.querySelectorAll('.media');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const closeBtn = document.querySelector('.lightbox-close');
    const mediaTitle = document.createElement('div');
    mediaList.forEach(media => {
        media.addEventListener('click', () => {
            lightboxContainer.style.display = "block";
            this.selectedMediaID = String(media.parentNode.getAttribute('data-id'));
            //console.log(media.nodeName);
            //console.log(media.parentNode.getAttribute('data-id'));
            const img = document.createElement('img');
            img.src = media.src;
            mediaTitle.className = "img-text";
            mediaTitle.textContent = media.getAttribute('alt');
            lightbox.innerHTML = "";
            lightbox.appendChild(img);
            lightbox.appendChild(mediaTitle);
            prevBtn.style.visibility = "visible";
            nextBtn.style.visibility = "visible";
            prevBtn.disabled = false;
            nextBtn.disabled = false;
            if (this.selectedMediaID === String(medias[0]['id'])) {
                prevBtn.style.visibility = "hidden";
                prevBtn.disabled = true;
            }
            if (this.selectedMediaID === String(medias[medias.length - 1]['id'])) {
                nextBtn.style.visibility = "hidden";
                nextBtn.disabled = true;
            }
        })
    })
    prevBtn.addEventListener('click', () => {
        let previousMediaIndex = medias.map((elt => String(elt.id))).indexOf(this.selectedMediaID) - 1;
        let mediaType = medias[previousMediaIndex]['type'];
        this.selectedMediaID = String(medias[previousMediaIndex]['id'])
        switch (mediaType) {
            case 'image':
                const img = document.createElement('img');
                img.src = medias[previousMediaIndex].src
                lightbox.innerHTML = "";
                lightbox.appendChild(img);
                break;

        }
        mediaTitle.className = "img-text";
        mediaTitle.textContent = medias[previousMediaIndex]['mediaName'];
        lightbox.appendChild(mediaTitle);
        prevBtn.style.visibility = "visible";
        nextBtn.style.visibility = "visible";
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        if (this.selectedMediaID === String(medias[0]['id'])) {
            prevBtn.style.visibility = "hidden";
            prevBtn.disabled = true;
        }
        if (this.selectedMediaID === String(medias[medias.length - 1]['id'])) {
            nextBtn.style.visibility = "hidden";
            nextBtn.disabled = true;
        }
    })

    nextBtn.addEventListener('click', () => {
        let nextMediaIndex = medias.map((elt => String(elt.id))).indexOf(this.selectedMediaID) + 1;
        let mediaType = medias[nextMediaIndex]['type'];
        this.selectedMediaID = String(medias[nextMediaIndex]['id'])
        switch (mediaType) {
            case 'image':
                const img = document.createElement('img');
                img.src = medias[nextMediaIndex].src
                lightbox.innerHTML = "";
                lightbox.appendChild(img);
                break;
        }
        mediaTitle.className = "img-text";
        mediaTitle.textContent = medias[nextMediaIndex]['mediaName'];
        lightbox.appendChild(mediaTitle);
        prevBtn.style.visibility = "visible";
        nextBtn.style.visibility = "visible";
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        if (this.selectedMediaID === String(medias[0]['id'])) {
            prevBtn.style.visibility = "hidden";
            prevBtn.disabled = true;
        }
        if (this.selectedMediaID === String(medias[medias.length - 1]['id'])) {
            nextBtn.style.visibility = "hidden";
            nextBtn.disabled = true;
        }
    })
}

function closeLightbox() {
    lightboxContainer.style.display = "none";
}


init();
