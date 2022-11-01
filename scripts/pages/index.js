import photographer from "../factories/photographer.js";
import { getData } from "../fetchData.js";
import { getPhotographers } from "../fetchData.js";


// affiche les donnees recuperees des photographes
async function displayPhotographersData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((elt) => {
        let person = new photographer(elt);
        photographersSection.appendChild(person.renderIndex());
    });
}

async function init() {
    const data = await getData();
    const photographers = getPhotographers(data);
    displayPhotographersData(photographers);

}

init();



