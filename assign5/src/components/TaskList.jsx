import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDelete, onToggle }) => {
  if (tasks.length === 0) {
    return (
      <div className="glass animate-fade" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>
        <p>No tasks found. Add a new assignment to get started.</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onDelete={onDelete} 
          onToggle={onToggle} 
        />
      ))}
    </div>
  );
};

export default TaskList;
