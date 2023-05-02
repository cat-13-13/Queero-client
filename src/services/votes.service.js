import axios from 'axios'

class VotesService {

    static _instance

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/votes`
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
            this._instance = new VotesService();
        }
        return this._instance;
    }

    getVotes(type, typeId) {
        return this.api.get(`/${type}/${typeId}`)
    }

    setVote(type, typeId, vote) {
        return this.api.post(`/${type}/${typeId}/create`, vote)
    }


}

export default VotesService.getInstance()