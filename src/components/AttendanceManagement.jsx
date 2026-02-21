import { useState, useEffect } from 'react';
import { Calendar, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAttendanceByDate, getMonthlyAttendanceSummary } from '../services/employeeService';

const AttendanceManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(true);
    const [presentCountMap, setPresentCountMap] = useState({});

    useEffect(() => {
        fetchEmployees();
        fetchMonthlySummary();
    }, [selectedDate]);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await getAttendanceByDate(selectedDate);
            if (response.ok) {
                const data = await response.json();
                setEmployees(data);
            } else {
                toast.error('Failed to fetch employees for attendance');
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
            toast.error('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    const fetchMonthlySummary = async () => {
        // Use the first day of the selected month as the target_date
        const d = new Date(selectedDate);
        const firstDayOfMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
        try {
            const response = await getMonthlyAttendanceSummary(firstDayOfMonth);
            if (response.ok) {
                const json = await response.json();
                const map = {};
                (json.data || []).forEach(item => { map[item.emp_id] = item.present_count; });
                setPresentCountMap(map);
            }
        } catch (error) {
            console.error('Error fetching monthly summary:', error);
        }
    };

    const handleStatusChange = async (employeeId, status) => {
        try {
            console.log(employeeId, status);
            // Using base URL directly as requested for the attendance patch endpoint
            const response = await fetch(`https://hrms-be-s7ox.onrender.com/attendance/${employeeId}/${selectedDate}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });

            const message = status === true ? "Present" : "Absent"

            if (response.ok) {
                toast.success(`Marked as ${message}`);
                fetchEmployees();
                fetchMonthlySummary();
            } else {
                const errorData = await response.json().catch(() => ({}));
                toast.error(errorData.detail || 'Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Error connecting to server');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Attendance Management</h2>
                <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">present count of this month</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">Loading employees...</td>
                            </tr>
                        ) : employees.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No employees found</td>
                            </tr>
                        ) : (
                            employees.map((employee) => (
                                <tr key={employee.employee_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <div className="text-sm font-medium text-gray-900">{employee.emp_name}</div>
                                            <div className="text-sm text-gray-500">{employee.department}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div
                                            onClick={() => handleStatusChange(employee.employee_id, true)}
                                            className={`w-5 h-5 cursor-pointer rounded border-2 transition-all ${employee.status == true ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-400'}`}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div
                                            onClick={() => handleStatusChange(employee.employee_id, false)}
                                            className={`w-5 h-5 cursor-pointer rounded border-2 transition-all ${employee.status == false && employee.status !== null && employee.status !== undefined ? 'bg-red-500 border-red-500' : 'border-gray-300 hover:border-red-400'}`}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-50 text-indigo-700">
                                            {presentCountMap[employee.employee_id] ?? '—'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceManagement;
