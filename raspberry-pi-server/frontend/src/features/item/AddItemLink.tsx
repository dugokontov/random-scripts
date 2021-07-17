import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from '../icon/Plus';

type Props = { storageId: number };

export function AddItemLink({ storageId }: Props) {
    return (
        <Link to={`/storage/${storageId}/item`} className="btn btn-primary">
            <Plus />
            Add new item
        </Link>
    );
}
