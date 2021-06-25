import React from 'react';
import { Link } from 'react-router-dom';

export function Storage() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">All storages</Link>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                Storage
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    );
}
