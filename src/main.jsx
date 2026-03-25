import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App.jsx';
import { FinanceProvider } from './context/FinanceContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FinanceProvider>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: '#1e293b',
          color: '#f1f5f9',
          borderRadius: '12px',
          border: '1px solid rgba(148, 163, 184, 0.1)',
        }}
      />
    </FinanceProvider>
  </StrictMode>
);
