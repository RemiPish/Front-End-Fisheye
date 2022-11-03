import image from "./image.js";
import video from "./video.js";
export default class mediaFactory {
    constructor() { }
    //construit image ou video selon le type de donnee
    build(data, name) {
        if (Object.prototype.hasOwnProperty.call(data, 'image'))
            return new image(data, name);
        return new video(data, name);
    }
}