import createG2 from 'g2-react';
import { Stat } from 'g2';

const Line = createG2(chart => {
  chart.axis('name', {
    title: null
  });
  chart.axis('vote', {
    title: null
  });
  chart.legend(false);
 
  chart.interval().position('name*vote').color('name', ['#7f8da9', '#fec514', '#db4c3c', '#daf0fd','#D8BFD8']);
  chart.render();
});

const Pie = createG2(chart => {
  // 重要：绘制饼图时，必须声明 theta 坐标系
  chart.coord('theta', {
    radius: 0.8 // 设置饼图的大小
  });
  chart.legend('name', {
    position: 'bottom',
    itemWrap: true,
    // formatter: function(val) {
    //   for(var i = 0, len = data.length; i < len; i++) {
    //     var obj = data[i];
    //     if (obj.name === val) {
    //       return val + ': ' + obj.value + '%'; 
    //     }
    //   }
    // }
  });
  chart.tooltip({
    title: null,
    map: {
      value: 'value'
    }
  });
  chart.intervalStack()
    .position(Stat.summary.percent('value'))
    .color('name')
    .label('name*..percent',function(name, percent){
      percent = (percent * 100).toFixed(2) + '%';
      return name;
    });
  chart.render();
  // 设置默认选中
  var geom = chart.getGeoms()[0]; // 获取所有的图形
  var items = geom.getData(); // 获取图形对应的数据
  geom.setSelected(items[1]); // 设置选中      
});

export default {
  Line:Line,
  Pie:Pie
}



 