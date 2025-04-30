import React, {useEffect, useState} from 'react';
import './styles/custom-theme.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import ResultGrid from './components/ResultGrid';
import ChatSelector from "./components/ChatSelector.tsx";
import {ChatCard} from "./types/types.ts";

const App: React.FC = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

    const [query, setQuery] = useState('');
    const [userID, setUserID] = useState<string | null>(null);
    const [chatID, setChatID] = useState<string | null>(null);
    const [chats, setChats] = useState<ChatCard[]>([]);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.ready();
            setTimeout(() => {
                const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
                if (user?.id) {
                    setUserID(user.id.toString());
                    fetch(`${backendURL}/api/v1/chats?user_id=${user.id.toString()}`)
                        .then(res => res.json())
                        .then(data => {
                            setChats(data)
                        })
                }
            }, 100);
        }
    }, [backendURL]);

    useEffect(() => {
        setQuery('')
    }, [chatID])

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header/>
            <main className="container text-center flex-grow-1 py-4">
                <ChatSelector chat={chatID} setChat={setChatID} chats={chats}/>
                {chatID && (
                    <>
                        <SearchBar query={query} setQuery={setQuery}/>
                        <ResultGrid userID={userID} chatID={chatID} query={query} backendURL={backendURL}/>
                    </>
                )}
            </main>
            <Footer/>
        </div>
    );
};

export default App;