// import { Alert } from "react-bootstrap"
import { Notification } from "react-rainbow-components"
import { useEffect, useState } from "react"

const FormError = ({ errorsArr }) => {

    const [errors, setErrors] = useState(errorsArr[0])

    useEffect(() => setErrors(errorsArr[0]), [errorsArr])

    const handleClose = i => {
        const errorsCopy = [...errors]
        errorsCopy.splice(i, 1)
        setErrors(errorsCopy)
    }


    return (
        < div variant={'danger'} className='error-div'>
            {
                errors?.map((elm, index) => {
                    return <Notification
                        key={index}
                        className="error-alert-notification"
                        title="Error"
                        icon="error"
                        description={elm}
                        onRequestClose={() => handleClose(index)}
                    />
                })
            }


        </div >
    )
}

export default FormError