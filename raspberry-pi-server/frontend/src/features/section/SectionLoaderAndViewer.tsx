import React from 'react';
import { useGetSectionsByStorageIdQuery } from '../../app/sectionsApi';
import { Storage } from '../../app/types';
import { Loader } from '../loader/Loader';
import { NoSections } from './NoSections';
import { SectionViewer } from './SectionViewer';

type Props = {
    storage: Storage;
    onSectionClick?: (sectionId: number) => void;
    selectedSectionIds?: number[];
};

export function SectionLoaderAndViewer({
    storage,
    onSectionClick,
    selectedSectionIds,
}: Props) {
    const { data: sections } = useGetSectionsByStorageIdQuery(storage.id);
    if (!sections) {
        return <Loader />;
    }
    if (sections.length === 0) {
        return <NoSections storage={storage} />;
    }
    return (
        <SectionViewer
            sections={sections}
            storage={storage}
            onSectionClick={onSectionClick}
            selectedSectionIds={selectedSectionIds}
        />
    );
}
