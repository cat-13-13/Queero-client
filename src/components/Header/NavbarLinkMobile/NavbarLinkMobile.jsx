import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { ThemeContext } from "../../../contexts/theme.context"


const NavbarLinkMobile = () => {

    const { themeSelected, changeTheme } = useContext(ThemeContext)
    const [showNavbar, setShowNavbar] = useState(false)

    const handleClick = (e) => setShowNavbar(!showNavbar)

    const haddleChangeTheme = () => {
        changeTheme()
        handleClick()

    }

    return (
        <div className={themeSelected.theme === 'dark' ? 'header-menu-mobile header-menu-mobile-dark' : 'header-menu-mobile header-menu-mobile-light'} >
            <a onClick={handleClick}>
                <FontAwesomeIcon size="lg" icon={faBars} />
            </a>
            {showNavbar && (
                <div className={themeSelected.theme === 'dark' ? 'header-links-mobile header-links-mobile-dark' : 'header-links-mobile header-links-mobile-light'}>
                    <Link onClick={handleClick} to='./'>Home</Link>
                    <Link onClick={handleClick} to='./countries'>Countries</Link>
                    <Link onClick={handleClick} to='./posts'>Posts</Link>
                    <Link onClick={handleClick} to='./aboutus'>About Us</Link>
                    {/* <Link onClick={handleClick} to='./contact'>Contact</Link> */}
                    <Link onClick={handleClick} to='./myprofile'>My Account</Link>
                    <Link onClick={handleClick} to='./signup'>Sign Up</Link>
                    <Link onClick={haddleChangeTheme} >{themeSelected.theme === 'light' ? 'Dark mode' : 'Light mode'}</Link>
                </div>
            )
            }

        </div>
    )
}
export default NavbarLinkMobile