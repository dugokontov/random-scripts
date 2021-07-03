import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStorageIdParams } from '../../app/hooks';
import { useAddImageMutation } from '../../app/imagesApi';
import {
    useGetStorageByIdQuery,
    useUpdateStorageMutation,
} from '../../app/storagesApi';
import { UpdateStoragePayload } from '../../app/types';
import { getErrorMessage } from '../../helpers/errorMessage';
import { Loader } from '../loader/Loader';
import { EditStorage } from './EditStorage';

export function EditStoragePage() {
    const history = useHistory();
    const storageId = useStorageIdParams();
    const {
        data: storage,
        isLoading: isLoadingStorage,
        error: storageError,
    } = useGetStorageByIdQuery(storageId);

    const [
        uploadImage,
        { isLoading: isLoadingImageUpload, error: imageUploadError },
    ] = useAddImageMutation();

    const [
        updateStorage,
        { isLoading: isLoadingUpdate, error: updateStorageError },
    ] = useUpdateStorageMutation();

    const editStorage = async (storage: UpdateStoragePayload) => {
        let imageId: number | undefined = undefined;
        if (storage.image) {
            const uploadImageResponse = await uploadImage(storage.image);

            if ('error' in uploadImageResponse) {
                return;
            }
            imageId = uploadImageResponse.data.imageIds[0];
        }
        const updateStorageResponse = await updateStorage({
            id: storage.id,
            imageId,
            name: storage.name,
        });
        if ('error' in updateStorageResponse) {
            return;
        }
        history.push(`/storage/${updateStorageResponse.data.id}`);
    };

    let content: React.ReactNode;
    if (isLoadingStorage || isLoadingImageUpload || isLoadingUpdate) {
        content = (
            <div className="row">
                <Loader />
            </div>
        );
    } else if (
        imageUploadError ||
        storageError ||
        updateStorageError ||
        !storage
    ) {
        content = (
            <div className="alert alert-danger" role="alert">
                {getErrorMessage(
                    imageUploadError,
                    storageError,
                    updateStorageError
                ) ?? 'Storage with this id not found'}
            </div>
        );
    } else {
        content = <EditStorage onEditStorage={editStorage} storage={storage} />;
    }
    return <div className="container">{content}</div>;
}
