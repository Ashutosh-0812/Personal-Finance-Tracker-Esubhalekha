import { useState } from 'react';

const FilterPanel = ({ filters, onApplyFilters, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    setLocalFilters({
      ...localFilters,
      [e.target.name]: e.target.value
    });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      category: '',
      startDate: '',
      endDate: '',
      type: ''
    };
    setLocalFilters(clearedFilters);
    onApplyFilters(clearedFilters);
    onClose();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Filter Transactions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={localFilters.type}
            onChange={handleChange}
            className="input"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={localFilters.category}
            onChange={handleChange}
            className="input"
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Rent">Rent</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Investment">Investment</option>
            <option value="Gift">Gift</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={localFilters.startDate}
            onChange={handleChange}
            className="input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={localFilters.endDate}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 mt-4">
        <button onClick={handleClear} className="btn btn-secondary">
          Clear Filters
        </button>
        <button onClick={handleApply} className="btn btn-primary">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;