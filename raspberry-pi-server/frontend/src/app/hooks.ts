import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState, AppDispatch } from './store';
import { UrlParams } from './types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useStorageIdParams = () => {
    const { storageId } = useParams<UrlParams.Storage>();
    const id = parseInt(storageId, 10);
    if (Number.isNaN(id)) {
        console.error('Provided id is not a number.');
        return 0;
    }
    return id;
};

export const useSearchQueryParams = () => {
    const { query } = useParams<UrlParams.SearchQuery>();
    return query;
};
