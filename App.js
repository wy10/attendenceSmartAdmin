import React,{Component} from 'react';
import { Router, Route, hashHistory, Redirect } from 'react-router';
import { Provider, connect } from 'react-redux';
import Login from './routes/Login';
import BgRoute from './routes/BgRoute';
import StaffmanManage from './routes/StaffmanManage';
import SystemManger from './routes/SystemManger';
import { message } from 'antd';
import { MENU_ARR } from './routes/BgRoute/Left/Menu';
import store from './routes/Common/UIStore';


function onLeave() {
    message.destroy();
}

function checkAuth(e) {

    let path = e.location.pathname.split('/')[1],
        onlyRouteNameArr = [];
    MENU_ARR.forEach(item => {
  
      let child = item.child;
  
      if (child) {
  
        child.forEach(item => {
  
          if (item.link) {
  
            onlyRouteNameArr.push(item.link.split('/')[1])
  
          }
  
        })
  
      }
  
    })
    
    if (onlyRouteNameArr.includes(path) === false) {
        hashHistory.push({
            //乱输入之后进入
            pathname: "/StaffCardDetailSel"
            
        });
    }
  
  }

class RouteConfig extends React.Component {

    render() {
        return(  
            <Router history={hashHistory}>

                <Route>
                    <Route>
                        <Route path="/Login" component={Login}/>
                    </Route>
                   
                    <Route component={BgRoute} onEnter={checkAuth}>
                       <Route>
                           <Route path="/UnSettingStaff" component={StaffmanManage.UnSettingStaff} onLeave={onLeave}/>
                           <Route path="/StaffCardDetailSel" component={StaffmanManage.StaffCardDetailSel} onLeave={onLeave}/>
                           <Route path="/StaffAttendenceSel" component={StaffmanManage.StaffAttendenceSel} onLeave={onLeave}/>
                           <Route path="/AbsenceOrLeaceSel" component={StaffmanManage.AbsenceOrLeaceSel} onLeave={onLeave}/>
                           <Route path="/BasicAttendence" component={StaffmanManage.BasicAttendence} onLeave={onLeave}/>
                           <Route path="/StaffCharts" component={StaffmanManage.StaffCharts} onLeave={onLeave}/>
                       </Route>
                       <Route>
                           <Route path="/OvertimeAndCardSetting" component={SystemManger.OvertimeAndCardSetting} onLeave={onLeave}/>
                           <Route path="/Staffman" component={SystemManger.Staffman} onLeave={onLeave}/>
                           <Route path="/WorkDept" component={SystemManger.WorkDept} onLeave={onLeave}/>
                           <Route path="/Admin" component={SystemManger.Admin} onLeave={onLeave}/>
                       </Route>
                    </Route>
                </Route>   

                <Redirect from='*' to='/StaffCardDetailSel' /> 
            </Router>    

        )
    }
}
const RouteDiv = () => {

    return (
  
      <Provider store={store}>
        <RouteConfig></RouteConfig>
      </Provider>
  
    )
  
  }
  
  export default RouteDiv

// const RouteConfig1 = (
//   <Router history={hashHistory}>
//     <Route path="/Login" component={Login}  />
//     </Router>
//     )
// class App extends Component {
//   render() {
//     return (
//       <div>
//     <Provider store={store}>{RouteConfig1}</Provider>

//       </div>
//     );
//   }
// }

// export default App;