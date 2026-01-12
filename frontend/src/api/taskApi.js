import{ API_BASE_URL }from'../config.js';

export async function getTasks(){ 
    const res = await fetch(`${API_BASE_URL}/tasks`);
    if (!res.ok){
        throw new Error ('Failed to fetch tasks');
    }
    return res.json();
}

export async function createTask({ title, description }) {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
    }); 

    if(!res.ok){ 
        throw new Error('Failed to create task');
    }

    return res.json();
}

export async function deleteTask(id){ 
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok){
        throw new Error ('Failed to delete task');
    }
    return res.json();
}

export async function updateTask(id, payload) {
 const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
     method: 'PUT',
     headers: {
         'Content-Type': 'application/json',
     },
     body: JSON.stringify(payload),
 });

 if (!res.ok) {
     throw new Error('Failed to update task');
 }

 return res.json();
}     
