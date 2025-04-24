import React, {useCallback, useEffect, useState} from 'react';
import './styles/custom-theme.css';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import ImageUploader from './components/ImageUploader.tsx';
import SearchBar from './components/SearchBar.tsx';
import ResultGrid from './components/ResultGrid.tsx';
import ImagePreview from "./components/ImagePreview.tsx";

const App: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [tgAvailable, setTgAvailable] = useState(false);

    const parseTags = (input: string): string[] => input
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

    const handleSearch = useCallback(async () => {
        const tg = window.Telegram?.WebApp;
        const initData = tg?.initData || '';

        const tags = parseTags(query);
        const formData = new FormData();
        formData.append('tags', JSON.stringify(tags));
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            const response = await fetch('https://your-backend-url/search', {
                method: 'POST', headers: {
                    'X-Telegram-InitData': initData
                }, body: formData
            });

            const data = await response.json();
            setResults(data.images || []);
        } catch (error) {
            console.error('Search failed:', error);
        }
    }, [query, selectedImage]);

    useEffect(() => {
        setSelectedImage(null)
    }, [query]);

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (!tg) return;

        setTgAvailable(true);
        tg.expand();
        tg.MainButton.setText('Search');
        tg.MainButton.onClick(handleSearch);
    }, [handleSearch]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header/>
            <main className="container text-center flex-grow-1 py-4">
                <SearchBar value={query} onChange={setQuery} onSearch={handleSearch}/>
                <ImageUploader searchQuery={query} onImageSelect={setSelectedImage} />
                <ImagePreview image={selectedImage} tgAvailable={tgAvailable} onSearch={handleSearch}/>
                <ResultGrid results={results}/>
            </main>
            <Footer/>
        </div>
    );
};

export default App;