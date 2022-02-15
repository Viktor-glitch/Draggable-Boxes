import React from 'react'
import {Line} from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

function ChartObject() {
    const [chartData, setChartData] = React.useState({labels:[1,2,3,4,5],
        datasets:[
        {
            labels: 'levels',
            data: [1,2,3,4,5],
            backgroundColor:[
                'rgba(75,192,192,0.6)'
            ],
            borderWidth: 4,
        }
    ]});

    return <div contentEditable={true} >

        <Line data={chartData}/>

    </div>
}

export default ChartObject;
