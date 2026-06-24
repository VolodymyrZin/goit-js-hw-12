import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  hideLoadMoreButton,
  showLoadMoreButton,
  iziToastError,
  iziToastInfo,
  iziToastShow,
  iziToastWarning,  
} from './js/render-functions';
import { getImagesByQuery, per_page } from './js/pixabay-api';

const refs = {
  galleryEl: document.querySelector('.gallery'),
  formEl: document.querySelector('.form'),
  loadMoreEl: document.querySelector('.pagination-btn'),

};

refs.formEl.addEventListener('submit', onFormSubmitBtnClick);
refs.loadMoreEl.addEventListener('click', onLoadMoreBtnClick);

let searchQuery = null;
let page = null;
let downloadedImages = null;

async function onFormSubmitBtnClick(event) {
  event.preventDefault();
  clearGallery();
  hideLoadMoreButton();
  showLoader();
  const input = event.target.elements['search-text'].value.trim();
  if (!input) {
    hideLoader();
    iziToastShow();
    return;
  }
  searchQuery = input
  page = 1
  try {
    const data = await getImagesByQuery(searchQuery, page);
    downloadedImages = data.hits.length;
    if (downloadedImages === 0) {
      iziToastWarning()
      return;
    }
    createGallery(data.hits);
    if (downloadedImages >= data.totalHits) {
      hideLoadMoreButton();
      iziToastInfo()
    } else {
      showLoadMoreButton();
    }
  } catch (error) {  
    iziToastError()
  } finally {
    hideLoader();
    }

}
async function onLoadMoreBtnClick() {
  page += 1;
  hideLoadMoreButton();
  showLoader();
  try {
    const data = await getImagesByQuery(searchQuery, page);
    createGallery(data.hits);
    downloadedImages += data.hits.length;
    const galleryItemEl = document.querySelector('.gallery-item');
    const rect = galleryItemEl.getBoundingClientRect();
    const galleryItemElHeight = rect.height;
    window.scrollBy({ top: galleryItemElHeight * 2, behavior: 'smooth' });
    if (downloadedImages >= data.totalHits) {
      hideLoadMoreButton();
      iziToastInfo()
    } else {
      showLoadMoreButton();
    }
  } catch (error) {     
    iziToastError()
  } finally {
    hideLoader();
    }
}



