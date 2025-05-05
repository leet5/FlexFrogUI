import React, {useEffect, useState} from 'react';
import './styles/custom-theme.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import ResultGrid from './components/ResultGrid';
import ChatSelector from "./components/ChatSelector.tsx";
import {ChatCard} from "./types/types.ts";
import Loading from "./components/Loading.tsx";

const App: React.FC = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

    const [query, setQuery] = useState('');
    const [userID, setUserID] = useState<string | null>(null);
    const [chatID, setChatID] = useState<string | null>(null);
    const [chats, setChats] = useState<ChatCard[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            setIsLoading(true)
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
                        .finally(() => {
                            setIsLoading(false)
                        })
                }
            }, 100);
        }
    }, [backendURL]);

    useEffect(() => {
        setQuery('')
    }, [chatID])

    if (isLoading) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header/>
                <main className="container text-center flex-grow-1 py-4">
                    <Loading/>
                </main>
                <Footer/>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header/>
            <main className="container text-center flex-grow-1 py-4">
                <div className="content-jump-fix">
                    <ChatSelector chat={chatID} setChat={setChatID} chats={chats}/>
                    {chatID && (
                        <>
                            <SearchBar query={query} setQuery={setQuery}/>
                            <ResultGrid userID={userID} chatID={chatID} query={query} backendURL={backendURL}/>
                        </>
                    )}
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default App;