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
                        <Route path="/Login" component={Login}/>
                    </Route>
                   
                    <Route component={BgRoute}>
                       <Route>
                           <Route path="/StaffCardDetailSel" component={StaffmanManage.StaffCardDetailSel}/>
                           <Route path="/StaffAttendenceSel" component={StaffmanManage.StaffAttendenceSel}/>
                           <Route path="/AbsenceOrLeaceSel" component={StaffmanManage.AbsenceOrLeaceSel}/>
                           <Route path="/BasicAttendence" component={StaffmanManage.BasicAttendence}/>
                           <Route path="/UnSettingStaff" component={StaffmanManage.UnSettingStaff}/>
                           
                           <Route path="/OvertimeAndCardSetting" component={SystemManger.OvertimeAndCardSetting} />
                           <Route path="/Staffman" component={SystemManger.Staffman} />
                           <Route path="/WorkDept" component={SystemManger.WorkDept} />
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