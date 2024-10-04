import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import StockService from '../services/StockService';
import { useNavigate } from 'react-router-dom';
import './securities-list.css';

function SecuritiesList() {
    const [securities, setSecurities] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const data = await StockService.getAllStocks();
                setSecurities(data);
            } catch (error) {
                console.error('Error fetching securities:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStocks();
    }, []);

    const columns = [
        { field: 'ticker', headerName: 'Symbol', width: 130 },
        { field: 'securityname', headerName: 'Name', width: 130 },
        { field: 'sector', headerName: 'Sector', width: 130 },
        { field: 'country', headerName: 'Country', width: 130 },
        { field: 'trend', headerName: 'Trend', width: 130 },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleRowClick = (params) => {
        navigate(`/securities/${params.row.ticker}`);
        console.log(`${params.row.ticker}`)
    };

    return (
        <>
        <div className='header'>
            <h1>Securities</h1>
        </div>
        <div className="container">
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={securities}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                    onRowClick={handleRowClick}
                />
            </Paper>
        </div>
        </>
    );
};

export default SecuritiesList;
