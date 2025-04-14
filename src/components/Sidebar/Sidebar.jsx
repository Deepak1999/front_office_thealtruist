import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/home" className="nav-link collapsed">
                        <i className="bi bi-menu-button-wide"></i><span>Home</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/upload-arrivals" className="nav-link collapsed">
                        <i className="bi bi-journal-text"></i><span>Upload Arrivals</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/create-user" className="nav-link collapsed">
                        <i className="bi bi-layout-text-window-reverse"></i><span>Create Users</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;

