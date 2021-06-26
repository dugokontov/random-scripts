import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export function getErrorMessage(
    ...errors: (FetchBaseQueryError | SerializedError | undefined)[]
) {
    for (let i = 0; i < errors.length; i++) {
        const error = errors[i];
        if (!error) {
            continue;
        }
        if ('status' in error) {
            if (error.status === 404) {
                return 'Requested resource is not found';
            }
            return 'Server error. Please try again later';
        }
        return error.message;
    }
    return undefined;
}
