import { useItemIdParams, useStorageIdParams } from '../../app/hooks';
import { useAddImageMutation } from '../../app/imagesApi';
import {
    useAddItemMutation,
    useGetItemQuery,
    useUpdateItemMutation,
} from '../../app/itemsApi';
import { useGetSectionsByStorageIdQuery } from '../../app/sectionsApi';
import {
    useGetAllStoragesQuery,
    useGetStorageByIdQuery,
} from '../../app/storagesApi';
import {
    ItemPayload,
    ImageIds,
    UpdateItemPayload,
    ItemUpdate,
} from '../../app/types';
import { getErrorMessage } from '../../helpers/errorMessage';

export const useAddItem = () => {
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
    let error: string | undefined = undefined;
    if (
        sectionsError ||
        storageError ||
        imageUploadError ||
        addNewItemError ||
        !storage ||
        !sections
    ) {
        error =
            getErrorMessage(
                sectionsError,
                storageError,
                imageUploadError,
                addNewItemError
            ) ?? 'Storage with this id not found';
    }
    return {
        addItem,
        storage,
        sections,
        isLoading:
            isLoadingSections ||
            isLoadingStorage ||
            isLoadingImageUpload ||
            isLoadingAddNewItem,
        error,
    };
};

export const useUpdateItem = () => {
    const itemId = useItemIdParams();

    const {
        data: item,
        isLoading: isLoadingItem,
        error: itemError,
    } = useGetItemQuery(itemId);
    const {
        data: storages,
        isLoading: isLoadingStorages,
        error: storagesError,
    } = useGetAllStoragesQuery();

    const [
        uploadImage,
        { isLoading: isLoadingImageUpload, error: imageUploadError },
    ] = useAddImageMutation();

    const [
        updateItem,
        { isLoading: isLoadingUpdateItem, error: updateItemError },
    ] = useUpdateItemMutation();

    const editItem = async (itemUpdate: ItemUpdate) => {
        if (!item) {
            return;
        }
        let imageIds: ImageIds = [];
        if (itemUpdate.newImages) {
            const uploadImageResponse = await uploadImage(itemUpdate.newImages);
            if ('error' in uploadImageResponse) {
                return;
            }
            imageIds = uploadImageResponse.data.imageIds;
        }
        const remainingImageIds = item.imageIds.filter(
            (imageId) => !itemUpdate.deleteImageIds.includes(imageId)
        );
        imageIds.push(...remainingImageIds);
        const updatePayload: UpdateItemPayload = {
            id: itemUpdate.id,
            sectionId: itemUpdate.sectionId,
            storageId: itemUpdate.storageId,
            oldStorageId: item.storageId,
            oldSectionId: item.sectionId,
        };
        if (item.name !== itemUpdate.name) {
            updatePayload.name = itemUpdate.name;
        }
        if (item.description !== itemUpdate.description) {
            updatePayload.description = itemUpdate.description;
        }
        if (itemUpdate.newImages || itemUpdate.deleteImageIds.length !== 0) {
            updatePayload.imageIds = imageIds;
        }
        updateItem(updatePayload);
    };

    let error: string | undefined = undefined;
    if (
        itemError ||
        storagesError ||
        imageUploadError ||
        updateItemError ||
        !item ||
        !storages
    ) {
        error =
            getErrorMessage(
                itemError,
                storagesError,
                imageUploadError,
                updateItemError
            ) ?? 'Item with this id not found';
    }

    return {
        editItem,
        item,
        storages,
        isLoading:
            isLoadingItem ||
            isLoadingStorages ||
            isLoadingImageUpload ||
            isLoadingUpdateItem,
        error,
    };
};
