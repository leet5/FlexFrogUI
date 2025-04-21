import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="py-3 mt-auto froggy-footer text-center">
            <div className="container text-center">
                <small>© {new Date().getFullYear()} FlexFrog. All rights reserved.</small>
            </div>
        </footer>
    );
};

export default Footer;