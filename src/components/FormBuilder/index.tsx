import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Visibility, GetApp } from '@mui/icons-material';
import FieldPalette from '../FieldPalette';
import Canvas from '../Canvas';
import PropertiesPanel from '../PropertiesPanel';
import PreviewModal from '../PreviewModal';
import { useFormBuilder } from '../../context/FormBuilderContext';

const FormBuilder: React.FC = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const { fields } = useFormBuilder();

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
        <DndProvider backend={HTML5Backend}>
            <Box className="h-screen flex flex-col" sx={{ bgcolor: 'background.default' }}>
                {/* Header */}
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
                    <Toolbar sx={{ py: 1.5 }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 600,
                                letterSpacing: '-0.02em',
                                fontSize: '1.25rem',
                            }}
                        >
                            Form Builder
                        </Typography>

                        <Box display="flex" gap={1.5}>
                            <Button
                                variant="contained"
                                startIcon={<Visibility />}
                                onClick={() => setPreviewOpen(true)}
                                disabled={fields.length === 0}
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    fontWeight: 500,
                                    px: 3,
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    },
                                }}
                            >
                                Visualizar
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<GetApp />}
                                onClick={handleExport}
                                disabled={fields.length === 0}
                                sx={{
                                    borderColor: 'divider',
                                    color: 'text.primary',
                                    fontWeight: 500,
                                    px: 3,
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        bgcolor: 'rgba(0, 122, 255, 0.04)',
                                    },
                                }}
                            >
                                Exportar
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Main Content */}
                <Box className="flex-1 flex overflow-hidden">
                    {/* Left Panel - Field Palette (1/4) */}
                    <Box sx={{ width: '25%', minWidth: '250px' }}>
                        <FieldPalette />
                    </Box>

                    {/* Center Panel - Canvas (1/2) */}
                    <Box sx={{ width: '50%', minWidth: '400px' }}>
                        <Canvas />
                    </Box>

                    {/* Right Panel - Properties (1/4) */}
                    <Box sx={{ width: '25%', minWidth: '250px' }}>
                        <PropertiesPanel />
                    </Box>
                </Box>

                {/* Preview Modal */}
                <PreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} />
            </Box>
        </DndProvider>
    );
};

export default FormBuilder;
