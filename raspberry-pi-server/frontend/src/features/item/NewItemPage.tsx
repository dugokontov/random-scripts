import React from 'react';
import { useStorageIdParams } from '../../app/hooks';
import { useAddImageMutation } from '../../app/imagesApi';
import { useAddItemMutation } from '../../app/itemsApi';
import { useGetSectionsByStorageIdQuery } from '../../app/sectionsApi';
import { useGetStorageByIdQuery } from '../../app/storagesApi';
import { ImageIds, ItemPayload } from '../../app/types';
import { Loader } from '../loader/Loader';
import { AddSection } from '../storage/AddSection';
import { NewItem } from './NewItem';
import { NewItemBreadcrumbs } from './NewItemBreadcrumbs';

export function NewItemPage() {
    const storageId = useStorageIdParams();

    const {
        data: storage,
        isLoading: isLoadingStorage,
        error: storageError,
    } = useGetStorageByIdQuery(storageId);
    const {
        data: sections,
        isLoading: isLoadingSections,
        error: sectionsError,
    } = useGetSectionsByStorageIdQuery(storageId);

    const [
        uploadImage,
        { isLoading: isLoadingImageUpload, error: imageUploadError },
    ] = useAddImageMutation();

    const [
        addNewItem,
        { isLoading: isLoadingAddNewItem, error: addNewItemError },
    ] = useAddItemMutation();

    const addItem = async (item: ItemPayload) => {
        let imageIds: ImageIds = [];
        if (item.images) {
            const uploadImageResponse = await uploadImage(item.images);
            if ('error' in uploadImageResponse) {
                return;
            }
            imageIds = uploadImageResponse.data.imageIds;
        }
        addNewItem({
            storageId,
            sectionId: item.sectionId,
            name: item.name,
            description: item.description,
            imageIds,
        });
    };

    let content: React.ReactNode;
    if (
        isLoadingSections ||
        isLoadingStorage ||
        isLoadingImageUpload ||
        isLoadingAddNewItem
    ) {
        content = (
            <div className="row">
                <Loader />
            </div>
        );
    } else if (
        sectionsError ||
        storageError ||
        imageUploadError ||
        addNewItemError ||
        !storage ||
        !sections
    ) {
        content = (
            <div className="alert alert-danger" role="alert">
                {sectionsError ??
                    storageError ??
                    imageUploadError ??
                    addNewItemError ??
                    'Storage with this id not found'}
            </div>
        );
    } else if (sections.length === 0) {
        content = (
            <>
                <div className="alert alert-danger" role="alert">
                    You first need to add some sections to this storage
                </div>
                <AddSection storageId={storageId} />
            </>
        );
    } else {
        content = (
            <NewItem
                storage={storage}
                sections={sections}
                onAddItem={addItem}
            />
        );
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <NewItemBreadcrumbs
                        storageId={storageId}
                        storageName={storage?.name ?? storageId.toString()}
                    />
                </div>
            </div>
            {content}
        </div>
    );
}
