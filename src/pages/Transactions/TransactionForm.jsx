import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CATEGORIES } from '../../utils/sampleData';

const schema = yup.object().shape({
  title: yup.string().required('Title is required').min(2, 'At least 2 characters').max(100, 'Max 100 characters'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Amount is required')
    .positive('Amount must be positive')
    .max(10000000, 'Amount too large'),
  category: yup.string().required('Category is required'),
  date: yup.string().required('Date is required'),
  type: yup.string().required('Type is required').oneOf(['income', 'expense']),
  notes: yup.string().max(300, 'Max 300 characters'),
  recurring: yup.boolean(),
});

export default function TransactionForm({ defaultValues, onSubmit, isEditing = false }) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      type: 'expense',
      notes: '',
      recurring: false,
      ...defaultValues,
    },
  });

  const transactionType = watch('type');

  const inputClass = (error) =>
    `w-full px-4 py-3 rounded-xl bg-dark-800/50 border text-sm text-dark-100 placeholder-dark-500
    focus:outline-none focus:ring-2 transition-all duration-200
    ${error
      ? 'border-danger-500/50 focus:ring-danger-500/30'
      : 'border-dark-700/50 focus:ring-primary-500/30 focus:border-primary-500/50'
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="text-xs font-semibold text-dark-300 uppercase tracking-wider mb-2 block">
          Transaction Type
        </label>
        <div className="flex gap-3">
          {['expense', 'income'].map((type) => (
            <label
              key={type}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold cursor-pointer transition-all duration-200
                ${transactionType === type
                  ? type === 'income'
                    ? 'bg-primary-500/15 border-primary-500/30 text-primary-400'
                    : 'bg-danger-500/15 border-danger-500/30 text-danger-400'
                  : 'bg-dark-800/30 border-dark-700/50 text-dark-300 hover:border-dark-600'
                }`}
            >
              <input
                type="radio"
                value={type}
                {...register('type')}
                className="hidden"
              />
              {type === 'income' ? '↑ Income' : '↓ Expense'}
            </label>
          ))}
        </div>
        {errors.type && <p className="text-xs text-danger-400 mt-1">{errors.type.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-dark-300 uppercase tracking-wider mb-2 block">
            Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Grocery Shopping"
            {...register('title')}
            className={inputClass(errors.title)}
          />
          {errors.title && <p className="text-xs text-danger-400 mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <label className="text-xs font-semibold text-dark-300 uppercase tracking-wider mb-2 block">
            Amount (INR) *
          </label>
          <input
            type="number"
            placeholder="e.g. 5000"
            step="1"
            {...register('amount')}
            className={inputClass(errors.amount)}
          />
          {errors.amount && <p className="text-xs text-danger-400 mt-1">{errors.amount.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-dark-300 uppercase tracking-wider mb-2 block">
            Category *
          </label>
          <select
            {...register('category')}
            className={inputClass(errors.category)}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-danger-400 mt-1">{errors.category.message}</p>}
        </div>
        <div>
          <label className="text-xs font-semibold text-dark-300 uppercase tracking-wider mb-2 block">
            Date *
          </label>
          <input
            type="date"
            {...register('date')}
            className={inputClass(errors.date)}
          />
          {errors.date && <p className="text-xs text-danger-400 mt-1">{errors.date.message}</p>}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-dark-300 uppercase tracking-wider mb-2 block">
          Notes
        </label>
        <textarea
          placeholder="Optional notes about this transaction..."
          rows={3}
          {...register('notes')}
          className={`${inputClass(errors.notes)} resize-none`}
        />
        {errors.notes && <p className="text-xs text-danger-400 mt-1">{errors.notes.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <Controller
          name="recurring"
          control={control}
          render={({ field }) => (
            <button
              type="button"
              onClick={() => field.onChange(!field.value)}
              className={`relative w-12 h-6 rounded-full transition-all duration-300
                ${field.value
                  ? 'bg-primary-500'
                  : 'bg-dark-700'
                }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300
                  ${field.value ? 'left-[26px]' : 'left-0.5'}`}
              />
            </button>
          )}
        />
        <label className="text-sm text-dark-300">Mark as recurring transaction</label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting
          ? 'Saving...'
          : isEditing
            ? 'Update Transaction'
            : 'Add Transaction'
        }
      </button>
    </form>
  );
}
