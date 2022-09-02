async function getPhotographers() {
    let path = '../../data/photographers.json';
    let res = await fetch(path);
    let data = await res.json();
    return data;
}


function getPhotographerID() {
    let params = (new URL(document.location)).searchParams;
    return params.get('id');
}


function getPhotographerByID(id) {
    let photographer = photographers.filter(elt => parseInt(id) === elt.id);
    return photographer[0];
}
