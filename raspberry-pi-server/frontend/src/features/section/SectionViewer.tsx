import React from 'react';
import { Section, Storage } from '../../app/types';
import { Image } from '../image/Image';
import { SectionHolder } from './SectionHolder';
import { SectionRect } from './SectionRect';

type Props = {
    storage: Storage;
    sections: Section[];
    onSectionClick?: (sectionId: number) => void;
    selectedSectionIds?: number[];
};

export function SectionViewer({
    storage,
    sections,
    onSectionClick,
    selectedSectionIds = [],
}: Props) {
    return (
        <SectionHolder>
            <Image imageId={storage.imageId} />
            {sections.map(({ position, name, id }) => (
                <SectionRect
                    position={position}
                    name={name}
                    id={id}
                    key={id}
                    active={selectedSectionIds.includes(id)}
                    onClick={onSectionClick}
                />
            ))}
        </SectionHolder>
    );
}
