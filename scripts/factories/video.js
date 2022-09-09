class video extends photographerMedia {
    constructor(data, name) {
        super(data);
        this.src = `assets/photographers/${name}/${data['video']}`

    }

    render() {

        const article = document.createElement('article');
        article.setAttribute('data-id', this.id);
        let media = document.createElement('video');
        media.setAttribute("width", "350");
        media.setAttribute("width", "300");
        media.setAttribute("controls", "true");

        let videoSource = document.createElement('source');
        videoSource.setAttribute("src", this.src);
        videoSource.setAttribute("type", "video/mp4");

        media.appendChild(videoSource);
        media.className += "media";

        article.appendChild(media);
        this.renderMedia(article);
        return (article);
    }
}