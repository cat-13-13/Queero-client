import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"

const Footer = () => {

    const { themeSelected } = useContext(ThemeContext)

    return (
        <footer className={themeSelected.theme === 'light' ? "footer footer-light" : "footer footer-dark"}>
            <p>

                Made with 🖤 in Spain - by Cata & Juan
            </p>
        </footer>
    )
}

export default Footer