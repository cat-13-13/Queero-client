import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import postsService from '../../services/posts.service'
import uploadService from '../../services/upload.service'
import { Input, Button, Modal, Select, FileSelector } from "react-rainbow-components"
import FormError from "../FormError/FormError"
import capitalize from '../../utils/capitalize'
import countriesService from '../../services/countries.service'

const NewPost = ({ showModal, handleClose }) => {

    const [countries, setCountries] = useState([])
    const [errors, setErrors] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => getCountryNameList, [])

    const [postData, setPostData] = useState({
        title: '',
        postImg: '',
        description: '',
        country: id ? id : '',
    })



    const getCountryNameList = () => {

        id && setPostData({ ...postData, country: id })

        countriesService
            .getCountriesNamesList()
            .then(({ data }) => setCountries(data))
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.target
        setPostData({ ...postData, [name]: value })

    }

    const handleFormSubmit = (e) => {

        e.preventDefault()
        const formData = new FormData();
        formData.append('imageUrl', e.target.imageUrl.files[0]);
        uploadService
            .uploadImage(formData)
            .then(({ data }) => {
                const { cloudinary_url: postImg } = data
                return postsService.createPost({ ...postData, postImg })

            })
            .then(({ data: post }) => navigate(`/posts/${post}`))
            .catch(err => setErrors(err.response.data.errorMessages))

    }

    const countryList = countries.map(elm => ({
        value: elm._id,
        label: capitalize(elm.name)
    }))

    return (

        <div>

            <div>
                <Modal
                    id="modal-2"
                    isOpen={showModal}
                    onRequestClose={handleClose}
                    title='Create new post'
                    footer={
                        < div className="rainbow-flex rainbow-justify_end" >
                            <Button onClick={handleClose}>
                                Close
                            </Button>
                        </div >
                    }
                >
                    <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
                        <div>
                            <Input
                                label="Title:"
                                name='title'
                                type="text"
                                placeholder='Title'
                                className="rainbow-p-around_medium"
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Description:"
                                name='description'
                                type="text"
                                placeholder='Description'
                                className="rainbow-p-around_medium"
                                onChange={handleInputChange}
                            />

                            <Select
                                label="Country:"
                                labelAlignment="left"
                                id="country"
                                name="country"
                                value={postData.country}
                                onChange={handleInputChange}
                                options={
                                    id ?
                                        countryList
                                        : [{
                                            "value": "",
                                            "label": "Select country..."
                                        }, ...countryList]
                                }
                            />


                            <FileSelector
                                className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                                label="File selector"
                                name='imageUrl'
                                placeholder="Drag & Drop or Click to Browse"
                                bottomHelpText="Select only one file"
                            />

                        </div>

                        <Button type="submit">Save</Button>
                    </form >
                </Modal>
            </div>

            {errors.length > 0 && <FormError>{errors.map((elm, index) => <p key={index}>{elm}</p>)} </FormError>}



        </div >
    )
}

export default NewPost