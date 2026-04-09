import React, { useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Study React Component Lifecycle', priority: 'High', category: 'FSD-Lab', completed: false },
    { id: 2, title: 'Review JavaScript ES6 Features', priority: 'Medium', category: 'General', completed: true }
  ]);

  const addTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  return (
    <div className="app-container">
      <Header taskCount={tasks.filter(t => !t.completed).length} />
      
      <main>
        <TaskForm onAddTask={addTask} />
        
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1.25rem' }}>
          Active Roadmap
        </h3>
        
        <TaskList 
          tasks={tasks} 
          onDelete={deleteTask} 
          onToggle={toggleTask} 
        />
      </main>
      
      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
        Built with React & Vite • Assignment 5
      </footer>
    </div>
  );
}

export default App;
