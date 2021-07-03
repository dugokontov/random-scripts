import React from 'react';
import { Loader } from '../loader/Loader';
import { NewSection } from './NewSection';
import { NewSectionBreadcrumbs } from './NewSectionBreadcrumbs';
import { useStorageIdParams } from '../../app/hooks';
import { useAddSection } from './hooks';

export function NewSectionPage() {
    const storageId = useStorageIdParams();
    const { addSection, data, isLoading, error } = useAddSection();
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
                {error ?? 'Unknown error'}
            </div>
        );
    } else {
        content = (
            <NewSection
                storage={data.storage}
                sections={data.sections}
                onAddSection={addSection}
            />
        );
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <NewSectionBreadcrumbs
                        storageId={storageId}
                        storageName={data?.storage.name}
                    />
                </div>
            </div>
            {content}
        </div>
    );
}
