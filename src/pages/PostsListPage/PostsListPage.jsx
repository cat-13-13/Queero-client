import { useEffect, useState } from "react"
import { HelpText, Spinner } from "react-rainbow-components"
import PostsList from "../../components/PostsList/PostsList"
import postsService from "../../services/posts.service"
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"

const PostsListPage = () => {
    const { themeSelected } = useContext(ThemeContext)

    const [allPosts, setAllPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        getAllPosts()

    }, [])


    const getAllPosts = () => {
        postsService
            .getAllPosts()
            .then(({ data }) => {
                setAllPosts(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <h1 className={themeSelected.theme === 'light' ? 'page-title page-title-light' : 'page-title page-title-dark'}>
                Stories from Our Travelers: Tips and Experiences
                <HelpText
                    title="Posts Info"
                    text={<p>This page is a community-driven space where travelers can share their experiences and connect with others. You can browse through a collection of travel stories and tips from fellow LGBTI travelers, or create your own post and share your own travel experiences. We believe that sharing our stories and experiences is a powerful way to support and inspire each other as LGBTI travelers.</p>} />
            </h1>

            {
                isLoading ?

                    <Spinner size="large" />

                    :

                    <PostsList posts={allPosts} />
            }
        </>


    )

}

export default PostsListPage