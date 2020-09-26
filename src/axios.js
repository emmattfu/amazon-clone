import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://us-central1-clone-996ac.cloudfunctions.net/api' // THE API URL
})

export default instance