import React from 'react';
import { StorageBreadcrumbs } from './StorageBreadcrumbs';
import { Loader } from '../loader/Loader';
import { Storage } from './Storage';
import { useGetStorageAndSections } from './hooks';

export function StoragePage() {
    const { data , isLoading, error } = useGetStorageAndSections();
    let content: React.ReactNode;
    if (isLoading) {
        content = (
            <div className="row">
                <Loader />
            </div>
        );
    } else if (error || !data) {
        content = (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    } else {
        content = <Storage storage={data.storage} sections={data.sections} />;
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <StorageBreadcrumbs storageName={data?.storage.name} />
                </div>
            </div>
            {content}
        </div>
    );
}
