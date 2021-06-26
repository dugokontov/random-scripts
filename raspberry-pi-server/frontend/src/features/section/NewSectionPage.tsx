import React from 'react';
import { useGetStorageByIdQuery } from '../../app/storagesApi';
import { Loader } from '../loader/Loader';
import { NewSection } from './NewSection';
import { NewSectionBreadcrumbs } from './NewSectionBreadcrumbs';
import {
    useAddSectionMutation,
    useGetSectionsByStorageIdQuery,
} from '../../app/sectionsApi';
import { useStorageIdParams } from '../../app/hooks';
import { getErrorMessage } from '../../helpers/errorMessage';

export function NewSectionPage() {
    const storageId = useStorageIdParams();
    const {
        data: storage,
        isLoading: isLoadingStorage,
        error: storageError,
    } = useGetStorageByIdQuery(storageId);
    const {
        data: sections,
        isLoading: isLoadingSections,
        error: sectionsError,
    } = useGetSectionsByStorageIdQuery(storageId);
    const [
        addSection,
        { isLoading: isAddSectionLoading, error: addSectionError },
    ] = useAddSectionMutation();
    let content: React.ReactNode;
    if (isLoadingStorage || isAddSectionLoading || isLoadingSections) {
        content = (
            <div className="row">
                <Loader />
            </div>
        );
    } else if (
        storageError ||
        sectionsError ||
        addSectionError ||
        !storage ||
        !sections
    ) {
        content = (
            <div className="alert alert-danger" role="alert">
                {getErrorMessage(
                    storageError,
                    addSectionError,
                    sectionsError
                ) ?? 'Storage with this id not found'}
            </div>
        );
    } else {
        content = (
            <NewSection
                storage={storage}
                sections={sections}
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
                        storageName={storage?.name}
                    />
                </div>
            </div>
            {content}
        </div>
    );
}
