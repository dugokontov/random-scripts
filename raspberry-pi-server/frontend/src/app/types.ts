export type Storage = {
    id: number;
    name: string;
    imageId: number;
};

export type Position = [number, number, number, number];
export type UndefinedPosition =
    | [undefined, undefined, undefined, undefined]
    | [number, number, undefined, undefined];

export type Section = {
    id: number;
    storageId: number;
    name: string;
    position: Position;
};

export namespace UrlParams {
    export type Storage = {
        storageId: string;
    };
}
