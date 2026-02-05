import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { FormBuilderProvider } from './context/FormBuilderContext';
import FormBuilder from './components/FormBuilder';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007AFF',
      light: '#5AC8FA',
      dark: '#0051D5',
    },
    secondary: {
      main: '#FF9500',
      light: '#FFCC00',
      dark: '#FF6B00',
    },
    background: {
      default: '#F5F5F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1D1D1F',
      secondary: '#6E6E73',
    },
    divider: '#D2D2D7',
    error: {
      main: '#FF3B30',
    },
    success: {
      main: '#34C759',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(0, 0, 0, 0.08)',
    '0px 4px 12px rgba(0, 0, 0, 0.1)',
    '0px 8px 24px rgba(0, 0, 0, 0.12)',
    '0px 12px 32px rgba(0, 0, 0, 0.14)',
    '0px 16px 40px rgba(0, 0, 0, 0.16)',
    '0px 20px 48px rgba(0, 0, 0, 0.18)',
    '0px 24px 56px rgba(0, 0, 0, 0.20)',
    '0px 28px 64px rgba(0, 0, 0, 0.22)',
    '0px 32px 72px rgba(0, 0, 0, 0.24)',
    '0px 36px 80px rgba(0, 0, 0, 0.26)',
    '0px 40px 88px rgba(0, 0, 0, 0.28)',
    '0px 44px 96px rgba(0, 0, 0, 0.30)',
    '0px 48px 104px rgba(0, 0, 0, 0.32)',
    '0px 52px 112px rgba(0, 0, 0, 0.34)',
    '0px 56px 120px rgba(0, 0, 0, 0.36)',
    '0px 60px 128px rgba(0, 0, 0, 0.38)',
    '0px 64px 136px rgba(0, 0, 0, 0.40)',
    '0px 68px 144px rgba(0, 0, 0, 0.42)',
    '0px 72px 152px rgba(0, 0, 0, 0.44)',
    '0px 76px 160px rgba(0, 0, 0, 0.46)',
    '0px 80px 168px rgba(0, 0, 0, 0.48)',
    '0px 84px 176px rgba(0, 0, 0, 0.50)',
    '0px 88px 184px rgba(0, 0, 0, 0.52)',
    '0px 92px 192px rgba(0, 0, 0, 0.54)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: '0px 2px 8px rgba(0, 122, 255, 0.25)',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 122, 255, 0.35)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.2s ease',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#007AFF',
              },
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
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
