import axios from 'axios'

class ChatService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/chat`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    createMessage(message) {
        return this.api.post('/create', message)
    }

    getMessages() {
        return this.api.get(`/`)
    }

}
const chatService = new ChatService()
export default chatService