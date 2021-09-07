import * as basicLightbox from 'basiclightbox';

export default function (e) {
  const dataSrc = e.target.dataset.src;
  // console.log(e.target.nodeName);
  // console.log(dataSrc);
  if (e.target.nodeName !== 'IMG') {
    return;
  } else if (dataSrc) {
    const instance = basicLightbox.create(`
        <img src="${dataSrc}" width="800" height="600">
    `);

    instance.show();
  }
}
