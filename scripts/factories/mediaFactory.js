import image from "./image.js";
import video from "./video.js";
export default class mediaFactory {
    constructor() { }
    build(data, name) {
        if (Object.prototype.hasOwnProperty.call(data, 'image'))
            return new image(data, name);
        return new video(data, name);
    }
}