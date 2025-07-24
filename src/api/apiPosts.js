import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:3600"
})

/*It is not a compnent so mention it as posts as a file name */