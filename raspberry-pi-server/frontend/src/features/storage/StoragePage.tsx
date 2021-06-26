import React from 'react';
import { StorageBreadcrumbs } from './StorageBreadcrumbs';
import { useGetStorageByIdQuery } from '../../app/storagesApi';
import { Loader } from '../loader/Loader';
import { Storage } from './Storage';
import { useGetSectionsByStorageIdQuery } from '../../app/sectionsApi';
import { useStorageIdParams } from '../../app/hooks';

export function StoragePage() {
    const storageId = useStorageIdParams();
    const {
        data: storage,
        isLoading: isLoadingStorage,
        error: storageError,
    } = useGetStorageByIdQuery(storageId);
    const {
        data: sections,
        isLoading: isSectionsLoading,
        error: sectionsError,
    } = useGetSectionsByStorageIdQuery(storageId);
    let content: React.ReactNode;
    if (isLoadingStorage || isSectionsLoading) {
        content = (
            <div className="row">
                <Loader />
            </div>
        );
    } else if (storageError || sectionsError || !storage || !sections) {
        content = (
            <div className="alert alert-danger" role="alert">
                {storageError ??
                    sectionsError ??
                    'Storage with this id not found'}
            </div>
        );
    } else {
        content = <Storage storage={storage} sections={sections} />;
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <StorageBreadcrumbs storageName={storage?.name} />
                </div>
            </div>
            {content}
        </div>
    );
}
