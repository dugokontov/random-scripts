export type Storage = {
    id: number;
    name: string;
    imageId: number;
};

export type StoragePayload = {
    name: string;
    image: FileList;
};

export type UpdateStoragePayload = {
    id: number;
    name?: string;
    image: FileList | null;
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

export type UpdateSectionPayload = {
    id: number;
    storageId: number;
    name?: string;
    position?: Position;
}

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
};

export type ItemSearch = {
    id: number;
    sectionId: number;
    name: string;
    description: string;
    imageIds: number[];
    sectionName: string;
    storageId: number;
    storageName: string;
    imageId: number;
};

export namespace UrlParams {
    export type Storage = {
        storageId: string;
    };
    export type SearchQuery = {
        query: string;
    };
    export type Section = {
        sectionId: string;
    };
}
