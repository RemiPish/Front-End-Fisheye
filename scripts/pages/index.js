async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((elt) => {
        let person = new photographer(elt);
        photographersSection.appendChild(person.renderIndex());
    });
};

async function init() {
    let photographers = await getPhotographers();
    let photographerList = [...photographers.photographers];
    displayData(photographerList);
    
};

init();



