import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { ActivityTimeline, Avatar, TimelineMarker, Button, Textarea } from "react-rainbow-components"
import commentsService from "../../services/comments.service"
import getInitials from "../../utils/getInitials"
import capitalize from "../../utils/capitalize"
import { ThemeContext } from "../../contexts/theme.context"
import { Link } from "react-router-dom"
import formatDate from "../../utils/formatDate"
import UserModal from "../UserModal/UserModal"

const CommentsList = ({ refreshComments, specs, commentsData }) => {

    const [isEdit, setIsEdit] = useState({ status: false, index: null })
    const [commentValue, setCommentValue] = useState('')
    const { user } = useContext(AuthContext)
    const { themeSelected } = useContext(ThemeContext)

    const [showUserModal, setShowUserModal] = useState(false)
    const [userModal, setUserModal] = useState({})


    const handleInputChange = (e) => {

        const { value } = e.target
        setCommentValue(value)

    }

    const handleModal = (userId) => {
        setShowUserModal(true)
        setUserModal(userId)
    }

    const handleClose = () => {
        setShowUserModal(false)
    }

    const changeIsEdit = (status, index, comment) => {

        setIsEdit({ status, index })
        setCommentValue(comment)

    }

    const saveComment = (id) => {

        const comment = { comment: commentValue }

        commentsService
            .editComment(id, comment)
            .then(() => {
                setIsEdit({ status: null, index: null })
                refreshComments()
            })
            .catch(err => console.log(err))

    }

    const deleteComment = (id) => {

        commentsService
            .deleteComment(specs.type, specs.id, id)
            .then(() => {
                refreshComments()
            })
            .catch(err => console.log(err))

    }

    return (
        <div
            className={themeSelected.theme === 'light'
                ? "comments-container comments-container-light"
                : "comments-container comments-container-dark"
            }>

            {commentsData.length >= 1 ?

                <ActivityTimeline >
                    {

                        commentsData?.map((comment, index) => {
                            const { owner } = comment
                            const name = capitalize(owner.name)
                            let initials
                            if (owner) initials = getInitials(owner?.name, owner?.lastName)
                            return (
                                (isEdit.status && index === isEdit.index)
                                    ?
                                    <TimelineMarker
                                        key={comment._id}
                                        label={<Link className="comment-owner" onClick={() => handleModal(comment.owner._id)}>{capitalize(comment.owner.name)}</Link>}
                                        icon={
                                            <Avatar
                                                src={owner.avatar}
                                                initialsVariant="inverse"
                                                className={themeSelected.theme === 'light' ? "header-user-avatar header-user-avatar-light" : "header-user-avatar comments-user-avatar-dark"}
                                                assistiveText={`${capitalize(owner.name)}`}
                                                title={`${capitalize(owner.name)}`}
                                                initials={initials}

                                            />
                                        }
                                        datetime={formatDate(comment.createdAt)}
                                        description={
                                            < >
                                                <Textarea
                                                    className="comment-textarea"
                                                    id="comment"
                                                    rows={2}
                                                    placeholder={comment.comment}
                                                    value={commentValue}
                                                    onChange={handleInputChange}
                                                />

                                                {

                                                    (owner._id === user?._id || user?.role === 'ADMIN') &&
                                                    <span className={themeSelected.theme === 'light' ? "comment-btns comment-btns-light" : "comment-btns comment-btns-dark"}>
                                                        <Button onClick={() => changeIsEdit(null)}>Cancel</Button>
                                                        <Button onClick={() => saveComment(comment._id, index)}>Save</Button>
                                                    </span>
                                                }
                                            </>
                                        }
                                    />
                                    :
                                    <TimelineMarker
                                        key={comment._id}
                                        label={<Link className="comment-owner" onClick={() => handleModal(comment.owner._id)}>{capitalize(comment.owner.name)}</Link>}
                                        icon={
                                            <Avatar
                                                src={owner.avatar}
                                                initialsVariant="inverse"
                                                className={themeSelected.theme === 'light' ? "header-user-avatar header-user-avatar-light" : "header-user-avatar comments-user-avatar-dark"}
                                                assistiveText={`${capitalize(owner.name)}`}
                                                title={`${capitalize(owner.name)}`}
                                                initials={initials}

                                            />
                                        }
                                        datetime={formatDate(comment.createdAt)}
                                        description={
                                            <>

                                                {capitalize(comment.comment)}

                                                {

                                                    (owner._id === user?._id || user?.role === 'ADMIN') &&
                                                    <span className={themeSelected.theme === 'light' ? "comment-btns comment-btns-light" : "comment-btns comment-btns-dark"}>
                                                        <Button
                                                            onClick={() => changeIsEdit(true, index, comment.comment)}>Edit</Button>
                                                        <Button onClick={() => deleteComment(comment._id)}>Delete</Button>
                                                    </span>
                                                }
                                            </>
                                        }
                                    />


                            )
                        })
                    }
                </ActivityTimeline >
                :
                <p className="no-data">No comments yet...</p>
            }

            {
                showUserModal &&
                <UserModal showModal={showUserModal} handleClose={handleClose} userId={userModal} />
            }

        </div >
    )

}

export default CommentsList