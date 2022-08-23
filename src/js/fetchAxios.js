import axios from 'axios';
import { keyPixabayAPI } from './key';

export default class {
  options = {
    baseURL: `https://pixabay.com/api/?key=${keyPixabayAPI}`,
    method: 'GET',
    params: {
      page: 1,
      per_page: 40,
      q: null,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };

  getPageOne() {
    if (!this.options.params.q) return new Promise(resolve => resolve());
    return axios
      .request(this.options)
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(error => {
        console.log('Error', error.response.data.status_message);
        return { results: [] };
      });
  }

  nextPage() {
    this.options.params.page++;
  }
  setPage() {
    this.options.params.page = 1;
  }
}
