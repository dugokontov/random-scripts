import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationSearch } from './NavigationSearch';
import { NavigationStorages } from './NavigationStorages';

export function NavigationHeader() {
    return (
        <header className="navbar navbar-expand-md navbar-dark bg-primary mb-3">
            <div className="container-fluid">
                <div className="d-flex flex-row">
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item px-2">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <NavigationStorages />
                    </ul>
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarSupportedContent"
                >
                    <NavigationSearch />
                </div>
            </div>
        </header>
    );
}
