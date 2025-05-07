import React, { useState, useEffect } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo } from './types';
import { todos } from './api';
import { auth } from './api';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();

  useEffect(() => {
    // Получаем токен из URL при загрузке приложения
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      // Очищаем URL от токена!
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.reload();
    }
  }, []);

  const handleLogin = () => {
    auth.login();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await todos.delete(id);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingTodo(undefined);
    window.location.reload();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTodo(undefined);
  };

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Выйти
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Войти через Google
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container>
        {isAuthenticated ? (
          <>
            {!showForm ? (
              <>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowForm(true)}
                  >
                    Новая задача
                  </Button>
                </Box>
                <TodoList onEdit={handleEdit} onDelete={handleDelete} />
              </>
            ) : (
              <TodoForm
                todo={editingTodo}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            )}
          </>
        ) : (
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Добро пожаловать в Todo App
            </Typography>
            <Typography variant="body1" gutterBottom>
              Войдите через Google, чтобы начать работу
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ mt: 2 }}
            >
              Войти через Google
            </Button>
          </Box>
        )}
      </Container>
    </div>
  );
}

export default App; 