const db = require('../config/db');
const Joi = require('joi');

// Validation schema for creating/updating a task
const taskSchema = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().allow('').optional(),
    is_completed: Joi.boolean().optional(),
}).options({ allowUnknown: true }); 

// @desc    Create a new task
// @route   POST /api/v1/tasks
exports.createTask = async (req, res) => {
    try {
        const { error } = taskSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { title, description } = req.body;
        const userId = req.user.id; // We get this from the authMiddleware

        const newTask = await db.query(
            'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
            [userId, title, description]
        );

        res.status(201).json(newTask.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all tasks for a logged-in user
// @route   GET /api/v1/tasks
exports.getAllUserTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await db.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC', [userId]);

        res.json(tasks.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a task
// @route   PUT /api/v1/tasks/:id
exports.updateTask = async (req, res) => {
    try {
        const { error } = taskSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { title, description, is_completed } = req.body;
        const taskId = req.params.id;
        const userId = req.user.id;

        // First, check if the task exists and belongs to the user
        const taskResult = await db.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
        if (taskResult.rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (taskResult.rows[0].user_id !== userId) {
            return res.status(403).json({ message: 'User not authorized to update this task' });
        }

        const updatedTask = await db.query(
            'UPDATE tasks SET title = $1, description = $2, is_completed = $3 WHERE id = $4 RETURNING *',
            [title, description, is_completed, taskId]
        );

        res.json(updatedTask.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a task
// @route   DELETE /api/v1/tasks/:id
exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;

        // Check if the task exists and belongs to the user
        const taskResult = await db.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
        if (taskResult.rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (taskResult.rows[0].user_id !== userId) {
            return res.status(403).json({ message: 'User not authorized to delete this task' });
        }

        await db.query('DELETE FROM tasks WHERE id = $1', [taskId]);

        res.json({ message: 'Task removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get ALL tasks (Admin only)
// @route   GET /api/v1/tasks/admin/all
exports.getAllTasksAdmin = async (req, res) => {
    try {
        const tasks = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
        res.json(tasks.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};