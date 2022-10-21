import photographer from "../factories/photographer.js";
import { getPhotographers } from "../fetchData.js";

export let photographers;

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((elt) => {
        let person = new photographer(elt);
        photographersSection.appendChild(person.renderIndex());
    });
}

async function init() {
    photographers = await getPhotographers();
    let photographerList = [...photographers.photographers];
    displayData(photographerList);

}

init();



