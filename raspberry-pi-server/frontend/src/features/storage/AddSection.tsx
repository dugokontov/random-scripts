import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from '../icon/Plus';

type Props = { storageId: string };

export function AddSection({ storageId }: Props) {
    return (
        <Link to={`/storage/${storageId}/section`} className="btn btn-primary">
            <Plus />
            Add new section
        </Link>
    );
}
