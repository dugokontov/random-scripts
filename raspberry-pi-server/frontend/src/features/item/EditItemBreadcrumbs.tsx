import React from 'react';
import { Link } from 'react-router-dom';
import { useItemIdParams } from '../../app/hooks';
import { useGetItemQuery } from '../../app/itemsApi';
import { useGetAllStoragesQuery } from '../../app/storagesApi';

export function EditItemBreadcrumbs() {
    const itemId = useItemIdParams();
    const { data: item } = useGetItemQuery(itemId);
    const { data: storages } = useGetAllStoragesQuery();

    if (!item || !storages) {
        return null;
    }
    
    const storage = storages.find((storage) => storage.id === item.storageId);
    
    if (!storage) {
        return null;
    }

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">All storages</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <Link to={`/storage/${storage.id}`}>{storage.name}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    {item.name}
                </li>
            </ol>
        </nav>
    );
}
