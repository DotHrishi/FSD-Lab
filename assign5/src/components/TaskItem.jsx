import React from 'react';

const TaskItem = ({ task, onDelete, onToggle }) => {
  const getPriorityColor = (p) => {
    switch(p) {
      case 'High': return 'var(--danger)';
      case 'Medium': return '#f59e0b';
      default: return 'var(--success)';
    }
  };

  return (
    <div className="glass animate-fade" style={{ 
      padding: '1.25rem', 
      marginBottom: '1rem', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      opacity: task.completed ? 0.6 : 1,
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <input 
          type="checkbox" 
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
        />
        <div>
          <h4 style={{ 
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'var(--text-dim)' : 'var(--text-main)',
            marginBottom: '0.25rem'
          }}>
            {task.title}
          </h4>
          <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem' }}>
            <span style={{ color: getPriorityColor(task.priority), fontWeight: '700' }}>
              ● {task.priority}
            </span>
            <span style={{ color: 'var(--text-dim)' }}>
              {task.category}
            </span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => onDelete(task.id)}
        style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          color: 'var(--danger)', 
          border: 'none', 
          padding: '0.5rem 0.75rem', 
          borderRadius: '0.5rem', 
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default TaskItem;
