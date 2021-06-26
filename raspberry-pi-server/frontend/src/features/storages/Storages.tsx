import React from 'react';
import { useGetAllStoragesQuery } from '../../app/storagesApi';
import { getErrorMessage } from '../../helpers/errorMessage';
import { Loader } from '../loader/Loader';
import { AddStorage } from '../storage/AddStorage';
import { StorageCard } from './StorageCard';

export function Storages() {
    const { data: storages, error, isLoading } = useGetAllStoragesQuery();

    let content: React.ReactNode;
    if (isLoading) {
        content = <Loader />;
    } else if (error || !storages) {
        content = (
            <div>
                {getErrorMessage(error) ??
                    'Server not available. Please try again later'}
            </div>
        );
    } else {
        content = storages.map((storage) => (
            <StorageCard storage={storage} key={storage.id} />
        ));
    }

    return (
        <div className="container">
            <div className="row mb-2">
                <div className="col">
                    <h1>Storages</h1>
                    <AddStorage />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">{content}</div>
            </div>
        </div>
    );
}
