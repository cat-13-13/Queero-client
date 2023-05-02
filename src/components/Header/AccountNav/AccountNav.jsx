import { useContext } from "react"
import { AuthContext } from "../../../contexts/auth.context"
import ButtonMenu from 'react-rainbow-components/components/ButtonMenu';
import Avatar from 'react-rainbow-components/components/Avatar';
import MenuItem from 'react-rainbow-components/components/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import capitalize from "../../../utils/capitalize";
import getInitials from "../../../utils/getInitials";
import { ButtonIcon } from "react-rainbow-components";
import { ThemeContext } from "../../../contexts/theme.context";


const AccountNav = () => {

    const { user, logout } = useContext(AuthContext)
    const { themeSelected, changeTheme } = useContext(ThemeContext)

    let initials
    if (user) initials = getInitials(user?.name, user?.lastName)

    return (
        <div className='header-user' >
            <ButtonIcon
                className="theme-icon"
                variant="brand"

                onClick={changeTheme}
                icon={<FontAwesomeIcon icon={themeSelected.theme === 'light' ? faMoon : faSun} />}
            />
            {
                user
                    ?
                    <>

                        <ButtonMenu
                            menuAlignment="right"
                            menuSize="x-small"
                            icon={
                                <Avatar
                                    src={user.avatar}
                                    initialsVariant="inverse"
                                    className={themeSelected.theme === 'light' ? "header-user-avatar header-user-avatar-light" : "header-user-avatar header-user-avatar-dark"}
                                    assistiveText={`${capitalize(user.name)}`}
                                    title={`${capitalize(user.name)}`}
                                    initials={initials}

                                />
                            }
                        >
                            <MenuItem label={`Hello, ${capitalize(user.name)}`} variant="header" />
                            <Link to='./myprofile'>
                                <MenuItem label="My Account" />
                            </Link>
                            <MenuItem onClick={logout} label="Log Out" />
                        </ButtonMenu >
                    </>
                    :
                    <ButtonMenu
                        menuAlignment="right"
                        menuSize="x-small"
                        buttonVariant="brand"
                        icon={<FontAwesomeIcon size="lg" icon={faUser} />}
                    >
                        <MenuItem label={`Hello,`} variant="header" />
                        <Link to='./login'>
                            <MenuItem label="Login" />
                        </Link>
                        <Link to='./signup'>
                            <MenuItem label="Sign Up" />
                        </Link>
                    </ButtonMenu>
            }

        </div>
    )
}

export default AccountNav