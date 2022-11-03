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

    //affiche le photographe sur sa page de profil
    renderPhotographer() {

        const article = document.createElement('article');

        const divImg = document.createElement('div');
        divImg.className += "photographer-img";
        divImg.setAttribute("role", "figure");

        const img = document.createElement('img');
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", `La photo du photographe ${this.name}`);
        img.setAttribute("role", "img");

        const h2 = document.createElement('h2');
        h2.textContent = this.name;


        const divLocation = document.createElement('div');
        divLocation.textContent = this.location;
        divLocation.className += 'location';


        const divTagline = document.createElement('div');
        divTagline.textContent = this.tagline;
        divTagline.className += 'tagline';


        const contactBtn = document.createElement('button');
        contactBtn.textContent = "Contactez-moi";
        contactBtn.className += "contact_button";

        const photographerInfo = document.createElement("div")
        photographerInfo.className += "photographer-info";

        photographerInfo.appendChild(h2);
        photographerInfo.appendChild(divLocation);
        photographerInfo.appendChild(divTagline);

        divImg.appendChild(img);
        article.appendChild(photographerInfo);
        article.appendChild(contactBtn);
        article.appendChild(divImg)


        return (article);
    }

    //affiche le photographe sur la page d'index (liste des photographes)
    renderIndex() {
        const article = document.createElement('article');
        article.setAttribute("role", "listitem");

        const anchor = document.createElement('a');
        anchor.setAttribute("href", `/photographer.html?id=${this.id}`);
        anchor.setAttribute("role", "link");
        anchor.ariaLabel = `Aller sur la page du photographe : ${this.name}`;

        const divImg = document.createElement('div');
        divImg.className += "photographer-img"
        divImg.setAttribute("role", "figure");

        const img = document.createElement('img');
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", `La photo du photographe ${this.name}`);
        img.setAttribute("role", "img");

        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        h2.setAttribute("tabIndex", "0");

        const divInfo = document.createElement('div');

        const divLocation = document.createElement('div');
        divLocation.textContent = this.location;
        divLocation.className += 'location';


        const divTagline = document.createElement('div');
        divTagline.textContent = this.tagline;
        divTagline.className += 'tagline';



        const divPrice = document.createElement('div');
        divPrice.textContent = this.price;
        divPrice.className += 'price';



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

