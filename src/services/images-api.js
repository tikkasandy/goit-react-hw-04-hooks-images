import PropTypes from 'prop-types';

const API_KEY = '24024087-799f8861d2a5ccb36886decf6';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGES = 12;

function fetchImages(searchQuery, page) {
  const url = `${BASE_URL}/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGES}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error('Ooops. Something went wrong (('));
  });
}

const api = {
  fetchImages,
};

fetchImages.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default api;
