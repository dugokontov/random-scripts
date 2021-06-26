import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from '../icon/Plus';

export function AddStorage() {
    return (
        <Link to={`/storage`} className="btn btn-primary">
            <Plus />
            Add new storage
        </Link>
    );
}
