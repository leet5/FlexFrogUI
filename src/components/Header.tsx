import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="py-3 froggy-header">
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="h4 m-0">
                    <img
                        src="/src/assets/frog-logo.png"
                        alt="FlexFrog Logo"
                        className="flexfrog-logo"
                    />
                    FlexFrog Search</h1>
                <span className="small">Powered by ToadGPT</span>
            </div>
        </header>
    );
};

export default Header;