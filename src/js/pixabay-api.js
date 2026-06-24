import axios from 'axios';

const API_KEY = '56396197-05fcd5e3b9536b865c8ea6b88';
const per_page = 15;
async function getImagesByQuery(query, page=1) {
   const response = await axios
     .get('https://pixabay.com/api/', {
       params: {
         key: API_KEY,
         q: query,
         image_type: 'photo',
         orientation: 'horizontal',
         safesearch: true,
         per_page,
         page: page,
       },
     })
     return response.data;
}
export { getImagesByQuery, per_page };