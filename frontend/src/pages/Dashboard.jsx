import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import taskService from '../services/taskService'; // Import our new service
import './Dashboard.css'; // We'll create this CSS file next

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // Function to fetch tasks from the backend
    const fetchTasks = async () => {
        try {
            const res = await taskService.getTasks();
            setTasks(res.data);
        } catch (err) {
            setError('Failed to fetch tasks.');
        }
    };

    // useEffect runs once when the component loads
    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const res = await taskService.createTask({ title, description });
            setTasks([res.data, ...tasks]); // Add new task to the top of the list
            setTitle(''); // Clear form
            setDescription('');
        } catch (err) {
            setError('Failed to create task.');
        }
    };
    
    const handleToggleComplete = async (task) => {
         try {
            const updatedTaskData = { ...task, is_completed: !task.is_completed };
            const res = await taskService.updateTask(task.id, updatedTaskData);
            setTasks(tasks.map(t => (t.id === task.id ? res.data : t)));
        } catch (err) {
            setError('Failed to update task.');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await taskService.deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id)); // Remove task from the list
        } catch (err) {
            setError('Failed to delete task.');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Dashboard</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </header>

            {error && <p className="message error">{error}</p>}

            <div className="task-form-container">
                <form onSubmit={handleCreateTask}>
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button type="submit">Add Task</button>
                </form>
            </div>

            <div className="task-list">
                {tasks.map(task => (
                    <div key={task.id} className={`task-item ${task.is_completed ? 'completed' : ''}`}>
                        <div className="task-content">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                        </div>
                        <div className="task-actions">
                            <button onClick={() => handleToggleComplete(task)}>
                                {task.is_completed ? 'Undo' : 'Complete'}
                            </button>
                            <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;