import React from 'react';
import { Router, Route, hashHistory, Redirect } from 'react-router';
import Home from './routes/Home';

class RouteConfig extends React.Component {

    render() {
        return(  
            <Router history={hashHistory}>

                <Route>
                    <Route>
                        <Route path="/" component={Home}/>
                    </Route>
                    {/* <Route>
                       <Route path="/details/:uniquekey" component={NewsDetails}/>
                    </Route> */}
                </Route>    
            </Router>    
          
        )
    }
}
const RouteDiv = () => {

    return (
  
      <div>
        <RouteConfig></RouteConfig>
      </div>
  
    )
  
  }
  
  export default RouteDiv