import axios from 'axios';
export const metalsApi = axios.create({ baseURL: 'https://api.gold-api.com', timeout: 9000 });
export const currencyApi = axios.create({ baseURL: 'https://open.er-api.com/v6', timeout: 9000 });
