import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../contexts/theme.context';


const NavbarLink = ({ handleClick, selected, to, id, icon, label }) => {

    const { themeSelected } = useContext(ThemeContext)

    let classActive

    if (selected === `/${id}` && themeSelected.theme === 'dark') classActive = 'navbar-link navbar-link-dark-selected navbar-link-dark'
    else if (selected !== `/${id}` && themeSelected.theme === 'dark') classActive = 'navbar-link navbar-link-dark'
    else if (selected === `/${id}` && themeSelected.theme === 'light') classActive = 'navbar-link navbar-link-light-selected navbar-link-light'
    else if (selected !== `/${id}` && themeSelected.theme === 'light') classActive = 'navbar-link navbar-link-light'

    return (
        <Link
            to={to}
            id={id}
            className={classActive}
            onClick={handleClick}>

            {icon}
            <p>{label}</p>

        </Link>
    )

}

export default NavbarLink