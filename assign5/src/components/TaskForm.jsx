import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'Low',
    category: 'General'
  });
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.title.trim()) {
      tempErrors.title = "Task title is required";
    } else if (formData.title.length < 3) {
      tempErrors.title = "Title must be at least 3 characters";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAddTask({
        ...formData,
        id: Date.now(),
        completed: false
      });
      setFormData({ title: '', priority: 'Low', category: 'General' });
      setErrors({});
    }
  };

  return (
    <div className="glass animate-fade" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Add Strategy Task</h3>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>Task Title</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Implement React Hooks"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>Priority</label>
            <select
              className="input-field"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>Category</label>
            <select
              className="input-field"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="General">General</option>
              <option value="FSD-Lab">FSD-Lab</option>
              <option value="Project">Project</option>
              <option value="Revision">Revision</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
          Assign to Dashboard
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
