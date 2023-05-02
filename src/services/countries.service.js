import axios from 'axios'

class CountryService {

    static _instance

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/countries`
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

            this._instance = new CountryService();
        }
        return this._instance;
    }


    getCountries(queries) {

        if (queries) {
            const {
                discriminationProtection,
                violenceCriminalization,
                goodPlaceToLive,
                transgenderLegal,
                illegalSameSexRelationships,
                propaganda,
                calification,
                sort,
                page,
            } = queries

            return this.api.post(`/?discriminationProtection=${discriminationProtection}&violenceCriminalization=${violenceCriminalization}&goodPlaceToLive=${goodPlaceToLive}&transgenderLegal=${transgenderLegal}&illegalSameSexRelationships=${illegalSameSexRelationships}&propaganda=${propaganda}&calification=${calification}&page=${page}`, { sort })

        } else return this.api.post(`/`)

    }

    getCountriesNames(page) {
        return this.api.get(`/names/?page=${page}`)
    }

    getCountriesNamesList() {
        return this.api.get(`/nameslist/`)
    }

    getOneCountry(id) {
        return this.api.get(`/${id}`)
    }

    getOneCountryByCode(code) {
        return this.api.get(`/code/${code}`)
    }

    editCountry(id, data) {
        return this.api.put(`/${id}/edit`, data)
    }

    deleteCountry(id) {
        return this.api.delete(`/${id}/delete`)
    }
}

export default CountryService.getInstance()