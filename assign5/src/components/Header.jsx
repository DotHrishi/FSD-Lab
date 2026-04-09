import React from 'react';

const Header = ({ taskCount }) => {
  return (
    <header className="animate-fade" style={{ marginBottom: '3rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.5rem', fontWeight: '800', letterSpacing: '-0.05em', marginBottom: '0.5rem' }}>
        Luxe<span style={{ color: 'var(--secondary)' }}>Task</span>
      </h1>
      <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>
        You have <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{taskCount}</span> active assignments
      </p>
    </header>
  );
};

export default Header;
