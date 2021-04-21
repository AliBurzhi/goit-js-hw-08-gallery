import galleryItems from './gallery-items.js';

function makeGalleryMarkup(galleryObject) {
  return galleryObject
    .map(
      galleryItem => `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${galleryItem.original}"
  >
    <img
      class="gallery__image"
      src="${galleryItem.preview}"
      data-source="${galleryItem.original}"
      data-index="${galleryItem.index}"
      
      alt="${galleryItem.description}"
    />
  </a>
  
</li>
    `,
    )
    .join('');
}

const galleryContainerRef = document.querySelector('.js-gallery');
const lightBoxRef = document.querySelector('.js-lightbox');
const lightBoxImageRef = document.querySelector('.lightbox__image');


galleryContainerRef.insertAdjacentHTML(
  'beforeend',
  makeGalleryMarkup(galleryItems),
);

galleryContainerRef.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  document.body.style.overflow = 'hidden';

  lightBoxRef.classList.add('is-open');
  lightBoxImageRef.src = event.target.dataset.source;

  lightBoxImageRef.index = event.target.dataset.index;
  lightBoxImageRef.alt = event.target.alt;

  window.addEventListener('keydown', closeLightboxOnEsc);
  lightBoxRef.addEventListener('click', closeLightbox);

 window.addEventListener('keydown', changeImgOnArrow);
});
function changeImgOnArrow() {
  const galleriItemsUrl = galleryItems.map(item => item.original);
  let currentIndex = galleriItemsUrl.indexOf(lightBoxImageRef.src);
  function setModalImg(index) {
    lightBoxImageRef.src = galleriItemsUrl[index];
  }
  if (
    event.code === 'ArrowRight' &&
    currentIndex < galleriItemsUrl.length - 1
  ) {
    currentIndex += 1;
    console.log(currentIndex);
  } else if (event.code === 'ArrowLeft' && currentIndex > 0) {
    currentIndex -= 1;
    console.log(currentIndex);
  }
  setModalImg(currentIndex);
}
function closeLightboxOnEsc(event) {
  if (event.code === 'Escape') {
    removeClassIsOpen(lightBoxRef);
    clearSrcOfImage(lightBoxImageRef);
    window.removeEventListener('keydown', closeLightboxOnEsc);
    document.body.style.overflow = 'auto';
  }
}
function closeLightbox(event) {
  if (event.target.nodeName !== 'IMG') {
    removeClassIsOpen(lightBoxRef);
    clearSrcOfImage(lightBoxImageRef);
    lightBoxRef.removeEventListener('click', closeLightbox);
    document.body.style.overflow = 'auto';
  }
}

function removeClassIsOpen(lightBox) {
  lightBox.classList.remove('is-open');
}
function clearSrcOfImage(image) {
  image.src = '';
  image.alt = '';
}









































// console.log(createCardsUp(galleryItems));
// const galleryContainer = document.querySelector('.js-gallery');
// const cardsMarkUp = createCardsUp(galleryItems);
// galleryContainer.insertAdjacentHTML('beforeend', cardsMarkUp)

// // galleryContainer.addEventListener('click', onCardContainerClick)

// function createCardsUp(items) {
//   return items.map(({preview, original, description}) => {
//     return `
//     <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="${original}">
//     <img
//       class="gallery__image"
//       src="${preview}"
//       data-source="${original}"
//       alt="${description}"
//     />
//   </a>
// </li>
//     `;
//   })
//     .join('');
// };

// const lightbox = document.querySelector('.js-lightbox');
// lightbox.addEventListener('click', onModalOpen);

// function onModalOpen(evt) {
//   const modalWind = document.querySelector('.lightbox')
//   if (modalWind) {
//    return modalWind.classList.add('is-open')
//   }
//   console.log(modalWind);
// }