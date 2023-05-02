import { faEdit, faHeart, faPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { Accordion, AccordionSection, Button, Select } from 'react-rainbow-components'
import { Link } from 'react-router-dom'
import UserInfo from '../../components/UserInfo/UserInfo'
import { AuthContext } from '../../contexts/auth.context'
import postsService from '../../services/posts.service'
import userService from '../../services/user.service'
import capitalize from '../../utils/capitalize'

const MyProfilePage = () => {

    const [posts, setPosts] = useState([])
    const [favoriteCountries, setFavoriteCountries] = useState([])
    const [favoritePosts, setFavoritePosts] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {

        getMyPosts()
        getMyFavorites()

    }, [])

    const getMyPosts = () => {

        postsService
            .getByOwner(user?._id)
            .then(post => setPosts(post.data))
            .catch(err => console.log(err))

    }

    const getMyFavorites = () => {

        userService
            .getUser(user?._id)
            .then(({ data }) => {

                const { favoriteCountries, favoritePosts } = data

                setFavoriteCountries(favoriteCountries)
                setFavoritePosts(favoritePosts)

            })
            .catch(err => console.log(err))

    }

    return (
        <div>

            <UserInfo />

            <div className='profile-accordions'>

                <Accordion >
                    <AccordionSection icon={<FontAwesomeIcon icon={faPlane} />}
                        label="My favorite countries">

                        {
                            favoriteCountries.length >= 1

                                ? favoriteCountries.map(country => {
                                    return (
                                        <Link key={country._id} to={`/countries/${country._id}`}>
                                            <p>{country.flag} {capitalize(country.name)}</p>
                                        </Link>
                                    )
                                })

                                : <p>You dont have favorite countries yet.</p>
                        }

                    </AccordionSection>
                </Accordion >

                <Accordion >
                    <AccordionSection icon={<FontAwesomeIcon icon={faHeart} />}
                        label="My favorite posts">

                        {
                            favoritePosts.length >= 1

                                ? favoritePosts.map(post => {
                                    return (
                                        <Link key={post._id} to={`/posts/${post._id}`}>
                                            <p>{[post.country.flag]} {capitalize(post.title)} </p>
                                        </Link>
                                    )
                                })
                                : <p>You dont have favorite posts yet.</p>
                        }

                    </AccordionSection>
                </Accordion >

                <Accordion >
                    <AccordionSection icon={<FontAwesomeIcon icon={faEdit} />}
                        label="My posts">

                        {
                            posts.length >= 1

                                ?
                                <ul>
                                    {

                                        posts.map(elm => {
                                            return (
                                                <li key={elm._id}>
                                                    <Link to={`/posts/${elm._id}`}>{elm.country.flag} {capitalize(elm.title)}</Link>
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                                : <p>You haven't created posts yet.</p>

                        }

                    </AccordionSection>
                </Accordion >
            </div>


        </div>
    )
}
export default MyProfilePage