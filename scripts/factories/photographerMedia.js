function photographerFactory(photographer) {

    const photographerPicture = `assets/photographers/Photographers_ID_Photos/${photographer['portrait']}`;
    const photographerName = photographer['name'];
    const photographerLocation = `${photographer['city']}, ${photographer['country']}`;
    const photographerTagline = photographer['tagline'];
    const photographerPrice = `${photographer['price']}€/jour`;
    const photographerid = photographer['id'];

    function getPhotographerDOM() {
        const article = document.createElement('article');;

        const img = document.createElement('img');
        img.setAttribute("src", photographerPicture);
        img.setAttribute("alt", `La photo du photographe ${photographerName}`);
        img.className += 'photographerImg';

        const h2 = document.createElement('h2');
        h2.textContent = photographerName;
        h2.ariaLabel = `Nom du photographe: ${photographerName}`;
        h2.className += 'photographerName';

        const divLocation = document.createElement('div');
        divLocation.textContent = photographerLocation;
        divLocation.className += 'photographerLocation';
        divLocation.ariaLabel = `Venant de : ${photographerLocation}`;

        const divTagline = document.createElement('div');
        divTagline.textContent = photographerTagline;
        divTagline.className += 'photographerTagline';
        divTagline.ariaLabel = `Son slogan : ${photographerTagline}`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(divLocation);
        article.appendChild(divTagline);
        return (article);
    }

    return { getPhotographerDOM }
}

function mediaFactory(name, media) {

    console.log(name)
    const mediaPicture = `assets/photographers/${name}/${media['image']}`;
    const mediaName = media['name'];

    function getMediaDOM() {
        const div = document.createElement('div');;

        const img = document.createElement('img');
        img.setAttribute("src", mediaPicture);
        img.setAttribute("alt", mediaName);
        img.className += 'mediaImg';

        const h2 = document.createElement('h2');
        h2.textContent = mediaName;
        h2.ariaLabel = `Nom du photo: ${mediaName}`;
        h2.className += 'mediaName';

        div.appendChild(img);
        div.appendChild(h2);
       
        return (div);
    }

    return { getMediaDOM }
}


