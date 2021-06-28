import React, { CSSProperties } from 'react';

type Props = { imageId: number } & React.ImgHTMLAttributes<HTMLImageElement>;

export function Thumbnail({ imageId, alt, ...rest }: Props) {
    const style: CSSProperties = {
        width: '100%',
    };
    return (
        <img
            src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${imageId}/thumbnail`}
            style={style}
            alt={alt}
            {...rest}
        />
    );
}
