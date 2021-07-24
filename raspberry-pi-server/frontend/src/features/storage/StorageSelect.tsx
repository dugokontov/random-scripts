import React from 'react';
import { Storage } from '../../app/types';

type Props = {
    storages: Storage[];
    storageId: number;
    onStorageChange: (storageId: number) => void;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function StorageSelect({
    storages,
    storageId,
    onStorageChange,
    ...rest
}: Props) {
    return (
        <select
            className="form-select"
            onChange={(e) => onStorageChange(+e.target.value)}
            value={storageId}
            {...rest}
        >
            {storages.map((storage) => (
                <option value={storage.id} key={storage.id}>
                    {storage.name}
                </option>
            ))}
        </select>
    );
}
