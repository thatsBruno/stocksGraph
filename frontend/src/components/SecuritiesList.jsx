import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StockService from '../services/StockService';

function SecuritiesList() {
    const [securities, setSecurities] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Securities List</h1>
            <ul>
                {securities.map((security) => (
                    <li key={security.ticker}>
                        <Link to={`/securities/${security.ticker}`}>
                            {security.securityname} - {security.sector}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SecuritiesList;
