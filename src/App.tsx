import React, {useEffect, useState} from 'react';

const App: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (!tg) return;

        tg.expand();
        tg.MainButton.setText('Search');

        const handleSearch = async () => {
            const initData = tg.initData || '';
            const res = await fetch('https://your-backend-url/search', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json', 'X-Telegram-InitData': initData
                }, body: JSON.stringify({query})
            });
            const data = await res.json();
            setResults(data.images || []);
        };

        tg.MainButton.onClick(handleSearch);
    }, [query]);

    return (<div className="p-4 text-center">
            <h1 className="text-xl font-bold mb-4">Telegram Image Search</h1>
            <input
                type="text"
                placeholder="Search images..."
                className="border border-gray-300 p-2 rounded w-full mb-4"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="grid grid-cols-3 gap-2">
                {results.map((url, index) => (<img key={index} src={url} alt="result" className="rounded shadow"/>))}
            </div>
        </div>);
};

export default App;