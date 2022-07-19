// @ts-nocheck
import * as echarts from 'echarts';
import React,{useEffect} from 'react';
export default function Index(props) {
    useEffect(()=>{
      return ()=>{
        window.onresize =null
      }
    },[])
    if (props.option) {
        setTimeout(() => {
            var chartDom = document.getElementById('main1');
            var myChart = echarts.getInstanceByDom(chartDom);
            if (!myChart) // 如果不存在则创建
            {
                myChart = echarts.init(chartDom);
            }
            props.option && myChart.setOption(props.option);
            window.onresize = ()=>{
                myChart.resize()
            }
        }, 0);
    }
    return (
        <div id='main1' style={{ height: '400px', marginTop: '20px', width: '100%' }}>
        </div>
    )
}
