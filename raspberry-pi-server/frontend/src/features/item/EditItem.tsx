import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ItemUpdate, ItemWithStorageId, Storage } from '../../app/types';
import { ListAndDeleteImages } from '../image/ListAndDeleteImages';
import { SectionLoaderAndViewer } from '../section/SectionLoaderAndViewer';
import { StorageSelect } from '../storage/StorageSelect';

type Props = {
    storages: Storage[];
    item: ItemWithStorageId;
    onEditItem: (itemUpdate: ItemUpdate) => Promise<void>;
};

export function EditItem({ storages, item, onEditItem }: Props) {
    const [storageId, setStorageId] = useState(item.storageId);
    const [sectionId, setSectionId] = useState(item.sectionId);
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [imageIds, setImageIds] = useState(item.imageIds.slice());
    const [images, setImages] = useState<FileList | null>(null);

    const storage = storages.find((storage) => storage.id === storageId);
    if (!storage) {
        return null;
    }

    const updateItem: (event: React.FormEvent<HTMLFormElement>) => void = (
        e
    ) => {
        e.preventDefault();
        if (!name) {
            alert('name is required');
        }
        const deletedImages = item.imageIds.filter(
            (imageId) => !imageIds.includes(imageId)
        );
        onEditItem({
            id: item.id,
            name,
            description,
            storageId,
            sectionId,
            newImages: images,
            deleteImageIds: deletedImages,
        });
    };

    const removeImage = (imageId: number) => {
        setImageIds(imageIds.filter((id) => id !== imageId));
    };
    const resetImageIds = () => setImageIds(item.imageIds.slice());
    return (
        <form onSubmit={updateItem}>
            <div className="mb-3">
                <label htmlFor="storage-select" className="form-label">
                    Storage
                </label>
                <StorageSelect
                    id="storage-select"
                    storages={storages}
                    storageId={storageId}
                    onStorageChange={setStorageId}
                />
            </div>
            <div className="alert alert-primary" role="alert">
                Click on section to select where this item belongs to
            </div>
            <SectionLoaderAndViewer
                storage={storage}
                onSectionClick={setSectionId}
                selectedSectionIds={[sectionId]}
            />
            <div className="mb-3">
                <label htmlFor="item-name" className="form-label">
                    Name
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
                    Description
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
                <ListAndDeleteImages
                    imageIds={imageIds}
                    onDeleteImage={removeImage}
                    showReset={imageIds.length !== item.imageIds.length}
                    onReset={resetImageIds}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="item-images" className="form-label">
                    Add new images
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
                    Update item
                </button>
                <Link
                    className="btn btn-secondary"
                    to={`/storage/${item.storageId}`}
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
