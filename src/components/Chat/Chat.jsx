import { useState } from "react"
import chatService from "../../services/chat.service"
import ChatForm from "../ChatForm/ChatForm"
import UserEdit from "../UserEdit/UserEdit"
import UserModal from "../UserModal/UserModal"
import ChatModal from "./ChatModal"


const Chat = () => {

    const [showModal, setShowModal] = useState(false)
    const [showUserModal, setShowUserModal] = useState(false)
    const [showUserEditModal, setShowUserEditModal] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [messages, setMessages] = useState([]);

    const [type, setType] = useState(false)



    const handleOpenChat = (type) => {
        setType(type)
        setShowModal(true)
    }

    const handleCloseChat = () => setShowModal(false)

    const handleModal = () => setShowUserModal(true)

    const handleOpenUserDetailsModal = (userId) => {

        setCurrentUser(userId)
        setShowUserModal(true)

    }

    const changeUserModal = () => {

        setShowUserModal(!showUserModal)
        setShowUserEditModal(!showUserEditModal)
    }

    const handleCloseUserDetails = () => setShowUserModal(false)
    const handleCloseUserEdit = () => setShowUserEditModal(false)


    const changeType = (type) => setType(type)

    const getMessages = () => {

        chatService
            .getMessages()
            .then(({ data }) => setMessages(data.reverse()))
            .catch(err => console.log(err))
    }



    return (
        <>
            <div className="chat-container">
                <ChatForm getMessages={getMessages}
                    handleOpenUserDetailsModal={handleOpenUserDetailsModal}
                    handleOpenChat={handleOpenChat}
                    messages={messages}
                    handleModal={handleModal} />
            </div>
            {
                showModal &&
                <ChatModal showModal={showModal} handleCloseChat={handleCloseChat} type={type} changeType={changeType} />
            }
            {
                showUserModal &&
                <UserModal showUserModal={showUserModal}
                    handleCloseUserDetails={handleCloseUserDetails}
                    userId={currentUser}
                    changeUserModal={changeUserModal} />
            }
            {
                (showUserEditModal && currentUser) &&
                <UserEdit userId={currentUser} showUserEditModal={showUserEditModal} handleCloseUserEdit={handleCloseUserEdit} getMessages={getMessages} changeUserModal={changeUserModal} />
            }


        </>
    )
}

export default Chat