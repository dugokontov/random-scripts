import React from 'react';
import { useSearchQueryParams } from '../../app/hooks';
import { useSearchItemQuery } from '../../app/itemsApi';
import { getErrorMessage } from '../../helpers/errorMessage';
import { Loader } from '../loader/Loader';
import { SearchItems } from './SearchItems';

export function SearchPage() {
    const query = useSearchQueryParams();
    const { data: items, isLoading, error } = useSearchItemQuery(query);
    let content: React.ReactNode;
    if (isLoading) {
        content = (
            <div className="row">
                <Loader />
            </div>
        );
    } else if (error || !items) {
        content = (
            <div className="alert alert-danger" role="alert">
                {getErrorMessage(error) ?? 'Items not found'}
            </div>
        );
    } else {
        content = <SearchItems items={items} />;
    }
    return <div className="container">{content}</div>;
}
