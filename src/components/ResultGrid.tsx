import React from 'react';
import {ImageCardType} from '../types/types';

type ResultGridProps = {
    results: ImageCardType[] | null;
};

const ResultGrid: React.FC<ResultGridProps> = ({results}) => {
    if (!results || results.length === 0) {
        return null;
    }
    return (
        <div className="row g-2 mt-4">
            {results.map((card, index) => (
                <div className="col-4" key={card.message_id}>
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
                                <span className="text-truncate">
                                    @{card.user_name} {' '}
                                    {new Date(card.created_at).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric',})} {' '}
                                    {new Date(card.created_at).toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,})}
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