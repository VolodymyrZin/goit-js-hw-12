// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const lightbox = new SimpleLightbox('.gallery .gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});
function createGallery(images) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}"/>
  </a>
  <div class="info">
    <p class="info-item"><b>Likes</b><span>${likes}</span></p>
    <p class="info-item"><b>Views</b> <span>${views}</span></p>
    <p class="info-item"><b>Comments</b> <span>${comments}</span></p>
    <p class="info-item"><b>Downloads</b> <span>${downloads}</span></p>
  </div>
</li>`
    )
    .join('');
  document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup)
  lightbox.refresh();
}
// .Ця функція повинна приймати масив images, створювати HTML - розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh().Нічого не повертає.
function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

// . Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
function showLoader() {
  document.querySelector('.loader').classList.remove('is-hidden');
}
// . Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
function hideLoader() {
  document.querySelector('.loader').classList.add('is-hidden');
}
// . Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.
function showLoadMoreButton() {
  document.querySelector('.pagination-btn').classList.remove('is-hidden');
}
//  Ця функція нічого не приймає, повинна додавати клас для відображення кнопки Load more.Нічого не повертає.
function hideLoadMoreButton() {
    document.querySelector('.pagination-btn').classList.add('is-hidden');
}
// Ця функція нічого не приймає, повинна прибирати клас для відображення кнопки Load more.Нічого не повертає.
function iziToastShow() {
  iziToast.show({
    title: 'Caution',
    message: 'Search field cannot be empty. Please enter a keyword!',
    position: 'topRight',
  });
}
function iziToastError() {
  iziToast.error({
    title: 'Sorry, ',    
    message: 'something wrong. Please try again!',
    position: 'topRight',
  });
}
function iziToastInfo() {
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
}
function iziToastWarning() {
  iziToast.warning({
    title: 'Sorry',
    message:
      'there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
}
export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  iziToastError,
  iziToastInfo,
  iziToastShow,
  iziToastWarning,
};
