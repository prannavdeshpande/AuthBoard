const express = require('express');
const router = express.Router();
const { 
    createTask, 
    getAllUserTasks, 
    updateTask, 
    deleteTask, 
    getAllTasksAdmin // <-- Import new controller
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeAdmin } = require('../middleware/adminMiddleware'); // <-- Import new middleware

// ... (your existing routes are here) ...
router.route('/')
    .get(protect, getAllUserTasks)
    .post(protect, createTask);

router.route('/:id')
    .put(protect, updateTask)
    .delete(protect, deleteTask);

// New Admin-Only Route
router.get('/admin/all', protect, authorizeAdmin, getAllTasksAdmin);

module.exports = router;