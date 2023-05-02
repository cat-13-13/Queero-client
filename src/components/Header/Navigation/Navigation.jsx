import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NavbarLink from "../NavbarLink/NavbarLink"
import { faCode, faCodeBranch, faEdit, faFile, faFileWord, faHome, faMailBulk, faPaperPlane, faPassport, faPlane, } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from "react";
import { faGrinSquint } from "@fortawesome/free-regular-svg-icons";
import { ThemeContext } from "../../../contexts/theme.context";
import { useLocation, useParams } from "react-router-dom";


const Navigation = () => {
    let location = useLocation()
    useEffect(() => {
        if (location.pathname === '/') handleClick('/home')
        else handleClick(location.pathname)
    }, [location])

    const [selected, setSelected] = useState('/home')
    const { themeSelected } = useContext(ThemeContext)
    const handleClick = (path) => setSelected(path)

    return (

        <div className={themeSelected.theme === 'dark' ? "header-links header-links-dark" : 'header-links header-links-light'}>
            <NavbarLink selected={selected} to='./' id='home' icon={<FontAwesomeIcon size="lg" icon={faHome} />} label='Home' />

            <NavbarLink selected={selected} to='./countries' id='countries' icon={<FontAwesomeIcon size="lg" icon={faPlane} />} label='Countries' />

            <NavbarLink selected={selected} to='./posts' id='posts' icon={<FontAwesomeIcon size="lg" icon={faEdit} />} label='Posts' />

            <NavbarLink selected={selected} to='./aboutus' id='aboutus' icon={<FontAwesomeIcon size="lg" icon={faGrinSquint} />} label='About Us' />

            {/* <NavbarLink selected={selected} to='./contact' id='contact' icon={<FontAwesomeIcon size="lg" icon={faMailBulk} />} label='Contact' /> */}
        </div >
    )
}
export default Navigation