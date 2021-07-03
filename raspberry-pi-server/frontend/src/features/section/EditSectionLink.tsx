import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    storageId: number;
    sectionId: number;
};

export function EditSectionLink({ storageId, sectionId }: Props) {
    return (
        <Link
            className="btn btn-secondary"
            to={`/storage/${storageId}/section/${sectionId}/edit`}
        >
            Edit Selected section
        </Link>
    );
}
