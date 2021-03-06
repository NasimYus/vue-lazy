/*!
 * vue-lazy-loading v0.0.12
 * (c) 2016-2020 voidjmp
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueLazyLoadingImage = factory());
}(this, (function () { 'use strict';

  var lazyload = {
    inserted: el => {
      const style = el.dataset.style;
      const img = el.dataset.image;
      const className = el.getAttribute('class');
      const src = el.getAttribute('src');
      el.setAttribute('class', 's-image');
      el.setAttribute('style', !style ? 'height: 170px;' : style);
      el.setAttribute('src', !img ? require('./assets/img/img_skeleton.png') : img);

      const loadImage = () => {
        el.src = src;
      };

      const callback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage();
            observer.unobserve(el);
          }
        });
      };

      const lazyImage = () => {
        const options = {
          root: null,
          threshold: 1
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
      };

      el.onload = () => {
        if (el.getAttribute('src') !== 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALwAAADGAQMAAABSPnhPAAAAA1BMVEXm5uSlVuPDAAAAG0lEQVR4Ae3BMQEAAADCIPunNsN+YAAAAABAdBNWAAHMZ56dAAAAAElFTkSuQmCC') {
          el.setAttribute('style', '');
          el.setAttribute('class', className);
        }
      };

      el.onerror = () => {
        el.setAttribute('src', require('./assets/img/photo.png'));
        el.setAttribute('style', '');
        el.setAttribute('class', className);
      };

      lazyImage();
    }
  };

  var version = "0.0.12";

  lazyload.version = version;

  lazyload.install = function (Vue) {
    Vue.directive(Slider.name, Slider);
  };

  return lazyload;

})));
