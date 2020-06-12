import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NoMatchComponent from './noMatch/NoMatchComponent';
import HomeComponent from './home/HomeComponent';
import Searcher from './searcher/SearcherComponent';



export const MainComponent = () => {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" component={Searcher} />
                    <Route path="/about" component={HomeComponent} />
                    <Route component={NoMatchComponent} />
                </Switch>
            </Router>
        </React.Fragment>
    )
}

export default MainComponent;
