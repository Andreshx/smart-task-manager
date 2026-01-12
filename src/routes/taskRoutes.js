import { Router } from 'express';
import { createTaskHandler, getTaskHandler, getTaskByIdHandler, updateTaskHandler, deleteTaskHandler } from '../controllers/taskController.js';
const router = Router(); 


router.post('/', createTaskHandler);
router.get('/', getTaskHandler);
router.get('/:id', getTaskByIdHandler);
router.put('/:id', updateTaskHandler);
router.patch('/:id', updateTaskHandler);
router.delete('/:id', deleteTaskHandler);

export default router;