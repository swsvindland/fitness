import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './Components/App';
import { Chart as ChartJS } from 'chart.js';

ChartJS.defaults.color = '#14b8a6';
ChartJS.defaults.borderColor = '#042f2e';
ChartJS.defaults.font.family = "'Oswald', 'sans-serif'";
ChartJS.defaults.font.size = 10;

const container = document.getElementById('root');

if (!container) {
    throw new Error('Root element not found');
}

const root = createRoot(container);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
