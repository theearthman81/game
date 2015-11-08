import Promise from './bluebird';

/**
 * Asset Manager Class to aid download Images.
 */
export default class AssetManager {

  /**
   * Intialises cache of images.
   */
  constructor() {
    this._cache = Object.create(null);
  }

  _download(path) {
    return new Promise((resolve, reject) => {
      let cached = this._cache[path];
      if (cached) {
        resolve(cached);
      } else {
        /* globals Image */
        let img = new Image();
        img.src = path;

        img.addEventListener('load', () => {
          this.cache[path] = img;
          resolve(img);
        }, false);

        img.addEventListener('error', (err) => {
          reject(err);
        }, false);
      }
    });
  }

 /**
  * @param {...string} paths Paths to images to download.
  * @return {Promise<Image>[]}
  */
  get(...paths) {
    return Promise.all(paths.map(this._download));
  }
}