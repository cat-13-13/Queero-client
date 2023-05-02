import axios from 'axios'

class UserService {

    static _instance

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`
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
            this._instance = new UserService()
        }
        return this._instance;
    }

    getUser(id) {
        return this.api.get(`/${id}`)
    }

    editUser(id, data) {
        return this.api.put(`/${id}/edit`, data)
    }

    deleteUser(id) {
        return this.api.delete(`/${id}/delete`)
    }

    addFavorite(type, typeId) {
        return this.api.put(`/addFavorite/${type}/${typeId}`)
    }

    isFavorite(type, typeId) {
        return this.api.get(`/isFavorite/${type}/${typeId}`)
    }

}

export default UserService.getInstance()