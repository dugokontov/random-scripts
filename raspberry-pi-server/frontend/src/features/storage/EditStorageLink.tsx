import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    storageId: number;
};

export function EditStorageLink({ storageId }: Props) {
    return (
        <Link className="btn btn-secondary" to={`/storage/${storageId}/edit`}>
            Edit
        </Link>
    );
}
