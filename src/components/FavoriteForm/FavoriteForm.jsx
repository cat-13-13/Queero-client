import { useContext, useEffect, useState } from "react"
import userService from "../../services/user.service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonIcon } from 'react-rainbow-components'
import { faHeart as noFav } from "@fortawesome/free-regular-svg-icons"
import { faHeart as Fav } from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from "../../contexts/auth.context"



const FavoriteForm = ({ specs }) => {

    const { type, id } = specs
    const { user } = useContext(AuthContext)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {

        verifyFavorite()

    }, [])

    const verifyFavorite = () => {

        userService
            .isFavorite(type, id)
            .then(({ data }) => setIsFavorite(data))
            .catch(err => console.log(err))

    }


    const handleConnect = () => {

        userService
            .addFavorite(type, id)
            .then(() => setIsFavorite(!isFavorite))
            .catch(err => console.log(err))

    }
    return (

        <>
            {
                user &&
                < ButtonIcon
                    onClick={handleConnect}
                    variant="brand"
                    size="large"
                    tooltip={isFavorite ? "Alredy favorite" : 'Make favorite'}
                    icon={< FontAwesomeIcon icon={isFavorite ? Fav : noFav} />
                    } />
            }
        </>

    )
}

export default FavoriteForm