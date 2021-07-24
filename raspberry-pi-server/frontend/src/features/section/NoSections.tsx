import React from 'react';
import { Storage } from '../../app/types';
import { AddSection } from './AddSection';

type Props = {
    storage: Storage;
};

export function NoSections({ storage }: Props) {
    return (
        <>
            <div className="alert alert-danger" role="alert">
                You first need to add some sections to this storage
            </div>
            <AddSection storageId={storage.id} />
        </>
    );
}
