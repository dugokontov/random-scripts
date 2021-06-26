import React from 'react';
import { ImageIds } from '../../app/types';
import { Image } from './Image';

type Props = {
    imageIds: ImageIds;
    id: string;
};

export function ImageSlide({ imageIds, id }: Props) {
    return (
        <div id={id} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {imageIds.map((imageId, index) => (
                    <button
                        key={imageId}
                        type="button"
                        data-bs-target={`#${id}`}
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                    ></button>
                ))}
            </div>
            <div className="carousel-inner">
                {imageIds.map((imageId, index) => (
                    <div
                        key={imageId}
                        className={`carousel-item ${
                            index === 0 ? 'active' : ''
                        }`}
                    >
                        <Image imageId={imageId} className="d-block w-100" />
                    </div>
                ))}
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#${id}`}
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#${id}`}
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}
