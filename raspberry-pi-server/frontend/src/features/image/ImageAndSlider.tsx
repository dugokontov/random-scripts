import React from 'react';
import { ImageIds } from '../../app/types';
import { Modal } from '../modal/Modal';
import { ImageSlide } from './ImageSlide';
import { Thumbnail } from './Thumbnail';

type Props = {
    imageIds: ImageIds;
    id: string;
};

export function ImageAndSlider({ id, imageIds }: Props) {
    const firstImageId = imageIds[0];

    return (
        <>
            <Thumbnail
                imageId={firstImageId}
                data-bs-toggle="modal"
                data-bs-target={`#${id}`}
            />
            <Modal title="Preview images" id={id}>
                <ImageSlide imageIds={imageIds} id={`is-${id}`} />
            </Modal>
        </>
    );
}
