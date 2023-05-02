// import { useEffect, useState } from "react"
// import { Form } from "react-bootstrap"
// import { useNavigate } from "react-router-dom"
// import countriesService from "../../services/countries.service"
// import capitalize from "../../utils/capitalize"


// const SearchForm = () => {

//     const [countriesBackup, setCountriesBackup] = useState([])
//     const [countries, setCountries] = useState([])
//     const navigate = useNavigate()
//     const [showOptions, setShowOptions] = useState(false)

//     useEffect(() => getCountries(), [])

//     const getCountries = () => {

//         countriesService
//             .getCountriesNames()
//             .then(({ data }) => {

//                 setCountriesBackup(data)
//                 setCountries(data)

//             })
//             .catch(err => console.log(err))

//     }

//     const handleChange = (e) => {


//         const filteredCountries = countriesBackup.filter(elm => elm.name.startsWith(e.target.value))

//         setCountries(filteredCountries)
//         const selectElement = document.getElementById('options');
//         const optionCount = filteredCountries.length;

//         selectElement.style.height = `${optionCount * 2}rem`;

//         e.target.value !== '' && filteredCountries.length >= 1 ? setShowOptions(true) : setShowOptions(false)
//     }

//     const handleOnClick = (e) => {

//         setShowOptions(false)

//         countriesService
//             .getOneCountry(e.target.value)
//             .then(({ data }) => navigate(`/countries/${data._id}`))

//             .catch(err => console.log(err))
//     }

//     return (

//         <Form>

//             <Form.Control style={{ position: 'relative', width: '300px' }} type="text" placeholder="Search" list="options" onChange={handleChange} />
//             <Form.Select style={{ position: 'absolute', width: '300px', overflow: 'hidden', maxHeight: '90px' }} hidden={!showOptions} id="options" multiple >
//                 {countries.map((option) => {
//                     return <option value={option._id} key={option._id} onClick={handleOnClick}>{capitalize(option.name)}</option>
//                 }
//                 )}
//             </Form.Select>

//         </Form>

//     )
// }

// export default SearchForm