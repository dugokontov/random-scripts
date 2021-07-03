import React from 'react';
import { Loader } from '../loader/Loader';
import { useStorageIdParams } from '../../app/hooks';
import { useUpdateSection } from './hooks';
import { EditSectionBreadcrumbs } from './EditSectionBreadcrumbs';
import { EditSection } from './EditSection';
import { useHistory } from 'react-router-dom';

export function EditSectionPage() {
    const storageId = useStorageIdParams();
    const { editSection, data, isLoading, error } = useUpdateSection();
    
    const history = useHistory();
    const redirectToOtherSection = (sectionId: number) => {
        history.push(`/storage/${storageId}/section/${sectionId}/edit`);
    };

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
            <EditSection
                key={data.section.id}
                storage={data.storage}
                sections={data.sections}
                section={data.section}
                onEditSection={editSection}
                onOtherSectionClick={redirectToOtherSection}
            />
        );
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <EditSectionBreadcrumbs
                        storageId={storageId}
                        storageName={data?.storage.name}
                        sectionName={data?.section.name}
                    />
                </div>
            </div>
            {content}
        </div>
    );
}
