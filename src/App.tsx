import React, {useEffect, useState} from 'react';
import './styles/custom-theme.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import ResultGrid from './components/ResultGrid';
import {ImageCardType} from "./types/types.ts";

const App: React.FC = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [imageCards, setImageCards] = useState<ImageCardType[]>([]);
    const [userID, setUserID] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('user_id');
        if (id) {
            setUserID(id)
        }
    }, []);

    useEffect(() => {
        setImageCards([])
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        if (debouncedQuery) {
            fetch(`${backendURL}/api/v1/search?user_id=${userID}&query=${debouncedQuery}`)
                .then(res => res.json())
                .then(data => {
                    setImageCards(data)
                });
        }
    }, [backendURL, userID, debouncedQuery]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header/>
            <main className="container text-center flex-grow-1 py-4">
                <SearchBar query={query} setQuery={setQuery}/>
                {/*<ChatInfo/>*/}
                <ResultGrid results={imageCards}/>
            </main>
            <Footer/>
        </div>
    );
};

export default App;