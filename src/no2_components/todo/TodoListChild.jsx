// TodoListChild.jsx

import React, { useState } from 'react'
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline
} from "react-icons/md"
import styled from 'styled-components'

import {
  usePutUpdateTodo,
  usePutToggleTodo,
  useDeleteTodo
} from '../../no3_store/hooks/useTodo'

const TodoListChild = ({ item }) => {
  const toggleMutation = usePutToggleTodo()
  const updateMutation = usePutUpdateTodo()
  const deleteMutation = useDeleteTodo()

  const [editing, setEditing] = useState(false)
  const [todo, setTodo] = useState(item)

  const handleToggle = async () => {
    const updateTodo = {
      ...todo,
      checked: !todo.checked
    }

    try {
      await toggleMutation.mutateAsync(updateTodo)

      setTodo(updateTodo)
    } catch (error) {
      console.log(error)
      alert("토글 실패")
    }
  }

  const handleUpdate = async () => {
    try {
      await updateMutation.mutateAsync(todo)

      setEditing(false)
      alert("수정 성공")
    } catch (error) {
      console.log(error)
      alert("수정 실패")
    }
  }

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(item.id)
    } catch (error) {
      console.log(error)
      alert("삭제 실패")
    }
  }

  return (
    <Container>
      <CheckBoxArea onClick={handleToggle}>
        {todo.checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
      </CheckBoxArea>

      <ContentArea>
        {editing ? (
          <EditInput
            type="text"
            name="subject"
            value={todo.subject}
            onChange={(e) =>
              setTodo(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }))
            }
            onBlur={handleUpdate}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.target.blur()
              }
            }}
            autoFocus
          />
        ) : (
          <Checked
            $checked={todo.checked}
            onDoubleClick={() => setEditing(true)}
          >
            {todo.subject}
          </Checked>
        )}
      </ContentArea>

      <DeleteButton onClick={handleDelete}>
        <MdRemoveCircleOutline />
      </DeleteButton>
    </Container>
  )
}

export default TodoListChild