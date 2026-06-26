import { useState } from 'react'

const FILTERS = ['All', 'Active', 'Done']

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Deploy this app to Vercel', done: false },
    { id: 2, text: 'Try deploying to Netlify too', done: false },
    { id: 3, text: 'Set up a custom domain', done: false },
  ])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('All')

  const addTask = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setTasks(prev => [...prev, { id: Date.now(), text: trimmed, done: false }])
    setInput('')
  }

  const toggleTask = id =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))

  const deleteTask = id =>
    setTasks(prev => prev.filter(t => t.id !== id))

  const filtered = tasks.filter(t =>
    filter === 'All' ? true : filter === 'Done' ? t.done : !t.done
  )

  const doneCount = tasks.filter(t => t.done).length

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Task Manager</h1>
        <p style={styles.sub}>{doneCount} of {tasks.length} tasks completed</p>

        <div style={styles.inputRow}>
          <input
            style={styles.input}
            placeholder="Add a new task..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
          />
          <button style={styles.addBtn} onClick={addTask}>Add</button>
        </div>

        <div style={styles.filters}>
          {FILTERS.map(f => (
            <button
              key={f}
              style={{ ...styles.filterBtn, ...(filter === f ? styles.activeFilter : {}) }}
              onClick={() => setFilter(f)}
            >{f}</button>
          ))}
        </div>

        <ul style={styles.list}>
          {filtered.length === 0 && (
            <li style={styles.empty}>No tasks here.</li>
          )}
          {filtered.map(task => (
            <li key={task.id} style={styles.item}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                style={styles.checkbox}
              />
              <span style={{ ...styles.taskText, ...(task.done ? styles.done : {}) }}>
                {task.text}
              </span>
              <button style={styles.deleteBtn} onClick={() => deleteTask(task.id)}>✕</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f0f4ff',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '60px',
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    padding: '36px',
    width: '100%',
    maxWidth: '480px',
  },
  title: { margin: 0, fontSize: '1.8rem', color: '#1a1a2e', fontWeight: 700 },
  sub: { color: '#888', marginTop: '4px', marginBottom: '24px', fontSize: '0.9rem' },
  inputRow: { display: 'flex', gap: '8px', marginBottom: '16px' },
  input: {
    flex: 1, padding: '10px 14px', borderRadius: '8px',
    border: '1.5px solid #dde3f0', fontSize: '0.95rem', outline: 'none',
  },
  addBtn: {
    padding: '10px 18px', background: '#4f46e5', color: '#fff',
    border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600,
  },
  filters: { display: 'flex', gap: '8px', marginBottom: '20px' },
  filterBtn: {
    padding: '6px 16px', border: '1.5px solid #dde3f0', borderRadius: '20px',
    background: 'transparent', cursor: 'pointer', fontSize: '0.85rem', color: '#555',
  },
  activeFilter: {
    background: '#4f46e5', color: '#fff', borderColor: '#4f46e5',
  },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  empty: { color: '#aaa', textAlign: 'center', padding: '20px 0' },
  item: {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '12px 0', borderBottom: '1px solid #f0f0f0',
  },
  checkbox: { width: '18px', height: '18px', cursor: 'pointer', accentColor: '#4f46e5' },
  taskText: { flex: 1, fontSize: '0.95rem', color: '#333' },
  done: { textDecoration: 'line-through', color: '#aaa' },
  deleteBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#ccc', fontSize: '0.9rem', padding: '4px',
  },
}
