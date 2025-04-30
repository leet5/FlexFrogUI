import React from "react";
import "../styles/chat-selector.css"
import {ChatCard} from "../types/types.ts";

type ChatSelectorProps = {
    chat: string | null;
    setChat: (value: string | null) => void;
    chats: ChatCard[];
}

const ChatSelector: React.FC<ChatSelectorProps> = ({chat, setChat, chats}) => {
    const selectedChat = chats.find(c => c.id === chat);

    if (chat && selectedChat) {
        return (
            <div className="chat-card selected-chat" onClick={() => setChat(null)}>
                <img
                    className="chat-thumbnail"
                    src={`data:image/jpeg;base64,${selectedChat.thumbnail}`}
                    alt={selectedChat.name}
                />
                <span className="chat-name">{selectedChat.name}</span>
            </div>
        );
    }

    if (!chats || chats.length === 0) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <main className="container text-center flex-grow-1 py-4">
                    <div className="empty-state-container">
                        <i className="bi bi-chat-dots fs-1 mb-3 empty-state-icon"></i>
                        <h2 className="empty-state-title">No Chats Available</h2>
                        <p className="empty-state-text">
                            Start by writing a message in a chat where the bot is present
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <>
            <div className="select-chat-message">
                <div className="message-content">
                    <h5 className="mb-0">Select a chat to search</h5>
                </div>
                <div className="message-divider"></div>
            </div>
            <div className="chat-selector-scrollable">
                {chats.map(c => (
                    <div key={c.id} className="chat-card" onClick={() => setChat(c.id)}>
                        <img
                            className="chat-thumbnail"
                            src={`data:image/jpeg;base64,${c.thumbnail}`}
                            alt={c.name}
                        />
                        <span className="chat-name">{c.name}</span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ChatSelector;