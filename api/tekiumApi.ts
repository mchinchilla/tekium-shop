

import axios from 'axios';


export const tekiumApi = axios.create({
    baseURL: '/api',
});


export default tekiumApi;