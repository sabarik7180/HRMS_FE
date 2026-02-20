
import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Mail, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

const initialEmployees = [
    { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Product' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', department: 'Design' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', department: 'Marketing' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', department: 'HR' },
];

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState(initialEmployees);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', department: '' });

    const handleAddClick = () => {
        setEditingEmployee(null);
        setFormData({ name: '', email: '', department: '' });
        setIsModalOpen(true);
    };

    const handleEditClick = (employee) => {
        setEditingEmployee(employee);
        setFormData({ ...employee });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            setEmployees(employees.filter(emp => emp.id !== id));
            toast.success('Employee deleted successfully');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingEmployee) {
            setEmployees(employees.map(emp =>
                emp.id === editingEmployee.id ? { ...formData, id: emp.id } : emp
            ));
            toast.success('Employee updated successfully');
        } else {
            setEmployees([...employees, { ...formData, id: Date.now() }]);
            toast.success('Employee added successfully');
        }
        setIsModalOpen(false);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Employee Management</h2>
                <button
                    onClick={handleAddClick}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Employee
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((employee) => (
                    <div key={employee.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                                {employee.name.charAt(0)}
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEditClick(employee)}
                                    className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(employee.id)}
                                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{employee.name}</h3>

                        <div className="space-y-2 text-gray-600">
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                <span className="text-sm">{employee.email}</span>
                            </div>
                            <div className="flex items-center">
                                <Briefcase className="w-4 h-4 mr-2" />
                                <span className="text-sm">{employee.department}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">
                                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <input
                                    type="text"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                                >
                                    {editingEmployee ? 'Save Changes' : 'Add Employee'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeManagement;
