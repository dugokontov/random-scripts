import React from 'react';
import { Position, UndefinedPosition } from '../../app/types';

type Props = {
    position: Position | UndefinedPosition;
};

export function SectionSelectorMessage({
    position,
}: Props) {
    if (position[0] == null) {
        return (
            <div className="alert alert-primary" role="alert">
                Click on image to start creating a new section
            </div>
        );
    } else if (position[2] == null) {
        return (
            <div className="alert alert-primary" role="alert">
                Click again to creating a new section
            </div>
        );
    }
    return (
        <div className="alert alert-primary" role="alert">
            Click again to redraw section
        </div>
    );
}
