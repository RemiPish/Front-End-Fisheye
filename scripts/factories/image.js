import photographerMedia from "./photographerMedia.js";
import { lightboxImg } from "../pages/photographer.js";

//factory image de photographerMedia
class image extends photographerMedia {
    constructor(data, name) {
        super(data);
        this.src = `assets/photographers/${name}/${data['image']}`
        this.type = 'image';
    }

    //affiche la photo sur lightbox
    showMediaInLightbox() {

        const mediaTitle = document.createElement('div');

        const img = document.createElement('img');
        img.src = this.src;
        mediaTitle.className = "img-text";
        mediaTitle.textContent = this.mediaName;
        lightboxImg.innerHTML = "";

        lightboxImg.appendChild(img);
        lightboxImg.appendChild(mediaTitle);
    }

     //affiche la photo sur la liste des media du photographe 
    render() {

        const article = document.createElement('article');
        article.setAttribute('data-id', this.id);
        let anchor = document.createElement('a');
        anchor.setAttribute('aria-label', `Ouvrir l'image ${this.mediaName}`);
        anchor.setAttribute('href', "#");
        let media = document.createElement('img');
        media.setAttribute("src", this.src);
        media.setAttribute("alt", `${this.mediaName}`);
        media.className += "media";

        anchor.appendChild(media);

        article.appendChild(anchor);

        this.renderMedia(article);
        this.listenLightboxMedia(media);
        return (article);
    }


}
export default image;