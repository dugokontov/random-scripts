import React from 'react';
import { Item, Section } from '../../app/types';
import { ImageAndSlider } from '../image/ImageAndSlider';
import { DeleteItems } from '../item/DeleteItem';
import { EditItemLink } from '../item/EditItemLink';

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
                            <ImageAndSlider
                                id={`ias${id}`}
                                imageIds={imageIds}
                            />
                        </td>
                        <td>
                            <div className="gap-2 d-grid">
                                <DeleteItems
                                    itemId={id}
                                    sectionId={sectionId}
                                    storageId={sections[0].storageId}
                                />
                                <EditItemLink itemId={id} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
