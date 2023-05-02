import axios from 'axios'

class PostService {

    static _instance

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/posts`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new PostService()
        }
        return this._instance;
    }

    getAllPosts() {
        return this.api.get(`/`)
    }

    getPosts(country, queries) {
        const { sort } = queries
        return this.api.post(`/country/${country}`, { sort })
    }

    getByOwner(id) {
        return this.api.get(`/owner/${id}`)
    }

    createPost(data) {
        return this.api.post(`/create`, data)
    }

    getOnePost(id) {
        return this.api.get(`/${id}`)
    }

    editPost(id, data) {
        return this.api.put(`/${id}/edit`, data)
    }

    deletePost(id, country) {
        return this.api.delete(`/${id}/${country}/delete`)
    }

}

export default PostService.getInstance()