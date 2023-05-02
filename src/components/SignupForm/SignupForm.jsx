import { useContext, useState } from "react"
import authService from "../../services/auth.service"
import { useNavigate } from 'react-router-dom'
import FormError from "../FormError/FormError"

import { ProgressIndicator, ProgressStep, Button, Input, Notification } from 'react-rainbow-components'
import styled from 'styled-components'
import { ThemeContext } from "../../contexts/theme.context"
// const StyledLabel = styled.p.attrs(props => {
//     return props.theme.rainbow.palette;
// })`
//     color: ${props => props.text.label};
// `

const SignupForm = ({ handleCloseChat }) => {

    const stepNames = ['step-1', 'step-2', 'step-3'];
    const { themeSelected } = useContext(ThemeContext)
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [currentStepName, setCurrentStepName] = useState('step-1')

    const [signupData, setSignupData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const handleInputChange = e => {

        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })

    }

    const handleFormSubmit = e => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => {
                navigate('/login')
                handleCloseChat()
            })
            .catch(err => setErrors([err.response.data.errorMessages]))

    }

    const handleOnClick = (event, name) => {

        setCurrentStepName(name)
        setCurrentStepIndex(Number(name.slice(-1)) - 1)

    }

    const handleNextClick = () => {
        if (currentStepIndex < stepNames.length - 1) {
            const nextStepIndex = currentStepIndex + 1
            setCurrentStepIndex(nextStepIndex)
            setCurrentStepName(`step-${nextStepIndex + 1}`)
        }
    }

    const handleBackClick = () => {
        if (currentStepIndex > 0) {
            const previewStepIndex = currentStepIndex - 1
            setCurrentStepIndex(previewStepIndex)
            setCurrentStepName(`step-${previewStepIndex + 1}`)
        }
    }

    const isNextDisabled = () => {
        if (currentStepIndex < stepNames.length - 1 && currentStepIndex >= 0) {
            return false;
        }
        return true;
    }

    const isBackDisabled = () => {
        if (currentStepIndex > 0 && currentStepIndex < stepNames.length) {
            return false;
        }
        return true;
    }


    return (

        <div>
            <ProgressIndicator currentStepName={currentStepName} onClick={handleOnClick} className="steps-bar">
                <ProgressStep name="step-1" />
                <ProgressStep name="step-2" />
                <ProgressStep name="step-3" />
            </ProgressIndicator>
            <div>

            </div>
            {
                currentStepIndex === 0 &&
                <div className={themeSelected.theme === 'light' ? "input input-light" : "input input-dark"}>
                    <Input
                        label="Name"
                        labelAlignment="left"
                        placeholder="Your name"
                        type="text"
                        controlId="name"
                        name="name"
                        value={signupData.name}
                        onChange={handleInputChange}
                    // style={inputStyles}
                    />
                </div>
            }
            {
                currentStepIndex === 1 &&
                <div className={themeSelected.theme === 'light' ? "input input-light" : "input input-dark"}>
                    <Input
                        label="Last name"
                        labelAlignment="left"
                        placeholder="Your last name"
                        type="text"
                        controlId="lastName"
                        name="lastName"
                        value={signupData.lastName}
                        onChange={handleInputChange}
                    // style={inputStyles}
                    />
                </div>
            }
            {
                currentStepIndex === 2 &&
                <div>
                    <div className={themeSelected.theme === 'light' ? "input input-light" : "input input-dark"}>
                        <Input
                            label="Email"
                            labelAlignment="left"
                            placeholder="Email@gmail.com"
                            type="email"
                            controlId="email"
                            name="email"
                            value={signupData.email}
                            onChange={handleInputChange}
                        // style={inputStyles}
                        />
                    </div>
                    <div className={themeSelected.theme === 'light' ? "input input-light" : "input input-dark"}>
                        <Input
                            label="Password"
                            labelAlignment="left"
                            placeholder="**********"
                            type="password"
                            controlId="password"
                            name="password"
                            value={signupData.password}
                            onChange={handleInputChange}
                        // style={inputStyles}
                        />
                    </div>
                </div>
            }
            <div className="signup-btn">
                {
                    currentStepIndex === 2 &&
                    <Button
                        label="Submit"
                        onClick={handleFormSubmit}
                        variant="brand"
                    />
                }

                <Button
                    label="Back"
                    onClick={() => handleBackClick()}
                    variant="brand"
                    disabled={isBackDisabled()}
                />

                <Button
                    label="Next"
                    onClick={() => handleNextClick()}
                    variant="brand"
                    disabled={isNextDisabled()}
                />
            </div>

            {
                errors?.length > 0 &&
                <FormError errorsArr={errors} />
            }
        </ div>
    )
}

export default SignupForm

