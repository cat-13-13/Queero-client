import { Link } from "react-router-dom"
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { ThemeContext } from "../../contexts/theme.context"
import { Avatar, Button } from "react-rainbow-components"
import capitalize from "../../utils/capitalize"
import getInitials from "../../utils/getInitials"
import UserEdit from "../UserEdit/UserEdit"



const UserInfo = () => {

    const { user } = useContext(AuthContext)
    const { name, lastName, avatar, email } = user
    const { themeSelected } = useContext(ThemeContext)

    const [showModal, setShowModal] = useState(false)

    const capitalizedName = capitalize(name)
    const capitalizedLastName = capitalize(lastName)

    const handleCloseUserEdit = () => {
        setShowModal(false)
    }

    let initials
    if (user) initials = getInitials(user?.name, user?.lastName)

    return (
        <div className='user-info-container'>
            <span className="user-avatar">
                <Avatar
                    src={user.avatar}
                    initialsVariant="inverse"
                    className={themeSelected.theme === 'light' ? "profile-user-avatar header-user-avatar-light" : "profile-user-avatar header-user-avatar-dark"}
                    assistiveText={`${capitalize(user.name)}`}
                    title={`${capitalize(user.name)}`}
                    initials={initials}

                />
            </span>

            <article className={themeSelected.theme === 'light' ? 'user-content user-content-light' : 'user-content user-content-dark'}>
                <div className="user-content-name">
                    <p >{capitalizedName}</p>
                    <p > {capitalizedLastName}</p>
                </div>
                <p>Email: {email}</p>
                <Button onClick={() => setShowModal(true)}>
                    Edit
                </Button>
                {showModal &&
                    <UserEdit userId={user._id} showUserEditModal={showModal} handleCloseUserEdit={handleCloseUserEdit} type={'userpage'} />
                }

            </article>

        </div>

    )

}

export default UserInfo