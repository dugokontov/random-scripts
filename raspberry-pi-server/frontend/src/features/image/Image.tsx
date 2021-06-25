import React from 'react';

import { BASE_URL } from '../../app/api';

type Props = { imageId: number };

export function Image({ imageId, ...rest }: Props) {
    return <img src={`${BASE_URL}/api/image/${imageId}`} {...rest} alt="" />;
}
