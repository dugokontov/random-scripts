import React from 'react';
import { useDeleteItemMutation } from '../../app/itemsApi';
import { Loader } from '../loader/Loader';

type Props = {
    itemId: number;
    sectionId: number;
    storageId: number;
};

export function DeleteItems({ itemId, sectionId, storageId }: Props) {
    const [deleteItem, { isLoading }] = useDeleteItemMutation();
    const confirmAndDeleteItem = async () => {
        // eslint-disable-next-line no-restricted-globals
        const isUserSure = confirm(
            'Are you sure you want to delete this item.'
        );
        if (isUserSure) {
            const response = await deleteItem({ storageId, sectionId, itemId });
            if ('error' in response) {
                console.error(response.error);
                alert('Error while deleting. Please reload page and try again');
            }
        }
    };

    let content: React.ReactNode;
    if (isLoading) {
        content = <Loader />;
    } else {
        content = 'Delete';
    }

    return (
        <button
            type="button"
            className="btn btn-danger"
            disabled={isLoading}
            onClick={confirmAndDeleteItem}
        >
            {content}
        </button>
    );
}
