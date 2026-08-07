import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Board from './pages/Board'
import Analytics from './pages/Analytics'
import Team from './pages/Team'
import AIAssistant from './pages/AIAssistant'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/board" element={<Board />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/team" element={<Team />} />
        <Route path="/ai" element={<AIAssistant />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}