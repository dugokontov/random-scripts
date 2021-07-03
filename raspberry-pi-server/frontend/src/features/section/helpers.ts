import { Position, UndefinedPosition } from '../../app/types';

export const isSamePosition = (
    position1: Position | UndefinedPosition,
    position2: Position
) =>
    position1[0] === position2[0] &&
    position1[1] === position2[1] &&
    position1[2] === position2[2] &&
    position1[3] === position2[3];
