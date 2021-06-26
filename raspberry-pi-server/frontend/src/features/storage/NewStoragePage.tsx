import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAddImageMutation } from '../../app/imagesApi';
import { useAddStorageMutation } from '../../app/storagesApi';
import { StoragePayload } from '../../app/types';
import { getErrorMessage } from '../../helpers/errorMessage';
import { Loader } from '../loader/Loader';
import { NewStorage } from './NewStorage';

export function NewStoragePage() {
    const history = useHistory();
    const [
        uploadImage,
        { isLoading: isLoadingImageUpload, error: imageUploadError },
    ] = useAddImageMutation();

    const [
        addNewStorage,
        { isLoading: isLoadingAddStorage, error: addStorageError },
    ] = useAddStorageMutation();

    const addStorage = async (storage: StoragePayload) => {
        let imageId: number;
        const uploadImageResponse = await uploadImage(storage.image);
        if ('error' in uploadImageResponse) {
            return;
        }
        imageId = uploadImageResponse.data.imageIds[0];
        const addStorageResponse = await addNewStorage({
            imageId,
            name: storage.name,
        });
        if ('error' in addStorageResponse) {
            return;
        }
        history.push(`/storage/${addStorageResponse.data.id}`);
    };

    let content: React.ReactNode;
    if (isLoadingImageUpload || isLoadingAddStorage) {
        content = (
            <div className="row">
                <Loader />
            </div>
        );
    } else if (imageUploadError || addStorageError) {
        content = (
            <div className="alert alert-danger" role="alert">
                {getErrorMessage(imageUploadError, addStorageError)}
            </div>
        );
    } else {
        content = <NewStorage onAddStorage={addStorage} />;
    }
    return <div className="container">{content}</div>;
}
