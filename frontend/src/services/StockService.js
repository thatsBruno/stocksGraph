const API_URL = 'http://localhost:3001/api';

const StockService = {
    getAllStocks: async () => {
        try {
            const response = await fetch(`${API_URL}/stocks`);
            if (!response.ok) {
                throw new Error('Failed to fetch stocks');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching stocks:', error);
            throw error;
        }
    },

    getStockByTicker: async (id) => {
        try {
            const response = await fetch(`${API_URL}/stocks/ticker/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch stock with id ${id}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching stock with id ${id}:`, error);
            throw error;
        }
    },
};

export default StockService;
