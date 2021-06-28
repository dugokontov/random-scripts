import React from 'react';
import { ItemSearch } from '../../app/types';
import { ImageAndSlider } from '../image/ImageAndSlider';

type Props = {
    items: ItemSearch[];
};

export function SearchItems({ items }: Props) {
    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th className="col">Name</th>
                    <th className="col">Description</th>
                    <th className="col">Storage</th>
                    <th className="col">Section</th>
                    <th className="col"></th>
                </tr>
            </thead>
            <tbody>
                {items.map(
                    ({
                        id,
                        name,
                        description,
                        imageIds,
                        sectionName,
                        storageName,
                    }) => (
                        <tr key={id}>
                            <td>{name}</td>
                            <td>{description}</td>
                            <td>{storageName}</td>
                            <td>{sectionName}</td>
                            <td>
                                <ImageAndSlider
                                    id={`ias${id}`}
                                    imageIds={imageIds}
                                />
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    );
}
