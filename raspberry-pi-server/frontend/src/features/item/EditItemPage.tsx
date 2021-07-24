import React from 'react';
import { Loader } from '../loader/Loader';
import { EditItem } from './EditItem';
import { EditItemBreadcrumbs } from './EditItemBreadcrumbs';
import { useUpdateItem } from './hooks';

export function EditItemPage() {
    const { editItemAndRedirect, item, storages, isLoading, error } =
        useUpdateItem();

    let content: React.ReactNode;
    if (isLoading) {
        content = (
            <div className="row">
                <Loader />
            </div>
        );
    } else if (error || !item || !storages) {
        content = (
            <div className="alert alert-danger" role="alert">
                {error ?? 'Unknown error happen'}
            </div>
        );
    } else {
        content = (
            <EditItem
                item={item}
                storages={storages}
                onEditItem={editItemAndRedirect}
            />
        );
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div>
                        <EditItemBreadcrumbs />
                    </div>
                </div>
            </div>
            {content}
        </div>
    );
}
