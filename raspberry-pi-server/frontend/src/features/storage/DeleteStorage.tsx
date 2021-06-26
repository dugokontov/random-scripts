import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGetSectionsByStorageIdQuery } from '../../app/sectionsApi';
import { useDeleteStorageMutation } from '../../app/storagesApi';
import { Loader } from '../loader/Loader';

type Props = {
    storageId: number;
};

export function DeleteStorage({ storageId }: Props) {
    const { data: sections } = useGetSectionsByStorageIdQuery(storageId);
    const history = useHistory();

    const [deleteStorage, { isLoading }] = useDeleteStorageMutation();

    const confirmAndDeleteStorage = async () => {
        // eslint-disable-next-line no-restricted-globals
        const isUserSure = confirm(
            'Are you sure you want to delete this storage.'
        );
        if (isUserSure) {
            const response = await deleteStorage(storageId);
            if ('error' in response) {
                console.error(response.error);
                alert('Error while deleting. Please reload page and try again');
                return;
            }
            history.push('/');
        }
    };

    if (!sections || sections.length > 0) {
        return null;
    }

    let content: React.ReactNode;
    if (isLoading) {
        content = <Loader />;
    } else {
        content = 'Delete this storage';
    }

    return (
        <button
            type="button"
            className="btn btn-danger"
            disabled={isLoading}
            onClick={confirmAndDeleteStorage}
        >
            {content}
        </button>
    );
}
