import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
const apiKey = '43685293-a1262c6d1e0da8b74ac4bda00';
const apiUrl = 'https://pixabay.com/api/';
const searchForm = document.querySelector('form.search-form');
const gallery = document.querySelector('div.gallery');
let enteredValue = undefined;

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  enteredValue = form.elements.searchQuary.value;
  fetchImages(enteredValue).then(photos => {
    //   if photos.hits === [] - co tu byłoby źle
    if (photos.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      const photosData = photos.hits;
      gallery.innerHTML = '';
      photosData.forEach(photoData => {
        const galleryElement = document.createElement('div');
        galleryElement.classList.add('photo-card');
        galleryElement.innerHTML = `<img src="${photoData.webformatURL}" alt="${photoData.tags}" loading="lazy" />
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
  </div>`;
        gallery.append(galleryElement);
      });
    }
  });
});

const fetchImages = async enteredValue => {
  try {
    const results = await axios.get(
      `${apiUrl}?key=${apiKey}&q=${enteredValue}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    console.log(results.data);
    return results.data;
  } catch (error) {
    Notify.failure(error.message);
  }
};
