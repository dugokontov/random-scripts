import React from 'react';
import { Loader } from '../loader/Loader';
import { EditStorage } from './EditStorage';
import { useEditStorage } from './hooks';

export function EditStoragePage() {
    const {
        data: storage,
        editStorageAndRedirect,
        isLoading,
        error,
    } = useEditStorage();

    let content: React.ReactNode;
    if (isLoading) {
        content = (
            <div className="row">
                <Loader />
            </div>
        );
    } else if (error || !storage) {
        content = (
            <div className="alert alert-danger" role="alert">
                {error ?? 'UnknownError'}
            </div>
        );
    } else {
        content = (
            <EditStorage
                onEditStorage={editStorageAndRedirect}
                storage={storage}
            />
        );
    }
    return <div className="container">{content}</div>;
}
