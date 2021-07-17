import React from 'react';
import { Link } from 'react-router-dom';

type Props = { itemId: number };

export function EditItemLink({ itemId }: Props) {
    return (
        <Link to={`/item/${itemId}`} className="btn btn-primary">
            Edit
        </Link>
    );
}
