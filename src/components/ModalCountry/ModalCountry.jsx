import { Button, Modal } from "react-rainbow-components"
import { Link } from "react-router-dom"
import capitalize from "../../utils/capitalize"


const ModalCountry = ({ handleClose, country, showModal }) => {
    const {
        name,
        discriminationProtection,
        violenceCriminalization,
        goodPlaceToLive,
        transgenderLegal,
        transMurderRates,
        illegalSameSexRelationships,
        propaganda,
        score,
        calification,
        flag,
        _id: id
    } = country

    return (
        <Modal
            id="modal-2"
            isOpen={showModal}
            onRequestClose={handleClose}
            title={`What you need to know about ${capitalize(name)} ${flag} `}
            footer={
                < div className="rainbow-flex rainbow-justify_end" >
                    <><Button onClick={handleClose}>
                        Close
                    </Button>
                        <Link to={`./${id}`} onClick={handleClose}>
                            <Button>
                                More information...
                            </Button>
                        </Link></>
                </div >
            }
        >
            <div className="modal-country-content">
                <p><strong>Protection against discrimination:</strong> {discriminationProtection}</p>
                <p><strong>Criminalization against violence:</strong> {violenceCriminalization}</p>
                <p><strong>Is it a good place to live?:</strong> {goodPlaceToLive}</p>
                <p><strong>Transgender Legal Identity Laws:</strong> {transgenderLegal}</p>
                <p><strong>Trans murder rates:</strong> {transMurderRates}</p>
                <p><strong>Same-sex Relationships:</strong> {illegalSameSexRelationships}</p>
                <p><strong>Calification:</strong> {capitalize(calification)}</p>
                <p><strong>Propaganda/Morality Laws:</strong> {propaganda}</p>
                <p><strong>Our users score:</strong> {score}</p>
            </div>
        </Modal >
    )
}

export default ModalCountry