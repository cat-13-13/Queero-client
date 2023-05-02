import { faHandPointDown } from '@fortawesome/free-solid-svg-icons'
import { faHandPointUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { ButtonIcon } from 'react-rainbow-components'
import { AuthContext } from '../../contexts/auth.context'


const VotesForm = ({ setVote }) => {

    const { user } = useContext(AuthContext)



    return (
        <>
            {
                user &&
                <>
                    < ButtonIcon
                        onClick={() => setVote('up')}
                        variant="brand"
                        size="large"
                        tooltip='Vote up'
                        icon={< FontAwesomeIcon icon={faHandPointUp} />
                        } />
                    < ButtonIcon
                        onClick={() => setVote('down')}
                        variant="brand"
                        size="large"
                        tooltip='Vote down'
                        icon={< FontAwesomeIcon icon={faHandPointDown} />
                        } />
                </>
            }
        </>
    )
}

export default VotesForm