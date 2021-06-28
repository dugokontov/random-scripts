import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StoragePayload } from '../../app/types';

type Props = {
    onAddStorage: (payload: StoragePayload) => void;
};

export function NewStorage({ onAddStorage }: Props) {
    const [name, setName] = useState('');
    const [image, setImage] = useState<FileList | null>(null);
    const createNewStorage: (event: React.FormEvent<HTMLFormElement>) => void =
        (e) => {
            e.preventDefault();
            if (!name) {
                return alert('name is required');
            }
            if (!image) {
                return alert('Please upload image of this storage');
            }
            onAddStorage({ name, image });
        };
    return (
        <form onSubmit={createNewStorage}>
            <div className="mb-3">
                <label htmlFor="storage-name" className="form-label">
                    Storage name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="storage-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="storage-images" className="form-label">
                    Select images
                </label>
                <input
                    type="file"
                    name="storage-images"
                    id="storage-images"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files)}
                />
            </div>
            <div className="d-grid gap-2 d-md-flex mb-3">
                <button type="submit" className="btn btn-primary">
                    Add storage
                </button>
                <Link className="btn btn-secondary" to="/">
                    Cancel
                </Link>
            </div>
        </form>
    );
}
