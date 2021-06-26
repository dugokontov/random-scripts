import React, { useState } from 'react';
import { Section, Storage as StorageType } from '../../app/types';
import { AddSection } from './AddSection';
import { SectionViewer } from '../section/SectionViewer';
import { ItemsLoader } from '../items/ItemsLoader';
import { AddItem } from '../item/AddItem';

type Props = {
    storage: StorageType;
    sections: Section[];
};

export function Storage({ storage, sections }: Props) {
    const [selectedSectionId, setSelectedSectionId] = useState<
        number | undefined
    >();
    const selectSelectionId = (sectionId: number) => {
        if (sectionId === selectedSectionId) {
            setSelectedSectionId(undefined);
        } else {
            setSelectedSectionId(sectionId);
        }
    };
    return (
        <>
            <div className="row mb-2">
                <div className="col">
                    <h1>{storage.name}</h1>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <AddSection storageId={storage.id} />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <SectionViewer
                        sections={sections}
                        storage={storage}
                        onSectionClick={selectSelectionId}
                        selectedSectionIds={
                            selectedSectionId ? [selectedSectionId] : []
                        }
                    />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <h2>Items</h2>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <AddItem storageId={storage.id} />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <ItemsLoader
                        sectionId={selectedSectionId}
                        storageId={storage.id}
                    />
                </div>
            </div>
        </>
    );
}
