import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header className={`header-fixed froggy-header py-3 ${isVisible ? '' : 'header-hidden'}`}>
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