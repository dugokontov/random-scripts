import React from 'react';
import { Item, Section } from '../../app/types';
import { Image } from '../image/Image';

type Props = {
    items: Item[];
    sections: Section[];
};

export function Items({ items, sections }: Props) {
    const getSectionName = (id: number) =>
        sections.find((s) => s.id === id)?.name ?? '';
    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th className="col">Name</th>
                    <th className="col">Description</th>
                    <th className="col">Section</th>
                    <th className="col"></th>
                    <th className="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map(({ id, name, description, sectionId, imageIds }) => (
                    <tr key={id}>
                        <td>{name}</td>
                        <td>{description}</td>
                        <td>{getSectionName(sectionId)}</td>
                        <td>
                            {imageIds.map((imageId) => (
                                <Image
                                    key={imageId}
                                    imageId={imageId}
                                    style={{
                                        maxWidth: '45%',
                                        marginLeft: '2px',
                                    }}
                                />
                            ))}
                        </td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
