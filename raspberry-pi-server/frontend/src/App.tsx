import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StoragePage } from './features/storage/StoragePage';
import { Storages } from './features/storages/Storages';
import { NewSectionPage } from './features/section/NewSectionPage';
import { NewItemPage } from './features/item/NewItemPage';
import { NewStoragePage } from './features/storage/NewStoragePage';
import { SearchPage } from './features/search/SearchPage';
import { NavigationHeader } from './features/navigationHeader/NavigationHeader';
import { EditStoragePage } from './features/storage/EditStoragePage';

function App() {
    return (
        <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
            <NavigationHeader />
            <Switch>
                <Route exact path="/" component={Storages} />
                <Route exact path="/storage" component={NewStoragePage} />
                <Route
                    exact
                    path="/storage/:storageId"
                    component={StoragePage}
                />
                <Route
                    exact
                    path="/storage/:storageId/edit"
                    component={EditStoragePage}
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

                <Route exact path="/search/:query" component={SearchPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
