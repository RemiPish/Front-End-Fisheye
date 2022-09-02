class photographer {


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
        const img = document.createElement('img');
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", `La photo du photographe ${this.name}`);


        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        h2.ariaLabel = `Nom du photographe: ${this.name}`;

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
        contactBtn.setAttribute("onclick", '_blank');

        const photographerInfo = document.createElement("div")
        photographerInfo.className += "photographer-info";

        photographerInfo.appendChild(h2);
        photographerInfo.appendChild(divLocation);
        photographerInfo.appendChild(divTagline);

        article.appendChild(photographerInfo);
        article.appendChild(contactBtn);
        article.appendChild(img)


        return (article);
    }

    renderIndex() {
        const article = document.createElement('article');

        const anchor = document.createElement('a');
        anchor.setAttribute("href", `/photographer.html?id=${this.id}`);
        anchor.setAttribute("target", '_blank');
        anchor.ariaLabel = `Aller sur la page de : ${name}`;

        const img = document.createElement('img');
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", `La photo du photographe ${this.name}`);

        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        h2.ariaLabel = `Nom du photographe: ${this.name}`;

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
        anchor.appendChild(img);
        anchor.appendChild(h2);
        anchor.appendChild(divLocation);
        anchor.appendChild(divTagline);
        anchor.appendChild(divPrice);

        return (article);
    }
}

