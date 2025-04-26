import { useState } from 'react';
import { parseTags, createSearchFormData } from '../utils/searchUtils';
import { getTelegramInitData } from '../utils/telegram';
import { SearchResult } from '../types/types';

export const useSearch = () => {
    const [results, setResults] = useState<string[]>([]);

    const performSearch = async (query: string, selectedImage: File | null): Promise<void> => {
        const tags = parseTags(query);
        const formData = createSearchFormData(tags, selectedImage);
        const initData = getTelegramInitData();

        try {
            const response = await fetch('https://your-backend-url/search', {
                method: 'POST',
                headers: {
                    'X-Telegram-InitData': initData
                },
                body: formData
            });

            const data: SearchResult = await response.json();
            setResults(data.images || []);
        } catch (error) {
            console.error('Search failed:', error);
            setResults([]);
        }
    };

    return { results, performSearch };
};