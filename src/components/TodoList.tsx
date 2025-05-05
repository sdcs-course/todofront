import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Todo } from '../types';
import { todos } from '../api';

interface TodoListProps {
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ onEdit, onDelete }) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todos.getAll();
      setTodoList(data);
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      const updatedTodo = await todos.update(todo._id, {
        completed: !todo.completed,
      });
      setTodoList(todoList.map((t) =>
        t._id === updatedTodo._id ? updatedTodo : t
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 600, mx: 'auto', mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Список задач
      </Typography>
      <List>
        {todoList.map((todo) => (
          <ListItem
            key={todo._id}
            divider
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              opacity: todo.completed ? 0.7 : 1,
            }}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
              color="primary"
            />
            <ListItemText
              primary={todo.title}
              secondary={todo.description}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => onEdit(todo)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(todo._id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 