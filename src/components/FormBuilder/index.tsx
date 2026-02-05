import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MultiBackend, TouchTransition, MouseTransition } from 'react-dnd-multi-backend';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { Visibility, GetApp, ViewModule } from '@mui/icons-material';
import FieldPalette from '../FieldPalette';
import Canvas from '../Canvas';
import PropertiesPanel from '../PropertiesPanel';
import PreviewModal from '../PreviewModal';
import { useFormBuilder } from '../../context/FormBuilderContext';

// Custom backend configuration for multi-device support
const HTML5toTouch = {
    backends: [
        {
            id: 'html5',
            backend: HTML5Backend,
            transition: MouseTransition,
        },
        {
            id: 'touch',
            backend: TouchBackend,
            options: { enableMouseEvents: true },
            preview: true,
            transition: TouchTransition,
        },
    ],
};

const FormBuilder: React.FC = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
    const { fields } = useFormBuilder();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    // Listen for custom event to open properties drawer
    React.useEffect(() => {
        const handleOpenDrawer = () => {
            setRightDrawerOpen(true);
        };
        window.addEventListener('openPropertiesDrawer', handleOpenDrawer);
        return () => {
            window.removeEventListener('openPropertiesDrawer', handleOpenDrawer);
        };
    }, []);

    const handleExport = () => {
        const dataStr = JSON.stringify(fields, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'formulario.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    return (
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <Box className="h-screen flex flex-col" sx={{ bgcolor: 'background.default' }}>
                {/* Header - Apple Style */}
                <AppBar
                    position="static"
                    elevation={0}
                    sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(20px)',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        color: 'text.primary',
                        borderRadius: 0,
                    }}
                >
                    <Toolbar sx={{ py: 1.5, minHeight: { xs: 56, sm: 64 } }}>
                        {/* Mobile: Menu buttons */}
                        {isMobile && (
                            <>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={() => setLeftDrawerOpen(true)}
                                    sx={{ mr: 1 }}
                                >
                                    <ViewModule />
                                </IconButton>
                            </>
                        )}

                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 600,
                                letterSpacing: '-0.02em',
                                fontSize: { xs: '1rem', sm: '1.25rem' },
                            }}
                        >
                            Form Builder
                        </Typography>

                        <Box display="flex" gap={1.5} alignItems="center">
                            <Button
                                variant="contained"
                                startIcon={!isMobile && <Visibility />}
                                onClick={() => setPreviewOpen(true)}
                                disabled={fields.length === 0}
                                size={isMobile ? 'small' : 'medium'}
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    fontWeight: 500,
                                    px: { xs: 2, sm: 3 },
                                    minWidth: { xs: 'auto', sm: 'auto' },
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    },
                                }}
                            >
                                {isMobile ? <Visibility /> : 'Visualizar'}
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={!isMobile && <GetApp />}
                                onClick={handleExport}
                                disabled={fields.length === 0}
                                size={isMobile ? 'small' : 'medium'}
                                sx={{
                                    borderColor: 'divider',
                                    color: 'text.primary',
                                    fontWeight: 500,
                                    px: { xs: 2, sm: 3 },
                                    minWidth: { xs: 'auto', sm: 'auto' },
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        bgcolor: 'rgba(0, 122, 255, 0.04)',
                                    },
                                }}
                            >
                                {isMobile ? <GetApp /> : 'Exportar'}
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Main Content */}
                <Box className="flex-1 flex overflow-hidden">
                    {/* Desktop: Left Panel - Field Palette */}
                    {!isMobile && (
                        <Box
                            sx={{
                                width: isTablet ? '30%' : '25%',
                                minWidth: '250px',
                                display: { xs: 'none', md: 'block' },
                            }}
                        >
                            <FieldPalette />
                        </Box>
                    )}

                    {/* Mobile: Left Drawer - Field Palette */}
                    {isMobile && (
                        <Drawer
                            anchor="left"
                            open={leftDrawerOpen}
                            onClose={() => setLeftDrawerOpen(false)}
                            PaperProps={{
                                sx: {
                                    width: { xs: '85%', sm: '350px' },
                                    maxWidth: '400px',
                                    borderRadius: '0 16px 16px 0',
                                },
                            }}
                        >
                            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Componentes
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1, overflow: 'auto' }}>
                                    <FieldPalette />
                                </Box>
                            </Box>
                        </Drawer>
                    )}

                    {/* Center Panel - Canvas */}
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: { xs: '100%', md: isTablet ? '40%' : '400px' },
                        }}
                    >
                        <Canvas />
                    </Box>

                    {/* Desktop: Right Panel - Properties */}
                    {!isMobile && (
                        <Box
                            sx={{
                                width: isTablet ? '30%' : '25%',
                                minWidth: '250px',
                                display: { xs: 'none', md: 'block' },
                            }}
                        >
                            <PropertiesPanel />
                        </Box>
                    )}

                    {/* Mobile: Right Drawer - Properties */}
                    {isMobile && (
                        <Drawer
                            anchor="right"
                            open={rightDrawerOpen}
                            onClose={() => setRightDrawerOpen(false)}
                            PaperProps={{
                                sx: {
                                    width: { xs: '85%', sm: '350px' },
                                    maxWidth: '400px',
                                    borderRadius: '16px 0 0 16px',
                                },
                            }}
                        >
                            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Propriedades
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1, overflow: 'auto', height: '100%' }}>
                                    <PropertiesPanel />
                                </Box>
                            </Box>
                        </Drawer>
                    )}
                </Box>

                {/* Preview Modal */}
                <PreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} />
            </Box>
        </DndProvider>
    );
};

export default FormBuilder;
