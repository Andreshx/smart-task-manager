    import {db} from "../db/database.js";

function validateCreateTaskInput({title}) {
const isString = typeof title === 'string';
const cleanTitle = isString ? title.trim() : '';

if (!isString || cleanTitle.length === 0) {

    const error = new Error ('Title is required ');
    error.status = 400; 
    throw error;
}
return {cleanTitle};
}


export async function createTask ({ title, description}){
    
    const { cleanTitle } = validateCreateTaskInput({title});

    const cleanDescription =
    typeof description === 'string' && description.trim().length > 0
    ? description.trim()
    : null;

    const result = await db.run(
        `INSERT INTO tasks (title, description) VALUES (?, ?)`,
        [cleanTitle, cleanDescription]
    );

    return db.get(`SELECT * FROM tasks WHERE id = ?`, [result.lastID]);

}

export async function getAllTasks() {
    const rows = await db.all(`SELECT * FROM tasks ORDER BY created_at DESC`);
    return rows;
}

export async function getTaskById(id){

    const task = await db.get(`SELECT * FROM tasks WHERE id = ? `, [id]); 
    return task; 

}

export async function updateTask(id, { title, description, completed }) {

    const existingTask = await getTaskById(id);
    if (!existingTask) {
        const error = new Error('Task not found');
        error.status = 404;
        throw error;
    }   
    const updatedTitle =
        typeof title === 'string' && title.trim().length > 0
        ? title.trim()
        : existingTask.title;

    const updatedDescription =
        typeof description === 'string' && description.trim().length > 0
        ? description.trim()
        : existingTask.description;

    const updatedCompleted =
        typeof completed === 'boolean' ? (completed ? 1 : 0) : existingTask.completed;  

    await db.run(
        `UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?`,
        [updatedTitle, updatedDescription, updatedCompleted, id]
    );
    return getTaskById(id);
    
}

export async function deleteTask (id) { 
    const task = await getTaskById(id);
    if (!task) {
        const error = new Error ('Task not found');
        error.status = 404;
        throw error;
    }
    await db.run(`DELETE FROM tasks WHERE id = ?`, [id]);
    return task;
}

