class photographerMedia {

    constructor(media, name) {
        this.mediaIsImage = media.hasOwnProperty('image') ? true : false;
        this.mediaSrc = this.mediaIsImage ? `assets/photographers/${name}/${media['image']}` : `assets/photographers/${name}/${media['video']}`;
        this.mediaName = media['name'];
        this.mediaLikeNumber = media['likes'];
        this.mediaLiked = false;

    }

    render() {

        const article = document.createElement('article');
        let media;
        if (this.mediaIsImage) {
            media = document.createElement('img');
            media.setAttribute("src", this.mediaSrc);
            media.setAttribute("alt", `${this.mediaName}`);
        }
        else {
            media = document.createElement('video');
            media.setAttribute("width", "350");
            media.setAttribute("width", "300");
            media.setAttribute(controls);

            let videoSource = document.createElement('source');
            videoSource.setAttribute("src", this.mediaSrc);
            videoSource.setAttribute("type", "video/mp4");

            media.appendChild(videoSource);
        }
        media.className += "media";

        const name = document.createElement('label');
        name.setAttribute("for", "media");
        name.textContent = this.mediaName;
        name.className += "mediaName";

        const likeNumber = document.createElement('span');
        likeNumber.textContent = this.mediaLikeNumber;
        likeNumber.className += "likeNumber";


        const likeButton = document.createElement('i');
        likeButton.className += "fa-regular"
        likeButton.className += "fa-heart";

        likeButton.setAttribute("onclick", "this.clikeLikeMedia(this)");

        article.appendChild(media);
        article.appendChild(name);
        article.appendChild(likeNumber);
        article.appendChild(likeButton);
        return (article);
    }

    clickLikeMedia(button) {
        if (this.mediaLiked) {
            button.classList.replace("fa-solid", "fa-regular");
            this.mediaLikeNumber--;
        }
        else {
            button.classList.replace("fa-regular", "fa-solid");
            this.mediaLikeNumber++;
        }
    }
}



