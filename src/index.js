import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
const apiKey = '43685293-a1262c6d1e0da8b74ac4bda00';
const apiUrl = 'https://pixabay.com/api/';
const searchForm = document.querySelector('form.search-form');
let enteredValue = undefined;

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  enteredValue = form.elements.searchQuary.value;
  fetchImages(enteredValue);
});
const fetchImages = async enteredValue => {
  try {
    const photos = await axios.get(
      `${apiUrl}?key=${apiKey}&q=${enteredValue}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    return photos.data;
  } catch (error) {
    Notify.failure(error.message);
  }
};
