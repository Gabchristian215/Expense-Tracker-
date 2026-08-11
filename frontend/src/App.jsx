import Box from './components/Box.jsx'
import './App.css'

function App() {
  return (
    <main className="dashboard">
      <h1 className="dashboard__title">Expense Tracker</h1>
      <div className="dashboard__boxes">
        <Box header="Expense" />
        <Box header="Salary" />
      </div>
    </main>
  )
}

export default App
