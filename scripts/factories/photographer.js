export default class photographer {


    constructor(data) {
        const photographer = data;
        this.name = photographer['name'];
        this.picture = `assets/photographers/Photographers_ID_Photos/${photographer['portrait']}`;
        this.location = `${photographer['city']}, ${photographer['country']}`;
        this.tagline = photographer['tagline'];
        this.price = `${photographer['price']}€/jour`;
        this.id = photographer['id'];
    }

    renderPhotographer() {

        const article = document.createElement('article');

        const divImg= document.createElement('div');
        divImg.className += "photographer-img";
        divImg.setAttribute("tabIndex", "0");

        const img = document.createElement('img');
        
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", `La photo du photographe ${this.name}`);


        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        h2.ariaLabel = `Nom du photographe: ${this.name}`;
        h2.setAttribute("tabIndex", "0");

        const divLocation = document.createElement('div');
        divLocation.textContent = this.location;
        divLocation.className += 'location';
        divLocation.ariaLabel = `Venant de : ${this.location}`;

        const divTagline = document.createElement('div');
        divTagline.textContent = this.tagline;
        divTagline.className += 'tagline';
        divTagline.ariaLabel = `Son slogan : ${this.tagline}`;

        const contactBtn = document.createElement('button');
        contactBtn.textContent = "Contactez-moi";
        contactBtn.className += "contact_button";

        const photographerInfo = document.createElement("div")
        photographerInfo.className += "photographer-info";
        photographerInfo.setAttribute("tabIndex", "0");

        photographerInfo.appendChild(h2);
        photographerInfo.appendChild(divLocation);
        photographerInfo.appendChild(divTagline);

        divImg.appendChild(img);
        article.appendChild(photographerInfo);
        article.appendChild(contactBtn);
        article.appendChild(divImg)


        return (article);
    }

    renderIndex() {
        const article = document.createElement('article');

        const anchor = document.createElement('a');
        anchor.setAttribute("href", `/photographer.html?id=${this.id}`);
        anchor.setAttribute("aria-describedby",  `Aller sur la page de : ${this.name}`);
        anchor.ariaLabel = `Aller sur la page de : ${this.name}`;

        const divImg= document.createElement('div');
        divImg.className += "photographer-img" 

        const img = document.createElement('img');
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", `La photo du photographe ${this.name}`);

        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        h2.ariaLabel = `Nom du photographe: ${this.name}`;

        const divInfo =document.createElement('div');
        divInfo.setAttribute("tabIndex", "0");

        const divLocation = document.createElement('div');
        divLocation.textContent = this.location;
        divLocation.className += 'location';
        divLocation.ariaLabel = `Venant de : ${this.location}`;

        const divTagline = document.createElement('div');
        divTagline.textContent = this.tagline;
        divTagline.className += 'tagline';
        divTagline.ariaLabel = `Son slogan : ${this.tagline}`;


        const divPrice = document.createElement('div');
        divPrice.textContent = this.price;
        divPrice.className += 'price';
        divPrice.ariaLabel = `Tarif : ${this.price}`;


        article.appendChild(anchor);
        divImg.appendChild(img);
        anchor.appendChild(divImg);
        anchor.appendChild(h2);
        anchor.appendChild(divInfo);
        divInfo.appendChild(divLocation);
        divInfo.appendChild(divTagline);
        divInfo.appendChild(divPrice);

        return (article);
    }
}

