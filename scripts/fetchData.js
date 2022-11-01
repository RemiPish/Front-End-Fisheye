//fichier js contenant les fonctions qui permettent de recuperer les donnees des fichiers json

//recupere les donnees depuis le fichier json
export async function getData() {
    let path = '../../data/photographers.json';
    let res = await fetch(path);
    return await res.json();
}

//retourne les photographes depuis les données recuperees
export function getPhotographers(data) {
    return [...data.photographers];
}

//retourne les medias depuis les données recuperees
export function getMedia(data) {
    return [...data.media];
}
