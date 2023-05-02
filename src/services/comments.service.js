import axios from 'axios'

class CommentsService {

    static _instance

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/comments`
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
            this._instance = new CommentsService();
        }
        return this._instance;
    }

    getComments(type, typeId) {
        return this.api.get(`/${type}/${typeId}`)
    }

    createComment(type, typeId, comment) {
        return this.api.post(`/create/${type}/${typeId}`, comment)
    }

    editComment(id, data) {
        return this.api.put(`/edit/${id}`, data)
    }
    deleteComment(type, typeId, id) {
        return this.api.delete(`/delete/${type}/${typeId}/${id}`)
    }

}

export default CommentsService.getInstance()