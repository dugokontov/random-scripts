export type Storage = {
    id: number;
    name: string;
    imageId: number;
};

export type Section = {
    id: number;
    storageId: number;
    name: string;
    position: [number, number, number, number];
};
