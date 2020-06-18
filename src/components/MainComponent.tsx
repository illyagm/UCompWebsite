import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NoMatchComponent from './noMatch/NoMatchComponent';
import HomeComponent from './home/HomeComponent';
import Searcher from './searcher/SearcherComponent';
import SearchResult from './searchResults/seachResults';


export const MainComponent = () => {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" component={Searcher} />
                    <Route path="/about" component={HomeComponent} />
                    <Route path="/compareProduct" component={SearchResult}></Route>
                    <Route path="/compareProduct/section1" component={SearchResult}></Route>
                    <Route component={NoMatchComponent} />
                </Switch>
            </Router>
        </React.Fragment>
    )
}

export default MainComponent;
