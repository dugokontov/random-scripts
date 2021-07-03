import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Storage, UpdateStoragePayload } from '../../app/types';
import { Image } from '../image/Image';

type Props = {
    onEditStorage: (payload: UpdateStoragePayload) => void;
    storage: Storage;
};

export function EditStorage({ onEditStorage, storage }: Props) {
    const [name, setName] = useState(storage.name);
    const [image, setImage] = useState<FileList | null>(null);
    const editStorage: (event: React.FormEvent<HTMLFormElement>) => void = (
        e
    ) => {
        e.preventDefault();
        if (!name.trim()) {
            return alert('name is required');
        }
        let newName: string | undefined = name.trim();
        if (newName === storage.name) {
            newName = undefined;
        }
        onEditStorage({ id: storage.id, name: newName, image });
    };
    const hasChanges = () => name.trim() !== storage.name || image !== null;
    const isValid = () => !!name.trim();
    return (
        <form onSubmit={editStorage}>
            <Image imageId={storage.imageId} />
            <div className="mb-3 mt-3">
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
                    Upload a new image of this storage
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
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!hasChanges() || !isValid()}
                >
                    Update storage
                </button>
                <Link className="btn btn-secondary" to="/">
                    Cancel
                </Link>
            </div>
        </form>
    );
}
