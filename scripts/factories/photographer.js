function photographerFactory(data) {

    const photographer = data;
    const picture = `assets/photographers/Photographers_ID_Photos/${photographer['portrait']}`;
    const name = photographer['name'];
    const location = `${photographer['city']}, ${photographer['country']}`;
    const tagline = photographer['tagline'];
    const price = `${photographer['price']}€/jour`;
    const id = photographer['id'];

    function getUserCardDOM() {
        const article = document.createElement('article');

        const anchor = document.createElement('a');
        anchor.setAttribute("href", `/photographer.html?id=${id}`);
        anchor.setAttribute("target", '_blank');
        anchor.ariaLabel = `Aller sur la page de : ${name}`;

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `La photo du photographe ${name}`);

        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.ariaLabel = `Nom du photographe: ${name}`;

        const divLocation = document.createElement('div');
        divLocation.textContent = location;
        divLocation.className += 'location';
        divLocation.ariaLabel = `Venant de : ${location}`;

        const divTagline = document.createElement('div');
        divTagline.textContent = tagline;
        divTagline.className += 'tagline';
        divTagline.ariaLabel = `Son slogan : ${tagline}`;


        const divPrice = document.createElement('div');
        divPrice.textContent = price;
        divPrice.className += 'price';
        divPrice.ariaLabel = `Tarif : ${price}`;


        article.appendChild(anchor);
        anchor.appendChild(img);
        anchor.appendChild(h2);
        anchor.appendChild(divLocation);
        anchor.appendChild(divTagline);
        anchor.appendChild(divPrice);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
