import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import countriesService from '../../services/countries.service'
import votesService from '../../services/votes.service'
import PostsList from '../PostsList/PostsList'
import VotesForm from '../VotesForm/VotesForm'
import FavoriteForm from '../FavoriteForm/FavoriteForm'
import PostsOptions from '../PostsOptions/PostsOptions'
import { Button } from 'react-rainbow-components'
import { ThemeContext } from '../../contexts/theme.context'
import capitalize from '../../utils/capitalize'


const CountryInfo = ({ country }) => {
    const { themeSelected } = useContext(ThemeContext)
    const [votes, setVotes] = useState(0)
    const [posts, setPosts] = useState(country.posts)
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        refreshVotes()
    }, [])

    const handleClick = (e) => {

        e.preventDefault()

        countriesService
            .deleteCountry(id)
            .then(() => navigate('/countries'))
            .catch(err => console.log(err))
    }

    const refreshVotes = () => {

        votesService.getVotes('COUNTRY', id)
            .then(({ data }) => setVotes(Number(data)))
            .catch(err => console.log(err))
    }

    const setVote = (vote) => {

        votesService
            .setVote('COUNTRY', id, { vote })
            .then(() => refreshVotes())
            .catch(err => console.log(err))

    }
    const filterPosts = posts => {

        setPosts(posts)

    }

    const calificationColor = country.calification === ('a' || 'b+' || 'b-' || 'b' || 'c+' || 'c' || 'c-') ?
        'calification-green' : 'calification-red'

    return (
        <div className={themeSelected.theme === 'light' ? 'country-info-container country-info-container-light' : 'country-info-container country-info-container-dark'}>

            <article className='country-info-title'>
                <img src={country.img ? country.img : 'https://images.unsplash.com/photo-1552428386-840770ff7588?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80'} alt={country.name} />
                <span>
                    <h1>{country.flag}{country.name}</h1>
                    <FavoriteForm specs={{ type: 'COUNTRY', id }} />
                </span>

            </article>

            <div className={themeSelected.theme === 'light' ? 'country-info-details country-info-details-light' : 'country-info-details country-info-details-dark'}>
                <article className='country-score-container'>
                    <div className='country-calification'>

                        <h3>Calification: </h3>

                        <p className={calificationColor}>{` ${capitalize(country.calification)}`}</p>
                    </div>

                    <div className='country-score'>
                        <h3>Our score: {votes}</h3>

                        <VotesForm setVote={setVote} />
                    </div>

                    {
                        user?.role === 'ADMIN' &&
                        <>
                            <Link to={`/countries/${id}/edit`}>Edit</Link>
                            <Link to={'/delete'} onClick={handleClick}>Delete</Link>
                        </>
                    }
                </article>

                <div className='country-details'>
                    <h4>About the country</h4>
                    <p> {country.description}</p>
                    <h4>Country statistics</h4>
                    <p><strong> Protection against discrimination:</strong> {country.discriminationProtection}</p>
                    <p> <strong>Criminalization against violence:</strong>  {country.violenceCriminalization}</p>
                    <p> <strong>Is it a good place to live?:</strong>  {country.goodPlaceToLive}</p>
                    <p> <strong>Same sex relationships:</strong>  {country.illegalSameSexRelationships}</p>
                    <p> <strong>Transgender people murders rate:</strong>  {country.transMurderRates}</p>
                    <p> <strong>Transgender Legal Identity Laws:</strong>  {country.transgenderLegal}</p>
                    <p> <strong>Propaganda/Morality Laws:</strong>  {country.propaganda}</p>
                    <p> <strong>Safety index:</strong>  {country.safetyIndex}</p>

                </div>

            </div>
            <PostsOptions filterPosts={filterPosts} country={id} />
            <PostsList posts={posts} country={id} />


        </div>
    )
}


export default CountryInfo

