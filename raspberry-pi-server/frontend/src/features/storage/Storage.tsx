import React from 'react';
import { useParams } from 'react-router-dom';
import { UrlParams } from '../../app/types';
import { StorageBreadcrumbs } from './StorageBreadcrumbs';
import { AddSection } from './AddSection';
import { useGetStorageByIdQuery } from '../../app/storagesApi';
import { Loader } from '../loader/Loader';
import { Image } from '../image/Image';

export function Storage() {
    const { storageId } = useParams<UrlParams.Storage>();
    const { data, isLoading, error } = useGetStorageByIdQuery(storageId);
    let content: React.ReactNode;
    if (isLoading) {
        content = (
            <div className="row">
                <Loader />
            </div>
        );
    } else if (error || !data) {
        content = (
            <div className="alert alert-danger" role="alert">
                {error ?? 'Storage with this id not found'}
            </div>
        );
    } else {
        content = (
            <>
                <div className="row">
                    <div className="col">
                        <AddSection storageId={storageId} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Image imageId={data.imageId} />
                    </div>
                </div>
            </>
        );
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <StorageBreadcrumbs storageName={data?.name} />
                </div>
            </div>
            {content}
        </div>
    );
}
