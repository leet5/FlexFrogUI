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
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const initTelegram = async () => {
            if (!window.Telegram?.WebApp) {
                console.warn("Telegram WebApp not found; using fallback");
                setIsLoading(false);
                return;
            }

            window.Telegram.WebApp.ready();

            timeout = setTimeout(() => {
                console.warn("Timed out waiting for Telegram initDataUnsafe.user");
                setIsLoading(false);
            }, 5000);

            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            if (user?.id) {
                clearTimeout(timeout);
                const uid = user.id.toString();
                setUserID(uid);

                try {
                    const res = await fetch(`${backendURL}/api/v1/chats?user_id=${uid}`);
                    const data = await res.json();
                    setChats(data);
                } catch (err) {
                    console.error("Error fetching chats:", err);
                }
            }

            setIsLoading(false);
        };

        initTelegram();

        return () => clearTimeout(timeout);
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