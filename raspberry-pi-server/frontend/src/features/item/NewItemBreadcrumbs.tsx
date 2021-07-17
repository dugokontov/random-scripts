import React from 'react';
import { Link } from 'react-router-dom';
import { useStorageIdParams } from '../../app/hooks';

type Props = {
    storageName?: string;
};

export function NewItemBreadcrumbs({ storageName = 'Storage' }: Props) {
    const storageId = useStorageIdParams();
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
                    New item
                </li>
            </ol>
        </nav>
    );
}
