import { AppBar, Container, Typography } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CreateUser } from './components/createUser/CreateUser.tsx';
import Styles from './App.module.css';

const queryClient = new QueryClient();

function App() {
  const { appBar } = Styles;

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <AppBar position="static" sx={{ mb: 4 }}>
          <Container maxWidth="md" className={appBar}>
            <Typography variant="h6" component="div">
              User Management
            </Typography>
            <CreateUser />
          </Container>
        </AppBar>
      </>
    </QueryClientProvider>
  );
}

export default App;
