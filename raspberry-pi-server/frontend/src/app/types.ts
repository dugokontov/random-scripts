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

export type ImageIds = number[];

export type Item = {
    id: number;
    sectionId: number;
    name: string;
    description?: string;
    imageIds: ImageIds;
};

export type ItemPayload = {
    sectionId: number;
    name: string;
    description?: string;
    images: FileList | null;
}

export namespace UrlParams {
    export type Storage = {
        storageId: string;
    };
}
