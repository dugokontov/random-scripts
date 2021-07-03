import React from 'react';
import { Loader } from '../loader/Loader';
import { useAddStorage } from './hooks';
import { NewStorage } from './NewStorage';

export function NewStoragePage() {
    const { addStorageAndRedirect, isLoading, error } = useAddStorage();

    let content: React.ReactNode;
    if (isLoading) {
        content = (
            <div className="row">
                <Loader />
            </div>
        );
    } else if (error) {
        content = (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    } else {
        content = <NewStorage onAddStorage={addStorageAndRedirect} />;
    }
    return <div className="container">{content}</div>;
}
