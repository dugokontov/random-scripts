import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Position,
    Section,
    Storage,
    UndefinedPosition,
    UpdateSectionPayload,
} from '../../app/types';
import { isSamePosition } from './helpers';
import { SectionSelector } from './SectionSelector';

type Props = {
    storage: Storage;
    sections: Section[];
    section: Section;
    onEditSection: (arg: UpdateSectionPayload) => void;
    onOtherSectionClick: (sectionId: number) => void;
};

export function EditSection({
    storage,
    section,
    sections,
    onEditSection,
    onOtherSectionClick,
}: Props) {
    const [position, setPosition] = useState<UndefinedPosition | Position>(
        section.position
    );
    const [name, setName] = useState<string>(section.name);
    const editSection: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
        e.preventDefault();
        if (position[2] == null) {
            return alert('Position not selected');
        }
        let newName: string | undefined = name.trim();
        if (newName === section.name) {
            newName = undefined;
        }
        let newPosition: Position | undefined = position;
        if (isSamePosition(newPosition, section.position)) {
            newPosition = undefined;
        }
        onEditSection({
            id: section.id,
            name: newName,
            position: newPosition,
            storageId: storage.id,
        });
    };
    const checkForChangesAndRedirect = (sectionId: number) => {
        if (hasChanges()) {
            // eslint-disable-next-line no-restricted-globals
            const shouldRedirect = confirm(
                'There are unsaved changes. Are you sure you want to leave this page? All changes will be discarded.'
            );
            if (!shouldRedirect) {
                return;
            }
        }
        onOtherSectionClick(sectionId);
    };
    const hasChanges = () =>
        name.trim() !== section.name ||
        !isSamePosition(position, section.position);
    const isValid = () => !!name.trim() && position[2] != null;
    return (
        <form onSubmit={editSection}>
            <SectionSelector
                position={position}
                onChange={setPosition}
                storageImageId={storage.imageId}
                sectionName={name}
                otherSections={sections}
                onOtherSectionClick={checkForChangesAndRedirect}
            />
            <div className="mb-3">
                <label htmlFor="section-name" className="form-label">
                    Section name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="section-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="d-grid gap-2 d-md-flex">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid() || !hasChanges()}
                >
                    Update section
                </button>
                <Link
                    className="btn btn-secondary"
                    to={`/storage/${storage.id}`}
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
