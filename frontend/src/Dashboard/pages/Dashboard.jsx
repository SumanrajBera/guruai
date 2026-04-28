import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import WelcomeArea from '../components/WelcomeArea';
import ChatArea from '../components/ChatArea';
import '../styles/Dashboard.css';
import { useConversation } from '../hook/conversation'
import { addChat, clearTemp, setActiveConvoID } from '../state/conversation.state';

const Dashboard = () => {
    const user = useSelector(state => state.auth.user);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);
    const [message, setMessage] = useState([]);
    const [isFetchingConv, setisFetchingConv] = useState(false)
    const dispatch = useDispatch()

    const handleNewChat = () => {
        setIsChatActive(false);
        setMessage([]);
        dispatch(setActiveConvoID(null))
        dispatch(clearTemp())
        setIsSidebarOpen(false);
    };

    const handleSendPrompt = (text) => {
        setIsChatActive(true);
        const newMsg = { role: 'human', content: text };
        setMessage([newMsg]);
        dispatch(addChat({ message: newMsg }))
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const { fetchConversationHistory } = useConversation()

    useEffect(() => {
        fetchConversationHistory(setisFetchingConv)
    }, [])

    return (
        <div className="dashboard-container">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onNewChat={handleNewChat}
                isFetchingConv={isFetchingConv}
                setIsChatActive={setIsChatActive}
            />

            <div className="main-content">
                <button className="menu-toggle-btn" onClick={toggleSidebar}>
                    ☰ Menu
                </button>

                {!isChatActive ? (
                    <WelcomeArea username={user} onSendPrompt={handleSendPrompt} />
                ) : (
                    <ChatArea
                        firstMessage={message[0]?.content}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;