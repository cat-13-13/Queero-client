import { useContext, useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { Card, HelpText, Pagination, Spinner } from 'react-rainbow-components';
import countriesService from "../../services/countries.service"
import capitalize from '../../utils/capitalize'
import CountryOptions from "../CountryOptions/CountryOptions"
import ModalCountry from "../ModalCountry/ModalCountry"
import Nivo from "../Nivo/Nivo"
import Image from "../../assets/images/bg.jpg"
import { ThemeContext } from "../../contexts/theme.context";

const CountriesList = () => {

    const { themeSelected } = useContext(ThemeContext)
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [queries, setQueries] = useState({
        discriminationProtection: '',
        violenceCriminalization: '',
        goodPlaceToLive: '',
        propaganda: '',
        illegalSameSexRelationships: '',
        transgenderLegal: '',
        calification: '',
        sort: {},
        page: 1,
    })

    useEffect(() => loadCountries(), [])
    useEffect(() => loadCountries(queries), [queries])

    const showCountry = country => {

        countryInformation(country)
        setShowModal(true)

    }

    const loadCountries = queries => {

        countriesService
            .getCountries({ ...queries, page: currentPage })
            .then(({ data }) => {
                setCountries(data.countries)
                setCurrentPage(data.currentPage)
                setTotalPages(data.totalPages)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

    }

    const handleClose = () => setShowModal(false)


    const getQueries = (newQuery) => {
        if (!newQuery.sort) setQueries({ ...queries, ...newQuery })
        else {
            newQuery.sort === "Murder0"
                ? setQueries({ ...queries, sort: { transMurderRates: -1 } })
                : newQuery.sort === "Murder1"
                    ? setQueries({ ...queries, sort: { transMurderRates: 1 } })
                    : newQuery.sort === "Safety0"
                        ? setQueries({ ...queries, sort: { safetyIndex: -1 } })
                        : newQuery.sort === "Safety1"
                            ? setQueries({ ...queries, sort: { safetyIndex: 1 } })
                            : newQuery.sort === "Name0"
                                ? setQueries({ ...queries, sort: { name: -1 } })
                                : newQuery.sort === "Name1"
                                    ? setQueries({ ...queries, sort: { name: 1 } })
                                    : newQuery.sort === "Score0"
                                        ? setQueries({ ...queries, sort: { score: -1 } })
                                        : setQueries({ ...queries, sort: { score: 1 } })
        }
    }

    const resetQueries = () => {
        setQueries({
            discriminationProtection: '',
            violenceCriminalization: '',
            goodPlaceToLive: '',
            propaganda: '',
            illegalSameSexRelationships: '',
            transgenderLegal: '',
            calification: '',
            sort: {},
            page: 1,
        });

        setCurrentPage(1);
        setTotalPages(0);
    }

    const resetPage = () => {
        setCurrentPage(1);
        setTotalPages(0);
    }

    const countryInformation = country => {

        countriesService
            .getOneCountryByCode(country)
            .then(({ data }) => setSelectedCountry(data))
            .catch(err => console.log(err))

    }

    const handleOnChange = (event, page) => {
        setCurrentPage(page)
        setQueries({ ...queries, page: page })
    }
    return (
        <>

            {
                isLoading ?
                    <Spinner size="large" />
                    :
                    <>
                        {(selectedCountry && showModal) &&
                            <ModalCountry handleClose={handleClose} showModal={showModal} country={selectedCountry} />
                        }

                        <div className="map">
                            <div id='root' className={themeSelected.theme === 'light' ? 'nivo nivo-light' : 'nivo nivo-dark'}>
                                <Nivo showCountry={showCountry} />
                                <div className="map-leyend">
                                    <p>Safety index map</p>
                                </div>
                            </div>
                        </div>


                        <CountryOptions getQueries={getQueries} resetQueries={resetQueries} resetPage={resetPage} />
                        {
                            countries.length > 0 ?
                                <div className="content-card-container">
                                    {countries.map(elm => {
                                        return <div key={elm._id} className="country-card-container">
                                            <Link to={elm._id}>
                                                <Card
                                                    key={elm.id}
                                                    footer={capitalize(elm.name + elm.flag)}
                                                    className='country-card'
                                                >
                                                    <img src={elm.img ? elm.img : Image} alt="" />
                                                </Card>

                                            </Link>
                                        </div>
                                    })}
                                </div>
                                :
                                <p className="country-list-result">No result with the selected filters...</p>
                        }

                        {
                            totalPages !== 0 &&
                            <Pagination
                                pages={totalPages}
                                activePage={currentPage}
                                className={'pagination'}
                                onChange={handleOnChange}
                                variant="shaded"
                            />
                        }


                    </>
            }
        </>
    )

}
export default CountriesList