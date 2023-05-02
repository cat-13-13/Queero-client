import { useState } from "react"
import { Button, Drawer } from "react-rainbow-components"
import { Link } from "react-router-dom"
import LoginForm from "../LoginForm/LoginForm"
import SignupForm from "../SignupForm/SignupForm"


const ChatModal = ({ handleCloseChat, showModal, type, changeType }) => {

    const [modalType, setModalType] = useState(type)


    return (<Drawer
        header="Login / Signup"
        footer={
            <Button onClick={handleCloseChat}>
                Close
            </Button>
        }
        size='small'
        slideFrom="right"
        isOpen={showModal}
        onRequestClose={handleCloseChat}
    >
        <>
            {
                modalType === 'login' ?
                    <div className="chat-modal-container">
                        <h1>Login</h1>
                        <LoginForm handleCloseChat={handleCloseChat} />
                        <p>Don't have an account? <Link onClick={() => setModalType('signup')}>Sign up</Link></p>
                    </div>
                    :
                    <div className="chat-modal-container">
                        <h1>Signup</h1>
                        <SignupForm handleCloseChat={handleCloseChat} />
                        <p>Already have an account? <Link onClick={() => setModalType('login')}>Login</Link></p>
                    </div>

            }
        </>
    </Drawer>)
}

export default ChatModal