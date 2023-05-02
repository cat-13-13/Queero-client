import { useContext, useEffect, useState } from "react"
import { Spinner } from "react-rainbow-components"
import { useParams } from "react-router-dom"
import CommentForm from "../../components/CommentForm/CommentForm"
import CommentsList from "../../components/CommentsList/CommentsList"
import CountryInfo from "../../components/CountryInfo/CountryInfo"
import { AuthContext } from "../../contexts/auth.context"
import commentsService from "../../services/comments.service"
import countriesService from "../../services/countries.service"
import capitalize from "../../utils/capitalize"

const CountryDetailsPage = () => {

    const { user } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()
    const [country, setCountry] = useState({})
    const [comments, setComments] = useState([])
    const [canComment, setCanComment] = useState(true)

    useEffect(() => {

        getCountry()

    }, [id])


    const getCountry = () => {

        countriesService
            .getOneCountry(id)
            .then(({ data }) => {
                setComments(data.comments)
                setCountry({ ...data, name: capitalize(data.name) })
                setIsLoading(false)
            })
            .catch(err => console.log(err))

    }

    const refreshComments = () => {

        commentsService
            .getComments('COUNTRY', id)
            .then(({ data }) => {
                setComments(data.comments)
                setCanComment(true)
            })
            .catch(err => console.log(err))

    }

    const handdleCanComment = (boolean) => setCanComment(boolean)


    return (
        <>
            {
                isLoading

                    ?

                    <Spinner size="large" />

                    :
                    <>
                        <CountryInfo country={country} />
                        <CommentsList specs={{ type: 'COUNTRY', id }} commentsData={comments} refreshComments={refreshComments} />
                        {
                            user &&
                            <CommentForm type='COUNTRY' comments={comments} refreshComments={refreshComments} handdleCanComment={handdleCanComment} canComment={canComment} />
                        }
                    </>
            }
        </>

    )
}

export default CountryDetailsPage 