import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import EmployeeManagement from '../components/EmployeeManagement';
import AttendanceManagement from '../components/AttendanceManagement';

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('employees');

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <div className="flex-1 overflow-auto">
                <div className="p-6">
                    {activeSection === 'employees' ? <EmployeeManagement /> : <AttendanceManagement />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
