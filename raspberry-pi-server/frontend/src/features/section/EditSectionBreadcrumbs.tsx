import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    storageId: number;
    storageName?: string;
    sectionName?: string;
};

export function EditSectionBreadcrumbs({
    storageId,
    storageName = 'Storage',
    sectionName = 'Section',
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
                    {sectionName}
                </li>
            </ol>
        </nav>
    );
}
