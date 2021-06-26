import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StoragePage } from './features/storage/StoragePage';
import { Storages } from './features/storages/Storages';
import { NewSectionPage } from './features/section/NewSectionPage';
import { NewItemPage } from './features/item/NewItemPage';
import { NewStoragePage } from './features/storage/NewStoragePage';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Storages} />
                <Route
                    exact
                    path="/storage"
                    component={NewStoragePage}
                />
                <Route
                    exact
                    path="/storage/:storageId"
                    component={StoragePage}
                />
                <Route
                    exact
                    path="/storage/:storageId/section"
                    component={NewSectionPage}
                />
                <Route
                    exact
                    path="/storage/:storageId/item"
                    component={NewItemPage}
                />
            </Switch>
        </Router>
    );
}

export default App;
