import React from 'react';
import { UrlParams } from '../../app/types';
import { useGetStorageByIdQuery } from '../../app/storagesApi';
import { useParams } from 'react-router-dom';
import { Loader } from '../loader/Loader';
import { NewSection } from './NewSection';
import { NewSectionBreadcrumbs } from './NewSectionBreadcrumbs';
import { useAddSectionMutation } from '../../app/sectionsApi';

export function NewSectionPage() {
    const { storageId } = useParams<UrlParams.Storage>();
    const { data, isLoading, error } = useGetStorageByIdQuery(storageId);
    const [
        addSection,
        { isLoading: isAddSectionLoading, error: addSectionError },
    ] = useAddSectionMutation();
    let content: React.ReactNode;
    if (isLoading || isAddSectionLoading) {
        content = (
            <div className="row">
                <Loader />
            </div>
        );
    } else if (error || addSectionError || !data) {
        content = (
            <div className="alert alert-danger" role="alert">
                {error ?? addSectionError ?? 'Storage with this id not found'}
            </div>
        );
    } else {
        content = <NewSection storage={data} onAddSection={addSection} />;
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <NewSectionBreadcrumbs
                        storageId={storageId}
                        storageName={data?.name}
                    />
                </div>
            </div>
            {content}
        </div>
    );
}
