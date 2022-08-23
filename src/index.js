import FetchAxion from './js/fetchAxios.js';
import cardImges from './templates/card-imges.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const fetchAxion = new FetchAxion();
const { createGallery, getPageOne } = fetchAxion;
const getPageOneFetchAxion = getPageOne.bind(fetchAxion); // игрался переопредилил функцию из класса...

const gallery = document.querySelector('.gallery');
const btnSearch = document.querySelector('.search-btn');
const formSearch = document.querySelector('#search-form');
const inputSearch = document.querySelector('.search-input');
const btnNextPage = document.querySelector('.btn-primary');

inputSearch.addEventListener('input', onValueInput);
formSearch.addEventListener('submit', onSearchBtnClick);
btnNextPage.addEventListener('click', onNextPageClick);

const simpleLightbox = new SimpleLightbox('.gallery a');
btnNextPage.disabled = true;
btnNextPage.classList.add('is-hidden');

function onSearchBtnClick(event) {
  event.preventDefault();
  btnNextPage.classList.remove('is-hidden');
  fetchAxion.setPage();

  getPageOneFetchAxion().then(response => {
    gallery.innerHTML = '';

    if (response) {
      if (response.hits.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        gallery.innerHTML += cardImges(response.hits);
        simpleLightbox.refresh();
        btnNextPage.disabled = false;
        return;
      }
    }
  });
}

function onValueInput(event) {
  console.log(event);
  console.log(fetchAxion);

  fetchAxion.options.params.q = event.target.value.trim();
}

function onNextPageClick() {
  fetchAxion.nextPage();
  btnNextPage.disabled = true;
  getPageOneFetchAxion().then(response => {
    gallery.innerHTML += cardImges(response.hits);
    simpleLightbox.refresh();
    btnNextPage.disabled = false;
    return;
  });
}
