import photographerMedia from "./photographerMedia.js";
import { lightboxImg } from "../pages/photographer.js";

//factory video de photographerMedia
export default class video extends photographerMedia {
    constructor(data, name) {
        super(data);
        this.src = `assets/photographers/${name}/${data['video']}`
        this.type = 'video';
    }

    //affiche la video sur lightbox
    showMediaInLightbox() {
        const mediaTitle = document.createElement('div');

        let video = document.createElement('video');
        video.setAttribute("width", "900");
        video.setAttribute("height", "600");
        video.setAttribute("controls", "true");

        let videoSource = document.createElement('source');
        videoSource.setAttribute("src", this.src);
        videoSource.setAttribute("type", "video/mp4");

        video.appendChild(videoSource);
        video.className += "media";

        mediaTitle.className = "video-text";
        mediaTitle.textContent = this.mediaName;
        lightboxImg.innerHTML = "";
        lightboxImg.appendChild(video);
        lightboxImg.appendChild(mediaTitle);
    }

    //affiche la video sur la liste des media du photographe 
    render() {
        const article = document.createElement('article');
        article.setAttribute('data-id', this.id);
        let media = document.createElement('video');
        media.setAttribute("width", "350");
        media.setAttribute("height", "300");

        let anchor =  document.createElement('a');
        anchor.setAttribute('aria-label',`Ouvrir l'image ${this.mediaName}`);
        anchor.setAttribute('href', "#");
        let videoSource = document.createElement('source');
        videoSource.setAttribute("src", this.src);
        videoSource.setAttribute("type", "video/mp4");

        
        media.appendChild(videoSource);
        media.className += "media";

        anchor.appendChild(media)
        article.appendChild(anchor);
        this.renderMedia(article);
        this.listenLightboxMedia(media);
        return (article);
    }
}