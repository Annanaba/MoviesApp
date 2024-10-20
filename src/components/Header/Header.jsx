import React from "react";
import PropTypes from 'prop-types';
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

Header.propTypes = {
    setActiveTab: PropTypes.func.isRequired, 
    activeTab: PropTypes.string.isRequired   
}

export default Header;