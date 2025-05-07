import React, {useEffect, useState} from 'react';
import {ChatCard, ImageCardType} from '../types/types';
import Loading from "./Loading.tsx";

type ResultGridProps = {
    userID: string | null;
    chat: ChatCard;
    query: string;
    backendURL: string
};

const ResultGrid: React.FC<ResultGridProps> = ({userID, chat, query, backendURL}) => {
    const [results, setResults] = React.useState<ImageCardType[]>([]);
    const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        if (debouncedQuery) {
            setResults([])
            setIsLoading(true)
            fetch(`${backendURL}/api/v1/search?user_id=${userID}&chat_id=${chat.id}&query=${debouncedQuery}`)
                .then(res => res.json())
                .then(data => {
                    setResults(data)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [debouncedQuery, userID, chat, backendURL]);

    if (isLoading) {
        return (<Loading/>);
    }

    if (!results || results.length === 0) {
        return (
            <div className="select-chat-message mt-4">
                <div className="message-content">
                    {!debouncedQuery ? 'Please enter a search term.' : 'No results found.'}
                </div>
            </div>
        );
    }

    const getTelegramLink = (messageId: number): string => {
        if (chat.is_private) {
            const cleanId = String(chat.id).replace('-100', '');
            return `https://t.me/c/${cleanId}/${messageId}`;
        } else if (chat.username) {
            return `https://t.me/${chat.username}/${messageId}`;
        }
        return '#'; // fallback
    };

    return (
        <div className="row g-2 mt-4">
            {results.map((card) => (
                <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={card.message_id}>
                    <div className="card">
                        <a
                            href={getTelegramLink(card.message_id)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={`data:image/jpeg;base64,${card.image_thumbnail}`}
                                alt="Message image"
                                className="card-img-top"
                            />
                        </a>
                        <UserInfo card={card}/>
                    </div>
                </div>
            ))}
        </div>)
};

export default ResultGrid;

const UserInfo: React.FC<{ card: ImageCardType }> = ({card}) => {
    return (
        <div className="card-body py-2 px-2">
            <div className="d-flex align-items-center">
                <img
                    src={`data:image/jpeg;base64,${card.user_thumbnail}`}
                    alt={card.user_name}
                    className="rounded-circle me-1"
                    width="16"
                    height="16"
                />
                <span className="text-truncate" style={{fontSize: '0.7rem', lineHeight: '1rem'}}>
                    @{card.user_name}{' '}
                    {new Date(card.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit', month: '2-digit', year: '2-digit',
                    })}{' '}
                    {new Date(card.created_at).toLocaleTimeString(undefined, {
                        hour: '2-digit', minute: '2-digit', hour12: false,
                    })}
                </span>
            </div>
        </div>
    );
};