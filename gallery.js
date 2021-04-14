import galleryItems from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightBoxImg: document.querySelector('.lightbox_image'),
    lightBoxOverlay: document.querySelector('.lightbox_overlay'),
    lightBoxCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

const galleryMarkUp = makeGalleryMarkUp(galleryItems);
refs.gallery.insertAdjacentHTML('beforeend', galleryMarkUp);


function makeGalleryMarkUp(items) {
    return items.map(({ preview, original, description }) => {
        return `
        <li class="gallery_item">
        <a
        class="gallery_link"
        href='${original}'>
        <img
        class="gallery_image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
        </a>
        </li>
        `;
         
    }).join('');
};

console.log(makeGalleryMarkUp(galleryItems));

// refs.gallery.addEventListener('click', onModalOpen);
// refs.lightbox.addEventListener('click', changeLightBoxImage);
// refs.lightbox.addEventListener('click', onModalClose);