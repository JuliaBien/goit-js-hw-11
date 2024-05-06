import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const apiKey = '43685293-a1262c6d1e0da8b74ac4bda00';
const apiUrl = 'https://pixabay.com/api/';
const searchForm = document.querySelector('form.search-form');
const gallery = document.querySelector('div.gallery');
const button = document.querySelector('button.load-more');
let enteredValue = undefined;
let page = 1;
button.setAttribute('hidden', '');
const createImage = photoData => {
  const galleryElement = document.createElement('div');
  galleryElement.classList.add('photo-card');
  galleryElement.innerHTML = `<a class="gallery-item" href=${photoData.largeImageURL}><img src="${photoData.webformatURL}" alt="${photoData.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${photoData.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${photoData.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${photoData.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${photoData.downloads}</b>
    </p>
  </div></a>`;
  gallery.append(galleryElement);
};
const fetchImages = async enteredValue => {
  try {
    const results = await axios.get(
      `${apiUrl}?key=${apiKey}&q=${enteredValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&perPage=40`
    );
    console.log(results.data);
    return results.data;
  } catch (error) {
    Notify.failure(error.message);
  }
};
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  page = 1;
  const form = event.target;
  enteredValue = form.elements.searchQuary.value;
  fetchImages(enteredValue)
    .then(photos => {
      //   if photos.hits === [] - co tu byłoby źle
      if (photos.total === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notify.info(`Hooray! We found ${photos.totalHits} images.`);
        gallery.innerHTML = '';
        const photosData = photos.hits;
        photosData.forEach(photoData => {
          createImage(photoData);
        });
        button.removeAttribute('hidden');
      }
    })
    .catch(error => {
      console.log(error);
    });
});
button.addEventListener('click', () => {
  page += 1;
  button.setAttribute('hidden', '');
  fetchImages(enteredValue)
    .then(photos => {
      console.log(photos.totalHits);
      const totalPages = photos.totalHits / 40;
      console.log(totalPages);
      const photosData = photos.hits;
      if (page >= totalPages) {
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
        Notify.info(`Page ${page} from ${Math.floor(totalPages)} is displayed`);
        photosData.forEach(photoData => {
          createImage(photoData);
        });
      }
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      button.removeAttribute('hidden');
    });
});

galerry.addEventListener('click', zoomPhoto);
const zoomPhoto = () => {
  const lightboxGalerry = new simpleLightbox('.gallery a');
};
