import React from 'react';
import { useGetItemsByStorageIdSectionIdQuery } from '../../app/itemsApi';
import { useDeleteSectionMutation } from '../../app/sectionsApi';
import { Loader } from '../loader/Loader';

type Props = {
    sectionId: number;
    storageId: number;
};
export function DeleteSection({ sectionId, storageId }: Props) {
    const { data: items } = useGetItemsByStorageIdSectionIdQuery(
        `${storageId}.${sectionId}`
    );
    const [deleteSection, { isLoading }] = useDeleteSectionMutation();

    const confirmAndDeleteSection = async () => {
        // eslint-disable-next-line no-restricted-globals
        const isUserSure = confirm(
            'Are you sure you want to delete this section.'
        );
        if (isUserSure) {
            const response = await deleteSection({ storageId, sectionId });
            if ('error' in response) {
                console.error(response.error);
                alert('Error while deleting. Please reload page and try again');
            }
        }
    };

    if (!items || items.length > 0) {
        return null;
    }

    let content: React.ReactNode;
    if (isLoading) {
        content = <Loader />;
    } else {
        content = 'Delete selected section';
    }

    return (
        <button
            type="button"
            className="btn btn-danger"
            disabled={isLoading}
            onClick={confirmAndDeleteSection}
        >
            {content}
        </button>
    );
}
