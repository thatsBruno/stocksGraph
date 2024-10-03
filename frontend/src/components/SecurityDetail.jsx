import React, { useEffect, useState } from 'react';
import StockService from '../services/StockService';
import { useParams } from 'react-router-dom';

function SecurityDetail() {
    const [security, setSecurity] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    console.log('Retrieved ID:', id);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const data = await StockService.getStockByTicker(id);
                console.log(data)
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

    return (
        <div>
            <h1>{security.name}</h1>
            <p><strong>Sector:</strong> {security.sector}</p>
            <p><strong>Country:</strong> {security.country}</p>
            <p><strong>Trend:</strong> {security.trend}</p>
        </div>
    );
};

export default SecurityDetail;
