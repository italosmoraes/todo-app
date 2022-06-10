import styled from 'styled-components'
import './App.css'
import useAuth, { AuthProvider } from './auth/AuthProvider'
import { TodoDashboard } from './components/Todo/TodoDashboard'
import { Welcome } from './components/User/Welcome/Welcome'

const PageContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
  align-items: center;
  justify-content: center;
  height: 100%:
`

function App() {
  const { isLoggedIn } = useAuth()

  return (
    <div className="App">
      <header className="App-header">
        <h3>It is time ToDo it</h3>
      </header>
      <PageContainer>
        {!isLoggedIn && <Welcome />} {isLoggedIn && <TodoDashboard />}
      </PageContainer>
    </div>
  )
}

export default App
