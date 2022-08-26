async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((elt) => {
        let person = new photographer(elt);
        photographersSection.appendChild(person.render());
    });
};

async function init() {
    let photographers = await getPhotographers();
    displayData(photographers);
    
};

init();



