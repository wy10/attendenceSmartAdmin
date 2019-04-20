import React from 'react';
import { Router, Route, hashHistory, Redirect } from 'react-router';
import Login from './routes/Login';
import BgRoute from './routes/BgRoute';
import StaffmanManage from './routes/StaffmanManage';
import SystemManger from './routes/SystemManger';

class RouteConfig extends React.Component {

    render() {
        return(  
            <Router history={hashHistory}>

                <Route>
                    <Route>
                        <Route path="/" component={Login}/>
                    </Route>
                   
                    <Route component={BgRoute}>
                       <Route>
                           <Route path="/BasicAttendence" component={StaffmanManage.BasicAttendence}/>
                           <Route path="/StaffAttendenceSel" component={StaffmanManage.StaffAttendenceSel}/>
                           <Route path="/OvertimeSetting" component={SystemManger.OvertimeSetting} />
                       </Route>
                    </Route>
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