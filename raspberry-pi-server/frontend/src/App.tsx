import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Storage } from './features/storage/Storage';
import { Storages } from './features/storages/Storages';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Storages} />
                <Route exact path="/storage/:storageId" component={Storage} />
            </Switch>
        </Router>
    );
}

export default App;
