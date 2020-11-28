import axios from 'axios';

// https://narahariapi.herokuapp.com

// http://localhost:5001

const instance=axios.create({baseURL:'http://localhost:5001'})

export default instance;