import React from 'react';
import { Link } from 'react-router-dom';
import { Storage } from '../../app/types';
import { Image } from '../image/Image';

type Props = { storage: Storage };

export function StorageCard({ storage }: Props) {
    return (
        <div className="card">
            <Image imageId={storage.imageId} />
            <div className="card-body">
                <h5 className="card-title">{storage.name}</h5>
                <Link className="btn btn-primary" to={`/storage/${storage.id}`}>
                    Open
                </Link>
            </div>
        </div>
    );
}
