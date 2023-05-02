import { useContext } from "react"
import { HelpText } from "react-rainbow-components"
import CountriesList from "../../components/CountriesList/CountriesList"
import { ThemeContext } from "../../contexts/theme.context"

const CountriesPage = () => {

    const { themeSelected } = useContext(ThemeContext)

    return (
        <>
            <h1 className={themeSelected.theme === 'light' ? 'page-title page-title-light' : 'page-title page-title-dark'}>
                Compare LGBTI Safety Across The World
                <HelpText
                    title="Map Info"
                    text={<p>Our interactive and clickable LGBTI Safety Index Map allows you to explore the safety of different countries around the world for LGBTI individuals. The map is color-coded to represent the level of safety in each country, with blue indicating a high level of safety and red indicating a lower level of safety. You can easily navigate the map to find the countries you're interested in, and when you click on a country, you'll be able to access detailed information about its LGBTI rights, laws, and cultural attitudes.</p>} />
            </h1>
            <CountriesList />
        </>
    )
}

export default CountriesPage