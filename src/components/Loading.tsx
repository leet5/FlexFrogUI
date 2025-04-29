import React from "react";

const Loading: React.FC = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: '50vh',
                width: '90vw'
            }}
        >
            <div className="spinner"></div>
            <style>
                {`
                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 8px solid #e0f2eb;
                    border-top: 8px solid #3ba776;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                `}
            </style>
        </div>
    );
};



export default Loading;