import { Link } from 'react-router-dom'
import postsService from '../../services/posts.service'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { ThemeContext } from '../../contexts/theme.context'
import capitalize from '../../utils/capitalize'
import getInitials from '../../utils/getInitials'
import cutString from '../../utils/cutString'
import Image from "../../assets/images/bg.jpg"
import { Card, Avatar, Button } from 'react-rainbow-components';
import NewPost from '../NewPost/NewPost'


const PostsList = ({ posts, country }) => {

    const { themeSelected } = useContext(ThemeContext)
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [showCreatePostModal, setShowCreatePostModal] = useState(false)

    const handleClick = (e) => {

        e.preventDefault()

        postsService
            .deletePost(posts._id, posts.country)
            .then(() => navigate(`/countries/${posts.country}`))
            .catch(err => console.log(err))
    }

    const handleCloseCreatePostModal = () => {
        setShowCreatePostModal(false)
    }
    return (

        <>
            <div className="content-card-container" >

                {
                    posts?.map(({ title, _id, owner, score, country, postImg }) => {

                        let initials = getInitials(owner?.name, owner?.lastName)
                        const cuttedTitle = cutString(title, 20)

                        return (
                            <Link to={`/posts/${_id}`} key={_id} className="post-card-container">
                                <Card
                                    key={_id}
                                    footer={`${country.flag} ${capitalize(country.name)}`}
                                    className='post-card'
                                    icon={
                                        <div className='post-card-header'>
                                            <p>{capitalize(cuttedTitle)}</p>
                                            <Avatar
                                                src={owner.avatar}
                                                initialsVariant="inverse"
                                                className={themeSelected.theme === 'light' ? "header-user-avatar header-user-avatar-light" : "header-user-avatar posts-user-avatar-dark"}
                                                assistiveText={`${capitalize(owner.name)}`}
                                                title={`${capitalize(owner.name)}`}
                                                initials={initials}

                                            />
                                        </div>}
                                >
                                    <img src={postImg ? postImg : Image} alt={title ? title : Image} className='post-card-image' />

                                </Card>

                            </Link>

                        )
                    })
                }

            </div>
            {
                user &&
                <div className="create-post-btn">

                    <Button
                        label="Create new post"
                        variant="brand"
                        onClick={() => setShowCreatePostModal(true)}
                    />

                </div>
            }

            {
                showCreatePostModal &&
                <NewPost showModal={showCreatePostModal} handleClose={handleCloseCreatePostModal} />
            }

        </>

    )
}

export default PostsList