// import CountryEditForm from "../../components/CountryEditForm/CountryEditForm"
// import { Container, Row, Col } from "react-bootstrap"
// import { Navigate, useNavigate, useParams } from 'react-router-dom'
// import { useContext } from "react"
// import { AuthContext } from "../../contexts/auth.context"

// const CountryEditPage = () => {

//     const navigate = useNavigate()
//     const { id } = useParams()
//     const { user } = useContext(AuthContext)

//     const fireFinalActions = () => navigate(`/countries/${id}`)

//     return (
//         <>

//             {
//                 user.role === 'ADMIN' ?
//                     < Container >

//                         <h1 className="mb-4">Edit Country</h1>
//                         <hr />

//                         <Row>

//                             <Col md={{ span: 8, offset: 2 }}>

//                                 <CountryEditForm fireFinalActions={fireFinalActions} />

//                             </Col >

//                         </Row>

//                     </Container >
//                     :
//                     <Navigate to={'/login'} />
//             }
//         </>
//     )
// }

// export default CountryEditPage