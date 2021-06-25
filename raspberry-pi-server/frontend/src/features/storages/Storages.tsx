import React from 'react';
import { useGetAllStoragesQuery } from '../../app/api';
import { Loader } from '../loader/Loader';
import { StorageCard } from './StorageCard';

export function Storages() {
    const { data, error, isLoading } = useGetAllStoragesQuery('');

    let content: React.ReactNode;
    if (error) {
        content = <div>{error}</div>;
    } else if (isLoading) {
        content = <Loader />;
    } else if (data) {
        content = data.map((storage) => (
            <StorageCard storage={storage} key={storage.id} />
        ));
    } else {
        content = <></>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Storages</h1>
                    {content}
                </div>
            </div>
        </div>
    );
}
