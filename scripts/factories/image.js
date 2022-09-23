class image extends photographerMedia {
    constructor(data, name) {
        super(data);
        this.src = `assets/photographers/${name}/${data['image']}`
        this.type = 'image';
    }

    render() {

        const article = document.createElement('article');
        article.setAttribute('data-id', this.id);
        let media = document.createElement('img');
        media.setAttribute("src", this.src);
        media.setAttribute("alt", `${this.mediaName}`);
        media.className += "media";



        article.appendChild(media);

        this.renderMedia(article);
        return (article);
    }
}