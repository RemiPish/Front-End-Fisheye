class photographerMedia {

    constructor(media) {
        this.mediaName = media['title'];
        this.mediaLikes = media['likes'];
        this.mediaDate = media['date'];
        this.mediaLiked = false;
        this.id = media.id;
        this.dom = null;
    }

    toggleLikes() {
            if(this.mediaLiked){
                this.dom.likeButton.classList.replace("fa-heart", "fa-heart-o");
                this.mediaLikes--;
            }
            else {
                this.dom.likeButton.classList.replace("fa-heart-o", "fa-heart");
                this.mediaLikes++;
            }
            this.mediaLiked = !this.mediaLiked;
            this.dom.likeNumber.textContent = this.mediaLikes;
    }

    listenLightboxMedia(element) {
        element.addEventListener('click', () => {
            openLightbox(this);
            this.showMediaInLightbox();
        })
    }

    renderMedia(article)
    {
        const name = document.createElement('label');
        name.setAttribute("for", "media");
        name.textContent = this.mediaName;
        name.className += "mediaName";

        const likeNumber = document.createElement('span');
        likeNumber.textContent = this.mediaLikes;
        likeNumber.className += "likeNumber";


        const likeButton = document.createElement('i');
        likeButton.className += "fa fa-heart-o "

        const divText = document.createElement('div');
        divText.className += "media-text";

        const divLike = document.createElement('div');
        divLike.className += "media-like";

        article.appendChild(divText);
        divText.appendChild(name);
        divText.appendChild(divLike);
        divLike.appendChild(likeNumber);
        divLike.appendChild(likeButton);

        this.dom = {
            article: article,
            likeButton: likeButton,
            likeNumber: likeNumber
        }
    }  
}




