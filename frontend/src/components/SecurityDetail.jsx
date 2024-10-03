import React, { useEffect, useState } from 'react';
import StockService from '../services/StockService';
import { useParams } from 'react-router-dom';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


function SecurityDetail() {
    const [security, setSecurity] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const data = await StockService.getStockByTicker(id);
                setSecurity(data);
            } catch (error) {
                console.error(`Error fetching security with id ${id}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchStock();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!security) {
        return <div>Security not found!</div>;
    }

    // chart
    const chartData = security.prices.map(price => ({
        date: price.date,
        close: parseFloat(price.close),
        volume: parseInt(price.volume),
    }));

    const options = {
        title: {
            text: 'Stock Close Prices and Volume',
        },
        xAxis: {
            categories: chartData.map(data => data.date),
            title: {
                text: 'Date',
            },
        },
        yAxis: [{
            title: {
                text: 'Close Price',
            },
            opposite: true,
        },
        {
            title: {
                text: 'Volume',
            },
        }],
        series: [{
            name: 'Close Price',
            type: 'line',
            data: chartData.map(data => data.close),
        }, 
        {
            name: 'Volume',
            type: 'line',
            data: chartData.map(data => data.volume),
            yAxis: 1,
        }],
    }; 

    return (
        <>
            <div>
                <h1>{security.ticker} - {security.securityname}
                </h1>
                <p><strong>Sector:</strong> {security.sector}</p>
                <p><strong>Country:</strong> {security.country}</p>
            </div>
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        </>
    );
};

export default SecurityDetail;
