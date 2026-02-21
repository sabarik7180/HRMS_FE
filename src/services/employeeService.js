const API_BASE_URL = 'https://hrms-be-s7ox.onrender.com';

export const getEmployees = async () => {
    return await fetch(`${API_BASE_URL}/employees`);
};

export const addEmployee = async (employeeData) => {
    return await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData)
    });
};

export const updateEmployee = async (id, employeeData) => {
    return await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData)
    });
};

export const deleteEmployee = async (id) => {
    return await fetch(`${API_BASE_URL}/employees/${id}/delete`, {
        method: 'POST',
    });
};

export const getAttendanceByDate = async (targetDate) => {
    return await fetch(`${API_BASE_URL}/attendance/by-date/${targetDate}`);
};

export const getMonthlyAttendanceSummary = async (targetDate) => {
    return await fetch(`${API_BASE_URL}/attendance/${targetDate}`);
};
