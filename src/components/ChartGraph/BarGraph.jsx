import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarGraph = () => {
    const barChartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(barChartRef.current);
        chart.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [126, 198, 145, 76, 79, 113, 137],
                    type: 'bar'
                }
            ]
        });

        return () => {
            chart.dispose();
        };

    }, []);

    return (
        <>
            <h5 className="card-title">Booking Bar Graph</h5>
            <div
                ref={barChartRef}
                style={{ minHeight: '400px' }}
                className="echart"
            ></div>
        </>

    );
};

export default BarGraph;