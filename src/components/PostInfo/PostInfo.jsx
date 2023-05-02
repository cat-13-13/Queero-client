import postsService from '../../services/posts.service'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useEffect, useState } from 'react'
import { Button, ZoomableImage, Input, Textarea, FileSelector } from "react-rainbow-components"
import votesService from '../../services/votes.service'
import uploadService from '../../services/upload.service'
import VotesForm from '../VotesForm/VotesForm'
import FavoriteForm from '../FavoriteForm/FavoriteForm'
import { ThemeContext } from '../../contexts/theme.context'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import defaultImg from "../../assets/images/bg.jpg"

const PostInfo = ({ post }) => {

    const [votes, setVotes] = useState(0)
    const { themeSelected } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const { country } = post
    const [isEdit, setIsEdit] = useState(false)
    const [currentPost, setCurrentPost] = useState({
        title: '',
        description: '',
        postImg: ''
    })
    const [errors, setErrors] = useState([])

    useEffect(() => {
        id && refreshVotes()
        setCurrentPost(post)
    }, [id])

    const changeIsEdit = status => setIsEdit(status)

    const handleClick = (e) => {

        e.preventDefault()

        postsService
            .deletePost(id, country)
            .then(({ data: country }) => navigate(`/countries/${country}`))
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {

        const { value, name } = e.target
        setCurrentPost({ ...currentPost, [name]: value })

    }

    const handleFormSubmit = e => {

        e.preventDefault()
        const formData = new FormData();
        formData.append('imageUrl', e.target.imageUrl.files[0]);

        changeIsEdit(false)

        uploadService
            .uploadImage(formData)
            .then(({ data }) => {
                const { cloudinary_url } = data
                return postsService.editPost(currentPost._id, { ...currentPost, postImg: cloudinary_url })
            })
            .then(({ data }) => {
                const { title, description, postImg } = data
                setCurrentPost({ title, description, postImg })
            })
            .catch(err => setErrors(err.response.data.errorMessages))

    }

    const refreshVotes = () => {

        votesService.getVotes('POST', id)
            .then(({ data }) => setVotes(Number(data)))
            .catch(err => console.log(err))
    }

    const setVote = (vote) => {

        votesService
            .setVote('POST', id, { vote })
            .then(() => refreshVotes())
            .catch(err => console.log(err))

    }

    return (
        <>
            {isEdit ?
                < form className='post-info-container' encType="multipart/form-data" onSubmit={handleFormSubmit} >

                    <div className='post-info-header'>

                        <div className="post-form-image">
                            <div className='post-form-input-image'>
                                <label htmlFor="imageUrl" className="upload-label">
                                    <FontAwesomeIcon icon={faImage} size="3x" /> Upload image
                                </label>
                                <input type="file" className='upload-image ' name="imageUrl" id="imageUrl" />
                            </div>

                            <img src={currentPost.postImg ? currentPost.postImg : defaultImg} alt={currentPost.title} />
                        </div>

                        <span>
                            <Input
                                id="title"
                                name='title'
                                placeholder={currentPost.title}
                                value={currentPost.title}
                                onChange={handleInputChange}
                                className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                            />
                            <FavoriteForm specs={{ type: 'POST', id }} />
                        </span>
                    </div>

                    <div className={themeSelected.theme === 'light' ? 'post-content' : 'post-content post-content-dark'}>
                        <article className='post-interaction'>
                            <h3>Score: {votes}</h3>
                            <VotesForm setVote={setVote} />
                        </article>
                        <article className='post-information'>
                            <Textarea
                                id="description"
                                name='description'
                                rows={8}
                                placeholder={currentPost.description}
                                value={currentPost.description}
                                onChange={handleInputChange}
                            />
                            {
                                (user?._id === post.owner || user?.role === 'ADMIN') &&
                                <div className={themeSelected.theme === 'light' ?
                                    'post-info-buttons post-info-buttons-light'
                                    : 'post-info-buttons post-info-buttons-dark'}>
                                    <Button type='submit'>Save</Button>

                                    <Button onClick={() => changeIsEdit(false)}>Cancel</Button>
                                </div>
                            }
                        </article>

                    </div>

                </form>
                :
                < div className='post-info-container' >
                    <div className='post-info-header'>
                        <img src={currentPost.postImg ? currentPost.postImg : defaultImg} alt={currentPost.title} />
                        <span>
                            <h1>{currentPost.title}</h1>
                            <FavoriteForm specs={{ type: 'POST', id }} />
                        </span>

                    </div>

                    <div className={themeSelected.theme === 'light' ? 'post-content' : 'post-content post-content-dark'}>
                        <article className='post-interaction'>
                            <h3>Score: {votes}</h3>
                            <VotesForm setVote={setVote} />
                        </article>
                        <article className='post-information'>
                            <p>{currentPost.description}</p>
                            {
                                (user?._id === post.owner || user?.role === 'ADMIN') &&
                                <div className={themeSelected.theme === 'light' ?
                                    'post-info-buttons post-info-buttons-light'
                                    : 'post-info-buttons post-info-buttons-dark'}>
                                    <Button onClick={() => changeIsEdit(true)}>Edit</Button>
                                    <Button>
                                        <Link to={'/delete'} onClick={handleClick}>Delete</Link>
                                    </Button>
                                </div>
                            }
                        </article>

                    </div>

                </div >
            }
        </>
    )
}

export default PostInfo