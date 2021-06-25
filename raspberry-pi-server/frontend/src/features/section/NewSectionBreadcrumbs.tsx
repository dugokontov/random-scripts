import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    storageId: string;
    storageName?: string;
};

export function NewSectionBreadcrumbs({
    storageId,
    storageName = 'Storage',
}: Props) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">All storages</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <Link to={`/storage/${storageId}`}>{storageName}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    New section
                </li>
            </ol>
        </nav>
    );
}
