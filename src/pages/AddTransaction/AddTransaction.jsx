import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTransactions } from '../../hooks/useTransactions';
import TransactionForm from '../Transactions/TransactionForm';

export default function AddTransaction() {
  const navigate = useNavigate();
  const { createTransaction } = useTransactions();

  const handleSubmit = (data) => {
    createTransaction(data);
    toast.success('Transaction added successfully.', {
      icon: '✅',
      style: { background: '#1e293b', color: '#f1f5f9' },
    });
    navigate('/transactions');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-dark-300 hover:text-dark-100 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-dark-50">Add Transaction</h1>
            <p className="text-sm text-dark-300 mt-0.5">Record a new income or expense</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-5 sm:p-8"
      >
        <TransactionForm onSubmit={handleSubmit} />
      </motion.div>
    </div>
  );
}
