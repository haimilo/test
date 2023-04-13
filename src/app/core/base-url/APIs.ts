import { environment } from 'src/environments/environment';

const { api_key, api_url, upload_api_url } = environment;

export const BASE_URL = api_url;
export const API_KEY = api_key;

export const API_ENDPOINT = {
  TRENDING_GIFS: `${api_url}/trending?api_key=${api_key}`,
  SEARCH_GIFS: `${api_url}/search?api_key=${api_key}`,
  UPLOAD_GIF: `${upload_api_url}?api_key=${api_key}`,
};
