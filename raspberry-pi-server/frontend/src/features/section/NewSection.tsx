import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Position, Section, Storage, UndefinedPosition } from '../../app/types';
import { SectionSelector } from './SectionSelector';

type Props = {
    storage: Storage;
    sections: Section[];
    onAddSection: (arg: Partial<Section>) => void;
};

export function NewSection({ storage, sections, onAddSection }: Props) {
    const [position, setPosition] = useState<UndefinedPosition | Position>([
        undefined,
        undefined,
        undefined,
        undefined,
    ]);
    const [name, setName] = useState<string>('');
    const createNewSection: (event: React.FormEvent<HTMLFormElement>) => void =
        (e) => {
            e.preventDefault();
            if (position[2] == null) {
                alert('Position not selected');
                return;
            }
            onAddSection({
                name,
                position,
                storageId: storage.id,
            });
        };
    return (
        <form onSubmit={createNewSection}>
            <SectionSelector
                position={position}
                onChange={setPosition}
                storageImageId={storage.imageId}
                sectionName={name}
                otherSections={sections}
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
                <button type="submit" className="btn btn-primary">
                    Create section
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
