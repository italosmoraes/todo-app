import styled from 'styled-components'
import { AddTodo } from './AddTodo'
import { TodoList } from './TodoList'

type Props = {}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 10px;
`

export const TodoDashboard = ({}: Props) => {
  return (
    <DashboardContainer>
      <h3>DASHBOARD</h3>
      <AddTodo />
      <TodoList />
    </DashboardContainer>
  )
}
