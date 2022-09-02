class mediaFactory {
    constructor() { }
    build(data, name) {
        if (data.hasOwnProperty('image'))
            return new image(data, name);
        return new video(data, name);
    }
}