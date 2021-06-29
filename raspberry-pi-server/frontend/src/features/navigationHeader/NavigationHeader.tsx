import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationSearch } from './NavigationSearch';
import { NavigationStorages } from './NavigationStorages';

export function NavigationHeader() {
    return (
        <header className="navbar navbar-expand-md navbar-dark bg-primary mb-3">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <NavigationStorages />
                    </ul>
                    <NavigationSearch />
                </div>
            </div>
        </header>
    );
}
