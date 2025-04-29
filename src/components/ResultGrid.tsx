import React, {useEffect, useState} from 'react';
import {ImageCardType} from '../types/types';
import Loading from "./Loading.tsx";

type ResultGridProps = {
    userID: string | null;
    chatID: string | null;
    query: string;
    backendURL: string
};

const ResultGrid: React.FC<ResultGridProps> = ({userID, chatID, query, backendURL}) => {
    const [results, setResults] = React.useState<ImageCardType[]>([]);
    const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setResults([])
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        if (debouncedQuery) {
            setIsLoading(true)
            fetch(`${backendURL}/api/v1/search?user_id=${userID}&chat_id=${chatID}&query=${debouncedQuery}`)
                .then(res => res.json())
                .then(data => {
                    setResults(data)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [debouncedQuery, userID, chatID, backendURL]);

    if (isLoading) {
        return (
            <Loading/>
        );
    }

    if (!results || results.length === 0) {
        return null;
    }

    return (
        <div className="row g-2 mt-4">
            {results.map((card) => (
                <div className="col-12 col-sm-6 col-md-4" key={card.message_id}>
                    <div className="card">
                        <img
                            src={`data:image/jpeg;base64,${card.image_thumbnail}`}
                            alt="Message image"
                            className="card-img-top"
                        />
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-2">
                                <img
                                    src={`data:image/jpeg;base64,${card.user_thumbnail}`}
                                    alt={card.user_name}
                                    className="rounded-circle me-2"
                                    width="24"
                                    height="24"
                                />
                                <span className="d-flex flex-column text-break">
                                    @{card.user_name} {' '}
                                    {new Date(card.created_at).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })} {' '}
                                    {new Date(card.created_at).toLocaleTimeString(undefined, {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: false,
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default ResultGrid;