class video extends photographerMedia {
    constructor(data, name) {
        super(data);
        this.src = `assets/photographers/${name}/${data['video']}`

    }

    render() {

        const article = document.createElement('article');
        let media = document.createElement('video');
        media.setAttribute("width", "350");
        media.setAttribute("width", "300");
        media.setAttribute("controls", "true");

        let videoSource = document.createElement('source');
        videoSource.setAttribute("src", this.src);
        videoSource.setAttribute("type", "video/mp4");

        media.appendChild(videoSource);
        media.className += "media";

        const name = document.createElement('label');
        name.setAttribute("for", "media");
        name.textContent = this.mediaName;
        name.className += "mediaName";

        const likeNumber = document.createElement('span');
        likeNumber.textContent = this.mediaLikeNumber;
        likeNumber.className += "likeNumber";


        const likeButton = document.createElement('i');
        likeButton.className += "fa fa-heart-o "



        likeButton.addEventListener("click", () => {
            if (this.mediaLiked) {
                likeButton.classList.replace("fa-heart", "fa-heart-o");
                this.mediaLiked = false;
                this.mediaLikeNumber--;
            }
            else {
                likeButton.classList.replace("fa-heart-o", "fa-heart");
                this.mediaLiked = true;
                this.mediaLikeNumber++;
            }
            likeNumber.textContent = this.mediaLikeNumber;
        })
        const divText = document.createElement('div');
        divText.className += "media-text";

        const divLike = document.createElement('div');
        divLike.className += "media-like";

        article.appendChild(media);
        article.appendChild(divText);
        divText.appendChild(name);
        divText.appendChild(divLike);
        divLike.appendChild(likeNumber);
        divLike.appendChild(likeButton);
        return (article);
    }
}