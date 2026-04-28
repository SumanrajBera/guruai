import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import WelcomeArea from '../components/WelcomeArea';
import ChatArea from '../components/ChatArea';
import '../styles/Dashboard.css';
import { useConversation } from '../hook/conversation'

const Dashboard = () => {
    const user = useSelector(state => state.auth.user);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isAITyping, setIsAITyping] = useState(false);
    const [isFetchingConv, setisFetchingConv] = useState(false)

    const handleNewChat = () => {
        setIsChatActive(false);
        setMessages([]);
        setIsSidebarOpen(false);
    };

    const handleSendPrompt = (text) => {
        setIsChatActive(true);
        const newMsg = { sender: 'user', text };
        setMessages([newMsg]);
        simulateAIResponse(text);
    };

    const handleSendMessage = (text) => {
        const newMsg = { sender: 'user', text };
        setMessages(prev => [...prev, newMsg]);
        simulateAIResponse(text);
    };

    const simulateAIResponse = (userText) => {
        setIsAITyping(true);
        setTimeout(() => {
            const aiMsg = {
                sender: 'ai',
                text: `This is a simulated AI response to: "${userText}". I am using the Emerald Sage design system.`
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsAITyping(false);
        }, 1500); // 1.5 second delay mock
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
            />

            <div className="main-content">
                <button className="menu-toggle-btn" onClick={toggleSidebar}>
                    ☰ Menu
                </button>

                {!isChatActive ? (
                    <WelcomeArea username={user} onSendPrompt={handleSendPrompt} />
                ) : (
                    <ChatArea
                        messages={messages}
                        isAITyping={isAITyping}
                        onSendMessage={handleSendMessage}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;