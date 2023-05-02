import { useParams } from "react-router-dom"
import { useState } from "react"
import { Button, Textarea } from 'react-rainbow-components'
import commentsService from "../../services/comments.service"
import FormError from "../FormError/FormError"


const CommentForm = ({ type, refreshComments, canComment, handdleCanComment }) => {

    const [comment, setComment] = useState('')
    const { id } = useParams()
    const [errors, setErrors] = useState([])

    const handleInputChange = (e) => {

        const { value } = e.target
        setComment(value)

    }
    const handleSubmit = (e) => {
        handdleCanComment(false)
        commentsService
            .createComment(type, id, { comment })
            .then(() => {
                setComment('')
                refreshComments()
            })
            .catch(err => {
                setErrors(err.response.data.errorMessages)
                handdleCanComment(true)
            })

    }
    return (
        < >
            {
                <div className="comment-form">

                    <Textarea
                        className="comment-textarea"
                        id="comment"
                        disabled={canComment ? false : true}
                        rows={2}
                        placeholder="Insert comment"
                        value={comment}
                        onChange={handleInputChange}
                    />
                    <div className="comment-btn">
                        <Button
                            label="Comment"
                            disabled={canComment ? false : true}
                            onClick={() => handleSubmit()}
                            variant="brand"
                        />
                    </div>

                    {
                        errors?.length > 0 &&
                        <FormError errorsArr={[errors]} />
                    }

                </div>
            }
        </>
    )
}

export default CommentForm