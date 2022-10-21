import { openLightbox } from "../pages/photographer.js";
export default class photographerMedia {

    constructor(media) {
        this.mediaName = media['title'];
        this.mediaLikes = media['likes'];
        this.mediaDate = media['date'];
        this.mediaLiked = false;
        this.id = media.id;
        this.dom = null;
    }

    toggleLikes() {
        if (this.mediaLiked) {
            this.dom.likeButtonIcon.classList.replace("fa-heart", "fa-heart-o");
            this.mediaLikes--;
        }
        else {
            this.dom.likeButtonIcon.classList.replace("fa-heart-o", "fa-heart");
            this.mediaLikes++;
        }
        this.mediaLiked = !this.mediaLiked;
        this.dom.likeNumber.textContent = this.mediaLikes;
    }

    listenLightboxMedia(element) {
        element.closest('a').addEventListener('click', () => {
            openLightbox(this);
            this.showMediaInLightbox();
        })
    }

    renderMedia(article) {
        const name = document.createElement('label');
        name.setAttribute("for", "media");
        name.textContent = this.mediaName;
        name.className += "mediaName";

        const likeNumber = document.createElement('span');
        likeNumber.textContent = this.mediaLikes;
        likeNumber.className += "likeNumber";
        likeNumber.setAttribute('aria-labelledby', "Nombre de like");

        const likeButton = document.createElement('button');
        likeButton.className += "likeButton";
        likeButton.setAttribute('aria-label', "Liker la photo");
        likeButton.setAttribute('role', "button");

        const likeButtonIcon = document.createElement('i');
        likeButtonIcon.className += "fa fa-heart-o "

        const divText = document.createElement('div');
        divText.className += "media-text";

        const divLike = document.createElement('div');
        divLike.className += "media-like";

        likeButton.appendChild(likeButtonIcon);
        article.appendChild(divText);
        divText.appendChild(name);
        divText.appendChild(divLike);
        divLike.appendChild(likeNumber);
        divLike.appendChild(likeButton);

        this.dom = {
            article: article,
            likeButton: likeButton,
            likeButtonIcon: likeButtonIcon,
            likeNumber: likeNumber
        }
    }
}




