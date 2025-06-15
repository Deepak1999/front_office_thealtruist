import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiBaseUrl } from '../Api_base_url/ApiBaseUrl';

const Header = () => {

    const Name = localStorage.getItem('userName');
    const Fname = localStorage.getItem('userName');
    const role = localStorage.getItem('name');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (sidebarOpen) {
            document.body.classList.remove('toggle-sidebar');
        } else {
            document.body.classList.add('toggle-sidebar');
        }
    }, [sidebarOpen]);

    const handleSidebarToggle = () => {
        setSidebarOpen(prev => !prev);
    };

    const logout = async () => {

        const Jwttoken = localStorage.getItem('token');
        const source = localStorage.getItem('source');
        const userId = localStorage.getItem('id');

        if (!Jwttoken || !source || !userId) {
            toast.error('Missing necessary data');
            return;
        }

        try {
            const response = await fetch(`${ApiBaseUrl}/abuzz-admin/web/account/v1/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Jwttoken,
                    source,
                    userId,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const { statusCode, statusMessage } = data.statusDescription;

                if (statusCode === 200) {
                    toast.success(statusMessage || 'Logout successful');
                    localStorage.removeItem('userName');
                    localStorage.removeItem('name');
                    localStorage.removeItem('id');
                    localStorage.removeItem('token');
                    localStorage.removeItem('source');

                    window.location.href = '/';
                } else {
                    toast.error(statusMessage || 'failed to fetch data');
                }
            } else {
                toast.error('failed to fetch data with status: ' + response.status);
            }
        } catch (error) {
            toast.error('Error during fetch data: ' + error.message);
        }
    };

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            {/* <div className="d-flex align-items-center justify-content-between">
                <a className="logo d-flex align-items-center">
                    <img src="assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">Front Office</span>
                </a>
                <i className="bi bi-list toggle-sidebar-btn"></i>
            </div> */}

            <div className="d-flex align-items-center justify-content-between">
                <a className="logo d-flex align-items-center">
                    {/* <img src="assets/img/logo.png" alt="" /> */}
                    <img src="assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">Front Office</span>
                </a>
                <i
                    className="bi bi-list toggle-sidebar-btn"
                    onClick={handleSidebarToggle}
                    style={{ cursor: 'pointer' }}
                ></i>
            </div>

            <div className="search-bar">
                <formm className="search-form d-flex align-items-center">
                    <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                    <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                </formm>
            </div>

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    <li className="nav-item d-block d-lg-none">
                        <a className="nav-link nav-icon search-bar-toggle ">
                            <i className="bi bi-search"></i>
                        </a>
                    </li>

                    <li className="nav-item dropdown pe-3">
                        <a className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
                            <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
                            <span className="d-none d-md-block dropdown-toggle ps-2" style={{ cursor: 'pointer' }}>{Name}</span>
                        </a>

                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>{Fname}</h6>
                                <span>{role}</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <a className="dropdown-item d-flex align-items-center">
                                    <i className="bi bi-person"></i>
                                    <span style={{ cursor: 'pointer' }}>My Profile</span>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <a className="dropdown-item d-flex align-items-center" onClick={logout}>
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span style={{ cursor: 'pointer' }}>Sign Out</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                </ul>
            </nav>

            <ToastContainer />

        </header>
    );
};

export default Header;