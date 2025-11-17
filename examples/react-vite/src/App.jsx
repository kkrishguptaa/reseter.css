import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header>
        <h1>Gardevoir + React + Vite</h1>
        <p>CSS Reset Integration Example</p>
      </header>
      
      <main>
        <section className="demo-section">
          <h2>Typography Demo</h2>
          <p>This is a paragraph demonstrating Gardevoir's reset styles.</p>
          <blockquote>
            Gardevoir provides a consistent baseline across all browsers.
          </blockquote>
          
          <h3>Lists</h3>
          <ul>
            <li>Consistent margins</li>
            <li>Predictable spacing</li>
            <li>Better box-sizing</li>
          </ul>
        </section>

        <section className="demo-section">
          <h2>Interactive Elements</h2>
          <button onClick={() => setCount(count + 1)}>
            Count: {count}
          </button>
          
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name" />
            
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="your@email.com" />
            
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>
      
      <footer>
        <p>
          Check <code>src/main.jsx</code> to see how Gardevoir is imported 
          before custom styles.
        </p>
      </footer>
    </div>
  )
}

export default App
