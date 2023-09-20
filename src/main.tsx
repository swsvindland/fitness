import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './Components/App';
import reportWebVitals from './reportWebVitals';
import { Chart as ChartJS } from 'chart.js';
import { Analytics } from '@vercel/analytics/react';

ChartJS.defaults.color = '#AFD257';
ChartJS.defaults.borderColor = '#0D3140';
ChartJS.defaults.font.family = "'Oswald', 'sans-serif'";
ChartJS.defaults.font.size = 10;

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <StrictMode>
        <App />
        <Analytics />
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
