import React from 'react';
import { useGetItemsByStorageIdSectionIdQuery } from '../../app/itemsApi';
import { useGetSectionsByStorageIdQuery } from '../../app/sectionsApi';
import { getErrorMessage } from '../../helpers/errorMessage';
import { Loader } from '../loader/Loader';
import { Items } from './Items';

type Props = {
    storageId: number;
    sectionId?: number;
};
export function ItemsLoader({ storageId, sectionId }: Props) {
    const {
        data: items,
        isLoading,
        error,
    } = useGetItemsByStorageIdSectionIdQuery(`${storageId}.${sectionId}`);

    const {
        data: sections,
        isLoading: isLoadingSections,
        error: sectionsError,
    } = useGetSectionsByStorageIdQuery(storageId);

    if (isLoading || isLoadingSections) {
        return (
            <div className="row">
                <Loader />
            </div>
        );
    } else if (error || sectionsError || !items || !sections) {
        return (
            <div className="alert alert-danger" role="alert">
                {getErrorMessage(error, sectionsError) ??
                    'Items with this id not found'}
            </div>
        );
    }
    return <Items items={items} sections={sections} />;
}
