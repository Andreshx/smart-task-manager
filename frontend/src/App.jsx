import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "./api/taskApi.js";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  const [filter, setFilter] = useState("all");


  useEffect(() => {
    async function load() {
      try {
        setErrorMsg("");
        setLoading(true);
        const data = await getTasks();
        console.log("DATA /tasks:", data);
        setTasks(data);
      } catch (e) {
        setErrorMsg(e?.message ?? "Error desconocido");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);


  // LOGICA DEL PROGRAMA 



  async function handleCreate(e) {
    e.preventDefault();
    try {

      setErrorMsg("");
      setLoading(true);
      const newTask = await createTask({
        title: title.trim(),
        description: description.trim() || null,
      });

      setTasks((prevTasks) => [...prevTasks, newTask]);

      setTitle("");
      setDescription("");

    } catch (e) {
      setErrorMsg(e?.message ?? "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("¿Estás seguro de que deseas eliminar esta tarea?");
    if (!ok) return;

    try {
      setErrorMsg("");
      setLoading(true);
      await deleteTask(id);

      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));

    } catch (e) {
      setErrorMsg(e?.message ?? "Error desconocido");
    }
    finally {
      setLoading(false);
    }
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditingTitle(task.title ?? "");
    setEditingDescription(task.description ?? "");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingTitle("");
    setEditingDescription("");
  }

  async function handleSave(id) {
    try {
      setErrorMsg("");
      setLoading(true);

      const payload = {
        title: editingTitle.trim(),
        description: editingDescription.trim() || null,
      }

      const updated = await updateTask(id, payload);

      setTasks((prevTasks) => prevTasks.map((t) => t.id === id ? updated : t));

      cancelEdit();
    } catch (e) {
      setErrorMsg(e?.message ?? "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleComplete(task) {
    try {
      setErrorMsg("");
      setLoading(true);

      const updated = await updateTask(task.id, {
        completed: !task.completed,
      });

      setTasks((prevTasks) => prevTasks.map((t) => t.id === task.id ? updated : t));

    } catch (e) {
      setErrorMsg(e?.message ?? "Error al actualizar tarea");
    } finally {
      setLoading(false);
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    // pendientes primero
    return Number(a.completed) - Number(b.completed);
  });

  const visibleTasks = sortedTasks.filter((t) => {
    if (filter === "pendientes") return !Boolean(t.completed);
    if (filter === "completadas") return Boolean(t.completed);
    return true;
  });

  const completedCount = tasks.filter((t) => Boolean(t.completed)).length;
  const pendingCount = tasks.length - completedCount;


// HTML / JSX DEL PROGRAMA

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Smart Task Manager</h1>
          <p className="sub">Frontend (React) + Backend (Node/Express)</p>
        </div>
        <div className="badge">Total: {tasks.length}</div>
      </div>

      {errorMsg ? <div className="alert">Error: {errorMsg}</div> : null}

      <div className="grid">
        {/* Crear */}
        <div className="card">
          <h2>Crear tarea</h2>

          <form onSubmit={handleCreate} className="grid">
            <div className="row">
              <div className="field">
                <label>Título</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Estudiar React"
                  required
                />
              </div>

              <div className="field">
                <label>Descripción (opcional)</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ej: Hacer CRUD y consumir API"
                />
              </div>
            </div>

            <div className="actions">
              <button className="btnPrimary" type="submit" disabled={!title.trim()}>
                Crear
              </button>
            </div>
          </form>
        </div>

        {/* Lista */}
        <div className="card">
          <div className="listHeader">
            <h2 style={{ margin: 0 }}>Tareas</h2>

            <div className="row" style={{ justifyContent: "flex-end" }}>
              <span className="smallMuted">
                Pendientes: {pendingCount} • Completadas: {completedCount}
              </span>

              <div className="actions">
                <button
                  type="button"
                  className={filter === "todas" ? "btnPrimary" : ""}
                  onClick={() => setFilter("todas")}
                >
                  Todas
                </button>

                <button
                  type="button"
                  className={filter === "pendientes" ? "btnPrimary" : ""}
                  onClick={() => setFilter("pendientes")}
                >
                  Pendientes
                </button>

                <button
                  type="button"
                  className={filter === "completadas" ? "btnPrimary" : ""}
                  onClick={() => setFilter("completadas")}
                >
                  Completadas
                </button>
              </div>
            </div>
          </div>

          <div className="hr" />

          {loading ? <p className="smallMuted">Cargando tareas…</p> : null}

          {!loading && tasks.length === 0 ? (
            <p className="smallMuted">No hay tareas. Crea la primera arriba 🙂</p>
          ) : null}

          <div className="grid" style={{ marginTop: 12 }}>
            {visibleTasks.map((t, index) => {
              const isEditing = editingId === t.id;
              const isCompleted = Boolean(t.completed);

              return (
                <div
                  key={t.id}
                  className={`taskItem ${isCompleted ? "completed" : ""}`}
                >
                  <div className="taskTop">
                    <div style={{ flex: 1 }}>
                      {!isEditing ? (
                        <>
                          <div className="taskHeaderRow">
                            <label className="taskCheck">
                              <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={() => handleToggleComplete(t)}
                              />
                            </label>

                            <div className="taskHeaderText">
                              <span className="titleText">{t.title}</span>
                              <span className="smallMuted">#{index + 1}</span>
                            </div>
                          </div>


                          <div className="descText">
                            {t.description ? t.description : <em>Sin descripción</em>}
                          </div>
                        </>
                      ) : (
                        <div className="grid">
                          <div className="field">
                            <label>Título</label>
                            <input
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                              placeholder="Título"
                              autoFocus
                            />
                          </div>

                          <div className="field">
                            <label>Descripción</label>
                            <textarea
                              value={editingDescription}
                              onChange={(e) => setEditingDescription(e.target.value)}
                              placeholder="Descripción"
                              rows={3}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="actions">
                      {!isEditing ? (
                        <>
                          <button type="button" onClick={() => {
                            console.log("CLICK EDITAR:", t)
                            startEdit(t)
                          }}>
                            Editar
                          </button>
                          <button
                            type="button"
                            className="btnDanger"
                            onClick={() => handleDelete(t.id)}
                          >
                            Eliminar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="btnPrimary"
                            onClick={() => handleSave(t.id)}
                            disabled={!editingTitle.trim()}
                          >
                            Guardar
                          </button>
                          <button type="button" onClick={cancelEdit}>
                            Cancelar
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="hr" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}