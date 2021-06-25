import React, { CSSProperties } from 'react';

import { BASE_URL } from '../../app/storagesApi';

type Props = { imageId: number } & React.ImgHTMLAttributes<HTMLImageElement>;

export function Image({ imageId, alt, ...rest }: Props) {
    const style: CSSProperties = {
        width: '100%',
    };
    return (
        <img
            src={`${BASE_URL}/api/image/${imageId}`}
            style={style}
            alt={alt}
            {...rest}
        />
    );
}
