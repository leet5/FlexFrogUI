import React, { useCallback, useEffect, useState } from 'react';
import './styles/custom-theme.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import SearchBar from './components/SearchBar';
import ResultGrid from './components/ResultGrid';
import ImagePreview from './components/ImagePreview';
import { useSearch } from './hooks/useSearch';
import { initializeTelegram } from './utils/telegram';

const App: React.FC = () => {
    const [query, setQuery] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [tgAvailable, setTgAvailable] = useState(false);
    const { results, performSearch } = useSearch();

    const handleSearch = useCallback(async () => {
        await performSearch(query, selectedImage);
    }, [query, selectedImage, performSearch]);

    useEffect(() => {
        setSelectedImage(null);
    }, [query]);

    useEffect(() => {
        const isAvailable = initializeTelegram(handleSearch);
        setTgAvailable(isAvailable);
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