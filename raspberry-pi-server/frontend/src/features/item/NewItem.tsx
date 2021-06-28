import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ItemPayload, Section, Storage } from '../../app/types';
import { SectionViewer } from '../section/SectionViewer';

type Props = {
    storage: Storage;
    sections: Section[];
    onAddItem: (payload: ItemPayload) => void;
};

export function NewItem({ storage, sections, onAddItem }: Props) {
    const [sectionId, setSectionId] = useState(sections[0].id);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<FileList | null>(null);
    const createNewItem: (event: React.FormEvent<HTMLFormElement>) => void = (
        e
    ) => {
        e.preventDefault();
        if (!name) {
            alert('name is required');
        }
        onAddItem({
            name,
            description,
            sectionId,
            images,
        });
    };
    return (
        <form onSubmit={createNewItem}>
            <div className="alert alert-primary" role="alert">
                Click on section to select where this item belongs to
            </div>
            <SectionViewer
                sections={sections}
                storage={storage}
                onSectionClick={setSectionId}
                selectedSectionIds={[sectionId]}
            />
            <div className="mb-3">
                <label htmlFor="item-name" className="form-label">
                    Item name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="item-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="item-description" className="form-label">
                    Item description
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="item-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="item-images" className="form-label">
                    Select images
                </label>
                <input
                    type="file"
                    name="item-images"
                    id="item-images"
                    className="form-control"
                    multiple
                    onChange={(e) => setImages(e.target.files)}
                />
            </div>
            <div className="d-grid gap-2 d-md-flex mb-3">
                <button type="submit" className="btn btn-primary">
                    Add item
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
