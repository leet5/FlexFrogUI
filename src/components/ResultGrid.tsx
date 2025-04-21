import React from 'react';

type ResultGridProps = {
    results: string[];
};

const ResultGrid: React.FC<ResultGridProps> = ({results}) => (
    <div className="row g-2 mt-4">
        {results.map((url, index) => (<div className="col-4" key={index}>
                <img
                    src={url}
                    alt={`Result ${index + 1}`}
                    className="img-fluid rounded shadow-sm"
                />
            </div>))}
    </div>
);

export default ResultGrid;