import styled from 'styled-components'
import './App.css'
import { Welcome } from './components/User/Welcome/Welcome'

const PageContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
  align-items: center;
  justify-content: center;
  height: 100%:
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>It is time ToDo it</h3>
      </header>
      <PageContainer>
        <Welcome />
      </PageContainer>
    </div>
  )
}

export default App
