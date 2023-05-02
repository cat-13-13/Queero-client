import axios from 'axios'


class UploadServices {

    static _instance

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/upload`
        })
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new UploadServices();
        }
        return this._instance;
    }


    uploadImage(imageForm) {
        return this.api.post('/image', imageForm)
    }
}

export default UploadServices.getInstance()
