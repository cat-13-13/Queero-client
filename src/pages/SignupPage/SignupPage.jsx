import { useContext } from 'react'
import SignupForm from '../../components/SignupForm/SignupForm'
import { ThemeContext } from '../../contexts/theme.context'

const SignupPage = () => {

    const { themeSelected } = useContext(ThemeContext)

    return (
        <div className={themeSelected.theme === 'light' ? "form-container form-container-light" : "form-container form-container-dark"}>

            <h1>Sign up</h1>
            <div className="form">
                <SignupForm />
            </div>

        </div>
    )
}
export default SignupPage