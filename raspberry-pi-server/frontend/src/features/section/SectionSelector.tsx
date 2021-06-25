import React from 'react';
import { Position, UndefinedPosition } from '../../app/types';
import { Image } from '../image/Image';
import { SectionHolder } from './SectionHolder';
import { SectionRect } from './SectionRect';
import { SectionSelectorMessage } from './SectionSelectorMessage';

type Props = {
    storageImageId: number;
    position: Position | UndefinedPosition;
    onChange: (newPosition: Position | UndefinedPosition) => void;
    sectionName: string;
};

export function SectionSelector({
    storageImageId,
    position,
    onChange,
    sectionName,
}: Props) {
    const updateImage = (xPercent: number, yPercent: number) => {
        if (position[0] == null || position[2] != null) {
            // first point or redraw
            return onChange([xPercent, yPercent, undefined, undefined]);
        }
        if (position[2] == null) {
            const [x1, y1] = position;
            return onChange([x1, y1, xPercent, yPercent]);
        }
    };
    return (
        <>
            <div className="row">
                <div className="col">
                    <SectionSelectorMessage position={position} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <SectionHolder>
                        <Image
                            imageId={storageImageId}
                            onClick={(e) => {
                                const rect = (
                                    e.target as HTMLImageElement
                                ).getBoundingClientRect();
                                const x = e.clientX - rect.left; //x position within the element.
                                const y = e.clientY - rect.top; //y position within the element.

                                const xPercent = (x * 100) / rect.width;
                                const yPercent = (y * 100) / rect.height;

                                updateImage(xPercent, yPercent);
                            }}
                        />
                        <SectionRect position={position} name={sectionName} />
                    </SectionHolder>
                </div>
            </div>
        </>
    );
}
