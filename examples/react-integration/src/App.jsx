import React from 'react';
// Import Gardevoir CSS Reset first
import 'gardevoir';
// Then import custom styles
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Gardevoir + React Integration</h1>
        <p className="subtitle">Modern CSS Reset working perfectly with React</p>
      </header>

      <main className="app-main">
        <section className="demo-section">
          <h2>Typography Demo</h2>
          <p>This paragraph demonstrates how Gardevoir normalizes text rendering across browsers while maintaining readability.</p>
          <ul>
            <li>List items have consistent spacing</li>
            <li>Cross-browser normalization applied</li>
            <li>No unexpected margins or padding</li>
          </ul>
        </section>

        <section className="demo-section">
          <h2>Form Elements</h2>
          <form className="demo-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" rows="4" placeholder="Enter your message"></textarea>
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </section>

        <section className="demo-section">
          <h2>Interactive Elements</h2>
          <div className="button-group">
            <button className="btn btn-primary">Primary Button</button>
            <button className="btn btn-secondary">Secondary Button</button>
            <button className="btn btn-outline">Outline Button</button>
          </div>
        </section>

        <section className="demo-section">
          <h2>Layout Elements</h2>
          <div className="card-grid">
            <div className="card">
              <h3>Card Title 1</h3>
              <p>Card content with consistent spacing and typography thanks to Gardevoir's normalization.</p>
            </div>
            <div className="card">
              <h3>Card Title 2</h3>
              <p>Another card showing how the reset maintains consistency across different elements.</p>
            </div>
            <div className="card">
              <h3>Card Title 3</h3>
              <p>Third card demonstrating reliable cross-browser rendering.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with React + Gardevoir CSS Reset</p>
        <p>Gardevoir provides consistent styling across all browsers</p>
      </footer>
    </div>
  );
}

export default App;