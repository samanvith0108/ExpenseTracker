import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, PlusCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTransactions } from '../../hooks/useTransactions';
import { useDebounce } from '../../hooks/useDebounce';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filters from '../../components/Filters/Filters';
import TransactionCard from '../../components/TransactionCard/TransactionCard';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';
import TransactionForm from './TransactionForm';

export default function Transactions() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [editingTransaction, setEditingTransaction] = useState(null);

  const debouncedSearch = useDebounce(search);

  const { transactions, deleteTransaction, updateTransaction } = useTransactions({
    search: debouncedSearch,
    filters,
    sortBy,
    sortOrder,
  });

  const handleDelete = useCallback(
    (id) => {
      deleteTransaction(id);
      toast.success('Transaction deleted.', {
        icon: '🗑️',
        style: { background: '#1e293b', color: '#f1f5f9' },
      });
    },
    [deleteTransaction]
  );

  const handleEdit = useCallback((transaction) => {
    setEditingTransaction(transaction);
  }, []);

  const handleUpdate = useCallback(
    (data) => {
      updateTransaction({ ...data, id: editingTransaction.id });
      setEditingTransaction(null);
      toast.success('Transaction updated.', {
        icon: '✏️',
        style: { background: '#1e293b', color: '#f1f5f9' },
      });
    },
    [updateTransaction, editingTransaction]
  );

  const handleSortChange = useCallback((field, order) => {
    setSortBy(field);
    setSortOrder(order);
  }, []);

  return (
    <div className="space-y-7">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-dark-50">Transactions</h1>
            <p className="text-sm text-dark-300 mt-0.5">{transactions.length} transactions found</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/transactions/new')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200 w-fit"
        >
          <PlusCircle className="w-4 h-4" />
          Add Transaction
        </button>
      </motion.div>

      <SearchBar value={search} onChange={setSearch} />

      <Filters
        filters={filters}
        onFilterChange={setFilters}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onEdit={handleEdit}
                onDelete={handleDelete}
                index={index}
              />
            ))
          ) : (
            <EmptyState
              title="No transactions found"
              description={
                search || Object.keys(filters).length > 0
                  ? 'Try adjusting your search or filters.'
                  : 'Start tracking your finances by adding your first transaction.'
              }
              action={
                !search && Object.keys(filters).length === 0
                  ? { label: 'Add Transaction', onClick: () => navigate('/transactions/new') }
                  : undefined
              }
            />
          )}
        </AnimatePresence>
      </div>

      <Modal
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        title="Edit Transaction"
        size="lg"
      >
        {editingTransaction && (
          <TransactionForm
            defaultValues={editingTransaction}
            onSubmit={handleUpdate}
            isEditing
          />
        )}
      </Modal>
    </div>
  );
}
