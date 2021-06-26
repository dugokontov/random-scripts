import React, { CSSProperties } from 'react';

type Props = { imageId: number } & React.ImgHTMLAttributes<HTMLImageElement>;

export function Image({ imageId, alt, ...rest }: Props) {
    const style: CSSProperties = {
        width: '100%',
    };
    return (
        <img
            src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${imageId}`}
            style={style}
            alt={alt}
            {...rest}
        />
    );
}
