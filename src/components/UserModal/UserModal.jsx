import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect, useState } from "react"
import { Button, Drawer, Avatar, AccordionSection, Accordion } from "react-rainbow-components"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import postsService from '../../services/posts.service'
import userService from "../../services/user.service"
import capitalize from "../../utils/capitalize"
import getInitials from "../../utils/getInitials"


const UserModal = ({ handleCloseUserDetails, showUserModal, userId, changeUserModal }) => {

    const { user } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState(null)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getUser()

    }, [])

    useEffect(() => getMyPosts(userId), [userId])

    const getMyPosts = (userId) => {
        postsService
            .getByOwner(userId)
            .then(({ data }) => setPosts(data))
            .catch(err => console.log(err))
    }

    const getUser = () => {
        userService
            .getUser(userId)
            .then(({ data }) => {
                setCurrentUser(data)
            })
            .catch(err => console.log(err))
    }

    const initials = currentUser ? getInitials(currentUser.name, currentUser.lastName) : undefined


    return (<Drawer
        header={currentUser && `${capitalize(currentUser.name)} ${capitalize(currentUser.lastName)}`}
        footer={
            < div className="user-modal-footer" >
                <Button onClick={handleCloseUserDetails}>
                    Close
                </Button>
            </div >
        }
        size='medium'
        slideFrom="left"
        isOpen={showUserModal}
        onRequestClose={handleCloseUserDetails}
    >

        <>
            {currentUser &&
                <div className='user-modal-container'>
                    <Avatar
                        src={currentUser.avatar}
                        initialsVariant="inverse"
                        className="user-info-avatar "
                        assistiveText={`${capitalize(currentUser.name)}`}
                        title={`${capitalize(currentUser.name)}`}
                        initials={initials}

                    />

                    <article className="user-content">
                        <p><strong>Email:</strong>{currentUser.email}</p>
                        <p><strong>About me:</strong> <br /> This is a description about me that is not already done.</p>
                        {
                            posts?.length >= 1

                                ?
                                <Accordion className="user-modal-accordion" >
                                    <AccordionSection
                                        icon={<FontAwesomeIcon icon={faEdit} />}
                                        label={`${capitalize(currentUser.name)} posts`}>
                                        <ul>
                                            {

                                                posts.map(elm => {
                                                    return (
                                                        <li key={elm._id}>
                                                            <Link to={`/posts/${elm._id}`}>{elm.country.flag} {capitalize(elm.title)}</Link>
                                                        </li>
                                                    )
                                                })
                                            }

                                        </ul>



                                    </AccordionSection>
                                </Accordion >
                                : <p>{capitalize(currentUser.name)} hasn't created posts yet.</p>
                        }
                    </article>
                    {
                        (user._id === currentUser._id || user.role === 'ADMIN') &&
                        <Button onClick={changeUserModal}>Edit</Button>
                    }
                </div>
            }
        </>
    </Drawer >)
}

export default UserModal