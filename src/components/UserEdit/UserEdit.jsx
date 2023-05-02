import userService from '../../services/user.service'
import uploadService from '../../services/upload.service'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useState, useEffect } from 'react'
import { Input, Button, Drawer, Avatar, FileSelector } from "react-rainbow-components"
import capitalize from '../../utils/capitalize'
import getInitials from '../../utils/getInitials'


const UserEdit = ({ userId, handleCloseUserEdit, showUserEditModal, changeUserModal, getMessages, type }) => {

    const { authenticateUser, user, storeToken } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState({
        name: '',
        lastName: '',
        email: '',
        avatar: ''
    })

    useEffect(() => { }, [handleCloseUserEdit, showUserEditModal])

    useEffect(() => {
        getUser(userId)
    }, [userId,])


    const handleInputChange = e => {

        const { value, name } = e.target
        setCurrentUser({ ...currentUser, [name]: value })

    }

    const closeModal = () => {
        if (type) handleCloseUserEdit()
        else changeUserModal()
    }

    const getUser = () => {
        userService
            .getUser(userId)
            .then(({ data }) => setCurrentUser(data))
            .catch(err => console.log(err))
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('imageUrl', e.target.imageUrl.files[0]);

        uploadService
            .uploadImage(formData)
            .then(({ data }) => {

                const { cloudinary_url } = data
                return userService.editUser(userId, { ...currentUser, avatar: cloudinary_url })

            })
            .then(({ data }) => {
                if (user._id === currentUser._id) {
                    storeToken(data.authToken)
                    authenticateUser()
                }
                getMessages()
                closeModal()

            })
            .catch(err => console.log(err))
    }
    let initials
    if (currentUser) initials = getInitials(currentUser?.name, currentUser?.lastName)

    return (
        <div>
            <Drawer
                header={currentUser && `${capitalize(currentUser.name)} ${capitalize(currentUser.lastName)}`}
                size='medium'
                slideFrom="left"
                isOpen={showUserEditModal}
                onRequestClose={handleCloseUserEdit}
            >

                <>
                    {currentUser &&
                        <div className='user-modal-container'>
                            <form encType="multipart/form-data" onSubmit={handleFormSubmit} >
                                <div className='user-edit-avatar'>
                                    <Avatar
                                        src={currentUser.avatar}
                                        initialsVariant="inverse"
                                        className="user-info-avatar "
                                        assistiveText={`${capitalize(currentUser.name)}`}
                                        title={`${capitalize(currentUser.name)}`}
                                        initials={initials}

                                    />
                                </div>

                                <FileSelector
                                    className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                                    label="File selector"
                                    name='imageUrl'
                                    placeholder="Drag & Drop or Click to Browse"
                                    bottomHelpText="Select only one file"
                                />
                                <article>


                                    <p><strong>About me:</strong> <br /> This is a description about me that is not already done.</p>

                                    <Input
                                        label="Name:"
                                        name='name'
                                        value={currentUser.name}
                                        type="text"
                                        className="rainbow-p-around_medium"
                                        onChange={handleInputChange}
                                    />

                                    <Input
                                        label="Last name:"
                                        name='lastName'
                                        value={currentUser.lastName}
                                        type="text"
                                        className="rainbow-p-around_medium"
                                        onChange={handleInputChange}
                                    />


                                    <Input
                                        label="Email:"
                                        name='email'
                                        value={currentUser.email}
                                        type="email"
                                        className="rainbow-p-around_medium"
                                        onChange={handleInputChange}
                                    />

                                    < div className="user-modal-footer" >
                                        <Button type='submit'>Update</Button>
                                        <Button onClick={closeModal}> Cancel</Button>
                                    </div >
                                </article>
                            </form>
                        </div>
                    }
                </>
            </Drawer >




        </div >


    )

}

export default UserEdit