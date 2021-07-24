import React from 'react';
import { Loader } from '../loader/Loader';
import { NoSections } from '../section/NoSections';
import { useAddItem } from './hooks';
import { NewItem } from './NewItem';
import { NewItemBreadcrumbs } from './NewItemBreadcrumbs';

export function NewItemPage() {
    const { addItem, storage, sections, isLoading, error } = useAddItem();

    let content: React.ReactNode;
    if (isLoading) {
        content = (
            <div className="row">
                <Loader />
            </div>
        );
    } else if (error || !storage || !sections) {
        content = (
            <div className="alert alert-danger" role="alert">
                {error ?? 'Unknown error'}
            </div>
        );
    } else if (sections.length === 0) {
        content = <NoSections storage={storage} />;
    } else {
        content = (
            <NewItem
                storage={storage}
                sections={sections}
                onAddItem={addItem}
            />
        );
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <NewItemBreadcrumbs storageName={storage?.name} />
                </div>
            </div>
            {content}
        </div>
    );
}
