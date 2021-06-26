import React, { CSSProperties } from 'react';
import { Position, UndefinedPosition } from '../../app/types';
import styles from './SectionRect.module.css';

type Props = {
    position: Position | UndefinedPosition;
    name: string;
    id?: number;
    onClick?: (sectionId: number) => void;
    active?: boolean;
};

export function SectionRect({ position, name, id, onClick, active }: Props) {
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
    let className = styles.rect;
    if (active) {
        className += ' ' + styles.active;
    }
    return (
        <div
            style={style}
            className={className}
            onClick={() => {
                if (id && onClick) {
                    onClick(id);
                }
            }}
        >
            {displayName}
        </div>
    );
}
