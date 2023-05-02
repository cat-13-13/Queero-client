import { useParams, } from 'react-router-dom'
import { useEffect, useState } from "react"
import commentsService from '../../services/comments.service'
import postsService from '../../services/posts.service'
import PostInfo from '../../components/PostInfo/PostInfo'
import PostsList from '../../components/PostsList/PostsList'
import CommentsList from '../../components/CommentsList/CommentsList'
import CommentForm from '../../components/CommentForm/CommentForm'
import capitalize from '../../utils/capitalize'
import { Spinner } from 'react-rainbow-components'

const PostPage = () => {

    const { id } = useParams()
    const [post, setPost] = useState([])
    const [commentsArr, setCommentsArr] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [canComment, setCanComment] = useState(true)

    const handdleCanComment = (boolean) => setCanComment(boolean)

    useEffect(() => {

        getPost()

    }, [])

    const getPost = () => {

        postsService
            .getOnePost(id)
            .then(({ data }) => {
                setCommentsArr(data.comments)
                setPost({ ...data, title: capitalize(data.title) })
                setIsLoading(false)

            })
            .catch(err => console.log(err))
    }



    const refreshComments = () => {

        commentsService
            .getComments('POST', id)
            .then(({ data }) => {
                setCommentsArr(data.comments)
                setCanComment(true)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {
                isLoading ?

                    <Spinner size="large" />

                    :
                    <>

                        <PostInfo post={post} />
                        <CommentsList specs={{ type: 'POST', id }} commentsData={commentsArr} refreshComments={refreshComments} />

                        <CommentForm
                            type='POST'
                            comments={commentsArr}
                            refreshComments={refreshComments}
                            canComment={canComment}
                            handdleCanComment={handdleCanComment}
                        />


                    </>
            }
        </>
    )
}

export default PostPage