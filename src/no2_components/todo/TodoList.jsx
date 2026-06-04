// TodoList.jsx

import React, { useEffect } from 'react'
import TodoListChild from './TodoListChild'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { todoAllGetSlice } from '../../no3_store/slices/todoSlice';
import { useAllGetTodo } from '../../no3_store/hooks/useTodo';
// import { TodoContext } from '../../no0_context/TodoContext'

const TodoList = () => {
  const {data: todoList=[], isLoading, error} = useAllGetTodo()
  if(isLoading) return <h3>loading...</h3>
  if(error) return <h3>{error.message}</h3>
  return (
    <Container>
      {
        todoList.length>0 && todoList.map(item => (
          <TodoListChild
            key={item.id}
            item={item}
          />
        ))
      }
    </Container>
  )
}

export default TodoList

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 14px;
`