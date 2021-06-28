import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StoragePage } from './features/storage/StoragePage';
import { Storages } from './features/storages/Storages';
import { NewSectionPage } from './features/section/NewSectionPage';
import { NewItemPage } from './features/item/NewItemPage';
import { NewStoragePage } from './features/storage/NewStoragePage';
import { SearchPage } from './features/search/SearchPage';
import { NavigationHeader } from './features/navigationHeader/NavigationHeader';

function App() {
    return (
        <Router>
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
        </Router>
    );
}

export default App;
