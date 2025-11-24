import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/tasks';

// A function to get the auth token from localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'x-auth-token': token,
        },
    };
};

// Service function to get all tasks
export const getTasks = () => {
    return axios.get(API_URL, getAuthHeaders());
};

// Service function to create a new task
export const createTask = (taskData) => {
    return axios.post(API_URL, taskData, getAuthHeaders());
};

// Service function to update a task
export const updateTask = (id, taskData) => {
    return axios.put(`${API_URL}/${id}`, taskData, getAuthHeaders());
};

// Service function to delete a task
export const deleteTask = (id) => {
    return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

// Export them all as a single object
const taskService = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};

export default taskService;