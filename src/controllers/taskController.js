import { createTask, getAllTasks, getTaskById, updateTask, deleteTask} from "../services/taskService.js";


export async function createTaskHandler(req, res) {
  try {
    const task = await createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message || "Internal Server Error" });
  }
}

export async function getTaskHandler (req, res) {
    console.log("GET /tasks hit");
    try {
        const tasks = await getAllTasks();
        return res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getTaskByIdHandler(req, res ) {
    try {

        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0 ) { 
            return res.status(400).json({ error: "Invalid task id"});
        }

        const task = await getTaskById(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found"});
        }
        return res.status(200).json(task);


    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}


export async function updateTaskHandler (req, res) {
    try {
        const id = Number (req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: "Invalid task id"});
        }

        const allowdFields = { 
            title: value => typeof value === 'string'&& value.trim().length > 0,
            description: value => typeof value === 'string' || value === null,
            completed: value => typeof value === 'boolean',
        }

        const hasValidField = Object.entries(allowdFields).some(([key , validator]) =>
            validator(req.body?.[key]));

        if (!hasValidField) {
            return res.status(400).json({ error: 
                " You must provide at least one valid field to update: title, description, completed"});
        }


        const updatedTask = await updateTask(id, req.body);
        
        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found"});
        }
        
        return res.status(200).json(updatedTask);
    
    } catch (error) {
        console.error ("PUT/tasks/:id error:", error);
        const status = error.status || 500;
        return res.status(status).json({ error: error.message || "Internal Server Error"});
    }

}


export async function deleteTaskHandler (req, res) {
    
    try {
    
        const id = Number (req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: "Invalid task id"});
        }

        const deletdRows = await deleteTask(id);
        if (deletdRows === 0) {
            return res.status(404).json({ error: "Task not found"});
        }
        return res.json({ message: "Task deleted successfully"});



    } catch (error) {
        console.error("DELETE /tasks/:id error:", error);
        const status = error.status || 500;
        return res.status (status).json({ error: error.message || "Internal Server Error"});
    }
}