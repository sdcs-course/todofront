import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
} from '@mui/material';
import { Todo } from '../types';
import { todos } from '../api';

interface TodoFormProps {
  todo?: Todo;
  onSubmit: () => void;
  onCancel: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  todo,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
    }
  }, [todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (todo) {
        await todos.update(todo._id, { title, description });
      } else {
        await todos.create({ title, description });
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 600, mx: 'auto', mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {todo ? 'Редактировать задачу' : 'Новая задача'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!title}
          >
            {todo ? 'Сохранить' : 'Создать'}
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            Отмена
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}; 