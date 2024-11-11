import { pool } from "../helper/db.js"

const selectAllTasks = async () => {
    return await pool.query('SELECT * FROM TASK')
}

const insertTask = async(description) => {
    return await pool.query('INSERT INTO task (description) VALUES ($1) returning *',[description])
}

const deleteTask = async (id) => {
    return await pool.query('DELETE FROM task WHERE id = $1',[id])
}
export { selectAllTasks, insertTask, deleteTask }
