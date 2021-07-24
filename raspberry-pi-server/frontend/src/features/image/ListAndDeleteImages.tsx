import React from 'react';
import { ImageIds } from '../../app/types';
import { Image } from './Image';

type Props = {
    imageIds: ImageIds;
    onDeleteImage: (imageId: number) => void;
    showReset: boolean;
    onReset: () => void;
};

export function ListAndDeleteImages({
    imageIds,
    onDeleteImage,
    showReset,
    onReset,
}: Props) {
    return (
        <div className="row">
            {imageIds.map((imageId) => (
                <div className="col-4" key={imageId}>
                    <div className="card">
                        <Image imageId={imageId} className="card-img-top" />
                        <div className="card-body">
                            <button
                                className="btn btn-danger"
                                onClick={() => onDeleteImage(imageId)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {showReset && (
                <div className="col-4">
                    <button className="btn btn-secondary" onClick={onReset}>
                        Undo delete
                    </button>
                </div>
            )}
        </div>
    );
}
