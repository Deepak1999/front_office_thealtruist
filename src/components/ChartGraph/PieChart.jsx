import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import BarGraph from './BarGraph';

const PieChart = () => {

    const pieChartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(pieChartRef.current);
        chart.setOption({
            title: {
                text: 'Thealtruist Hostels',
                subtext: 'Testing Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Hotels Booking Data',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 40, name: 'Today Checkout' },
                        { value: 103, name: 'BookingID' },
                        { value: 60, name: 'Today Checkin' },
                        { value: 72, name: 'Guest Upload Count' },
                        { value: 123, name: 'Guest Count' },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });

        return () => {
            chart.dispose();
        };
    }, []);

    return (
        <main id="main" className="main">
            <section className="section">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Booking Pie Chart</h5>
                                <div
                                    ref={pieChartRef}
                                    style={{ minHeight: '400px' }}
                                    className="echart"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <BarGraph />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default PieChart;