import React, { CSSProperties } from 'react';
import { Position, UndefinedPosition } from '../../app/types';
import styles from './SectionRect.module.css';

type Props = {
    position: Position | UndefinedPosition;
    name: string;
};

export function SectionRect({ position, name }: Props) {
    if (position[0] == null) {
        return null;
    }

    const left = Math.min(position[0], position[2] ?? Infinity);
    const top = Math.min(position[1], position[3] ?? Infinity);
    const width = Math.max(position[0], position[2] ?? -Infinity) - left;
    const height = Math.max(position[1], position[3] ?? -Infinity) - top;
    const style: CSSProperties = {
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}%`,
        height: `${height}%`,
    };
    let displayName = name;
    if (width < 2) {
        displayName = '';
    }
    return (
        <div style={style} className={styles.rect}>
            {displayName}
        </div>
    );
}
