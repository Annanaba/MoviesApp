import React from "react";
import "./Header.css";

const Header = ({ setActiveTab, activeTab}) => {
   

    return (
        <div className="header">
        <nav className="tabs">
            <ul>
                <li
                className={activeTab === 'search' ? 'active' : ''}
                onClick={() => setActiveTab('search')}>
                    Search
                </li>
                <li
                className={activeTab === 'rated' ? 'active' : ''}
                onClick={() => setActiveTab('rated')}>
                    Rated
                </li>
            </ul>
        </nav>
        </div>
    )
};

export default Header;