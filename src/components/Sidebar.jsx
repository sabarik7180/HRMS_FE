
import { Users, Calendar, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeSection, setActiveSection }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="w-64 h-screen bg-white shadow-lg flex flex-col">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-black-600">HRMS</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <button
                    onClick={() => setActiveSection('employees')}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeSection === 'employees'
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <Users className="w-5 h-5 mr-3" />
                    <span className="font-medium">Employee Management</span>
                </button>
                <button
                    onClick={() => setActiveSection('attendance')}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeSection === 'attendance'
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <Calendar className="w-5 h-5 mr-3" />
                    <span className="font-medium">Attendance Management</span>
                </button>
            </nav>
            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
