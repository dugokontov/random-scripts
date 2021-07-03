import { useHistory } from 'react-router-dom';
import { useStorageIdParams } from '../../app/hooks';
import { useAddImageMutation } from '../../app/imagesApi';
import { useGetSectionsByStorageIdQuery } from '../../app/sectionsApi';
import {
    useAddStorageMutation,
    useGetStorageByIdQuery,
    useUpdateStorageMutation,
} from '../../app/storagesApi';
import { StoragePayload, UpdateStoragePayload } from '../../app/types';
import { getErrorMessage } from '../../helpers/errorMessage';

export const useGetStorageAndSections = () => {
    const storageId = useStorageIdParams();

    const {
        data: storage,
        isLoading: isLoadingStorage,
        error: storageError,
        isFetching: isFetchingStorage,
    } = useGetStorageByIdQuery(storageId);
    const {
        data: sections,
        isLoading: isLoadingSections,
        error: sectionsError,
        isFetching: isFetchingSections,
    } = useGetSectionsByStorageIdQuery(storageId);

    if (
        isLoadingStorage ||
        isLoadingSections ||
        isFetchingStorage ||
        isFetchingSections
    ) {
        return { data: undefined, isLoading: true, error: undefined };
    }
    const withError = (error: string) => ({
        data: undefined,
        isLoading: false,
        error,
    });
    if (storageError || sectionsError) {
        return withError(
            getErrorMessage(storageError, sectionsError) ?? 'Unknown error'
        );
    }
    if (!storage) {
        return withError(`Storage with id ${storageId} doesn't exist`);
    }
    if (!sections) {
        return withError("Sections can't be loaded");
    }

    return {
        data: { storage, sections },
        isLoading: false,
        error: undefined,
    };
};

export const useAddStorage = () => {
    const history = useHistory();
    const [
        uploadImage,
        { isLoading: isLoadingImageUpload, error: imageUploadError },
    ] = useAddImageMutation();

    const [
        addNewStorage,
        { isLoading: isLoadingAddStorage, error: addStorageError },
    ] = useAddStorageMutation();

    const addStorageAndRedirect = async (storage: StoragePayload) => {
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

    return {
        addStorageAndRedirect,
        isLoading: isLoadingImageUpload || isLoadingAddStorage,
        error: getErrorMessage(imageUploadError, addStorageError),
    };
};

export const useEditStorage = () => {
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

    const editStorageAndRedirect = async (storage: UpdateStoragePayload) => {
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

    const isLoading =
        isLoadingStorage || isLoadingImageUpload || isLoadingUpdate;

    let error: string | undefined = getErrorMessage(
        imageUploadError,
        storageError,
        updateStorageError
    );

    if (!isLoadingStorage && !error && !storage) {
        error = `Storage with id ${storageId} couldn't be loaded`;
    }

    return {
        data: storage,
        editStorageAndRedirect,
        isLoading,
        error,
    };
};
