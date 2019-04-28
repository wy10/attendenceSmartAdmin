import { hashHistory } from 'react-router';

export const MENU_ARR = [
    {
      title:'员工考勤管理',
      icon:'mail',
      child:[
        {
          link:'/StaffCardDetailSel',
          title:'员工打卡明细',
          goRoute:()=>{
            hashHistory.push({
              pathname: "/StaffCardDetailSel"   
            });
          }
        },
        {
          link:'/StaffAttendenceSel',
          title:'员工出勤记录',
          goRoute:()=>{
            hashHistory.push({
              pathname: "/StaffAttendenceSel"   
            });
          }
        },{
          link:'/UnSettingStaff',
          title:'未处理员工',
          goRoute:()=>{
            hashHistory.push({
              pathname: "/UnSettingStaff"   
            });
          }
        },{
          link:'/AbsenceOrLeaceSel',
          title:'缺勤/请假记录',
          goRoute:()=>{
            hashHistory.push({
              pathname: "/AbsenceOrLeaceSel"   
            });
          }
        },
        {
          link:'/BasicAttendence',
          title:'考勤统计',
          goRoute:()=>{
            hashHistory.push({
              pathname: "/BasicAttendence"   
            });
          }
        },
      ]
    },
    {
        title:'系统管理与设置',
        icon:'mail',
        child:[
          {
            link:'/Staffman',
            title:'员工管理',
            goRoute:()=>{
              hashHistory.push({
                pathname: "/Staffman"   
              });
            }
          },
          {
            link:'/WorkDept',
            title:'部门管理',
            goRoute:()=>{
              hashHistory.push({
                pathname: "/WorkDept"   
              });
            }
          },
          {
            link:'/OvertimeAndCardSetting',
            title:'加班补卡设置',
            goRoute:()=>{
              hashHistory.push({
                pathname: "/OvertimeAndCardSetting"   
              });
            }
          }
        ]
      }
  ];