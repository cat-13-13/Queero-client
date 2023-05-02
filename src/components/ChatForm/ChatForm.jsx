import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from '../../contexts/auth.context'
import io from 'socket.io-client';
import chatService from "../../services/chat.service";
import capitalize from "../../utils/capitalize";
import { Link } from "react-router-dom";
import { ButtonIcon } from "react-rainbow-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faTimes } from "@fortawesome/free-solid-svg-icons";

const ChatForm = ({ handleOpenChat, getMessages, handleOpenUserDetailsModal, messages }) => {
    const socket = useRef(null);
    const { user, getToken } = useContext(AuthContext)
    const [useChat, setUseChat] = useState(false)

    const handleConnect = () => {
        if (!useChat) setUseChat(true)
        else {
            socket.current.disconnect();
            setUseChat(false)
        }
    }

    useEffect(() => {
        if (user && useChat) {
            getMessages()
            socket.current = io.connect('http://localhost:5005', { transports: ['websocket'], query: { token: getToken() } });

            socket.current.on('chat message', function (msg) {
                getMessages()
            });
        }

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [useChat]);

    const handleSubmit = (event) => {

        event.preventDefault();
        setUseChat(true)

        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value

        chatService
            .createMessage({ message })
            .then(() => getMessages())
            .then(() => {
                chatInput.value = '';
                socket.current.emit('chat message')
            })
            .catch(err => console.log(err))

    };



    return (
        <>
            <>
                {(user && useChat) &&
                    <div className="chat-messages-container">
                        {messages.map(({ message, owner, _id }) => (
                            <p key={_id}><Link onClick={() => handleOpenUserDetailsModal(owner?._id)}>{capitalize(owner?.name)}:</Link>{` ${capitalize(message)}`}</p>
                        ))}
                    </div>
                }
                {
                    user ?
                        <form onSubmit={handleSubmit} id='chat' className="chat-form">
                            <ButtonIcon
                                className='chat-input-icon'
                                onClick={handleConnect}
                                variant="brand"
                                size="large"
                                tooltip={useChat ? 'Close chat' : 'Start chating'}
                                icon={<FontAwesomeIcon icon={useChat ? faTimes : faComment} />
                                } />

                            <input
                                placeholder="Start chating..."
                                type="text"
                                id="chat-input"
                                className={useChat ? "chat-input chat-input-active" : "chat-input"}
                            />
                        </form>
                        :
                        <div id='chat' className="chat-form">
                            <ButtonIcon
                                className='chat-input-icon'
                                variant="border-filled"
                                size="large"
                                tooltip={useChat ? 'Close chat' : 'Start chating'}
                                icon={<FontAwesomeIcon icon={useChat ? faTimes : faComment} />
                                } />

                            <div className="chat-visitor">
                                <p><Link onClick={() => handleOpenChat('login')}>Login</Link> or <Link onClick={() => handleOpenChat('signup')}>Signup</Link> to start chating...</p>
                            </div>
                        </div>
                }

            </>
        </>
    );
};

export default ChatForm;
