/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAllStoragesQuery } from '../../app/storagesApi';

export function NavigationStorages() {
    const { data: storages, error, isLoading } = useGetAllStoragesQuery();

    if (isLoading || error || !storages || !storages.length) {
        return null;
    }

    return (
        <li className="nav-item dropdown">
            <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
            >
                Storages
            </a>
            <ul className="dropdown-menu">
                {storages.map(({ id, name }) => (
                    <li key={id}>
                        <Link to={`/storage/${id}`} className="dropdown-item">
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
    );
}
