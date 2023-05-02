import { Route, Routes } from "react-router-dom"
import CountriesPage from "../pages/CountriesPage/CountriesPage"
import CountryDetailsPage from "../pages/CountryDetailsPage/CountryDetailsPage"
import CountryEditPage from "../pages/CountryEditPage/CountryEditPage"
import EditUserPage from "../pages/EditUserPage/EditUserPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import MyProfilePage from "../pages/MyProfilePage/MyProfilePage"
import SignupPage from "../pages/SignupPage/SignupPage"
import NewPostPage from "../pages/NewPostPage/NewPostPage"
import PostPage from "../pages/PostPage/PostPage"
import PrivateRoute from "./PrivateRoutes"
import PostsListPage from "../pages/PostsListPage/PostsListPage"
import HomePage from "../pages/HomePage/HomePage"
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage"
import ErrrorPage from "../pages/ErrrorPage/ErrrorPage"
const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/aboutus" element={<AboutUsPage />} />
            {/* <Route path="/contact" element={<p>CONTACT</p>} /> */}
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/countries/:id" element={<CountryDetailsPage />} />
            <Route path="/posts" element={<PostsListPage />} />
            <Route path="/posts/:id" element={<PostPage />} />

            <Route element={<PrivateRoute />}>
                <Route path="/myprofile" element={<MyProfilePage />} />
                <Route path="/users/:id/edit" element={<EditUserPage />} />
                <Route path="/countries/:id/edit" element={<CountryEditPage />} />
                <Route path="/posts/create" element={<NewPostPage />} />
            </Route>

            <Route path="*" element={<ErrrorPage />} />
        </Routes>
    )
}

export default AppRoutes