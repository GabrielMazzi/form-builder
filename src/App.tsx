import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { FormBuilderProvider } from './context/FormBuilderContext';
import FormBuilder from './components/FormBuilder';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormBuilderProvider>
        <FormBuilder />
      </FormBuilderProvider>
    </ThemeProvider>
  );
}

export default App;
