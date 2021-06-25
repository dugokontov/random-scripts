import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    storageName?: string;
};

export function StorageBreadcrumbs({ storageName = 'Storage' }: Props) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">All storages</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    {storageName}
                </li>
            </ol>
        </nav>
    );
}
