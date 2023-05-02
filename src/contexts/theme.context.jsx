import { createContext, useState } from "react"
import { Application } from "react-rainbow-components"

const ThemeContext = createContext()

function ThemeProviderWrapper(props) {

    const [themeSelected, setThemeSelected] = useState({ theme: 'light', variant: 'brand' })

    const theme = {
        rainbow: {
            palette: {
                brand: themeSelected.theme === 'light' ? '#1f1f1f' : '#fff',
                mainBackground: '#ffffff'
            },
        },
    };
    const changeTheme = () => {
        themeSelected.theme === 'light' ? setThemeSelected({ variant: 'inverse', theme: 'dark' }) : setThemeSelected({ variant: 'brand', theme: 'light' })
    }
    return (
        <ThemeContext.Provider value={{ themeSelected, changeTheme }}>
            <Application theme={theme}>

                {props.children}
            </Application>

        </ThemeContext.Provider >
    )

}

export { ThemeContext, ThemeProviderWrapper }