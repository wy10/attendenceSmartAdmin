import { hashHistory } from 'react-router';

export const MENU_ARR = [
  {
    title: '未签到员工',
    icon: 'exclamation-circle',
    child: [
      {
        link: '/UnSettingStaff',
        title: '未签到员工',
        goRoute: () => {
          hashHistory.push({
            pathname: "/UnSettingStaff"
          });
        }
      }]
  },
  {
    title: '员工考勤管理',
    icon: 'team',
    child: [
      {
        link: '/StaffCardDetailSel',
        title: '员工打卡明细',
        goRoute: () => {
          hashHistory.push({
            pathname: "/StaffCardDetailSel"
          });
        }
      },
      {
        link: '/StaffAttendenceSel',
        title: '员工出勤记录',
        goRoute: () => {
          hashHistory.push({
            pathname: "/StaffAttendenceSel"
          });
        }
      }, {
        link: '/AbsenceOrLeaceSel',
        title: '缺勤/请假记录',
        goRoute: () => {
          hashHistory.push({
            pathname: "/AbsenceOrLeaceSel"
          });
        }
      },
      {
        link: '/BasicAttendence',
        title: '考勤统计',
        goRoute: () => {
          hashHistory.push({
            pathname: "/BasicAttendence"
          });
        }
      },{
        link: '/StaffCharts',
        title: '图表分析',
        goRoute: () => {
          hashHistory.push({
            pathname: "/StaffCharts"
          });
        }
      },
    ]
  },
  {
    title: '系统管理与设置',
    icon: 'setting',
    child: [
      {
        link: '/Admin',
        title: '管理员',
        goRoute: () => {
          hashHistory.push({
            pathname: "/Admin"
          });
        }
      },
      {
        link: '/Staffman',
        title: '员工管理',
        goRoute: () => {
          hashHistory.push({
            pathname: "/Staffman"
          });
        }
      },
      {
        link: '/WorkDept',
        title: '部门管理',
        goRoute: () => {
          hashHistory.push({
            pathname: "/WorkDept"
          });
        }
      },
      {
        link: '/OvertimeAndCardSetting',
        title: '加班补卡设置',
        goRoute: () => {
          hashHistory.push({
            pathname: "/OvertimeAndCardSetting"
          });
        }
      }
    ]
  }
];