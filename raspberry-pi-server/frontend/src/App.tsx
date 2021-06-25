import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Storage } from './features/storage/Storage';
import { Storages } from './features/storages/Storages';
import { NewSectionPage } from './features/section/NewSectionPage';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Storages} />
                <Route exact path="/storage/:storageId" component={Storage} />
                <Route exact path="/storage/:storageId/section" component={NewSectionPage} />
            </Switch>
        </Router>
    );
}

export default App;
