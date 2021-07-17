import React from 'react';
import { Loader } from '../loader/Loader';
import { useUpdateItem } from './hooks';

export function EditItemPage() {
    const { editItem, item, storages, isLoading, error } = useUpdateItem();

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
        content = <div>Edit item page</div>;
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div>Edit item breadcrumbs</div>
                </div>
            </div>
            {content}
        </div>
    );
}
