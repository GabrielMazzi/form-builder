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
            <Box className="h-screen flex flex-col">
                {/* Header */}
                <AppBar position="static" elevation={1}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                            Form Builder
                        </Typography>

                        <Box display="flex" gap={1}>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<Visibility />}
                                onClick={() => setPreviewOpen(true)}
                                disabled={fields.length === 0}
                            >
                                Visualizar
                            </Button>
                            <Button
                                variant="outlined"
                                color="inherit"
                                startIcon={<GetApp />}
                                onClick={handleExport}
                                disabled={fields.length === 0}
                            >
                                Exportar
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Main Content */}
                <Box className="flex-1 flex overflow-hidden">
                    {/* Left Panel - Field Palette (1/4) */}
                    <Box sx={{ width: '25%', minWidth: '250px', maxWidth: '350px' }}>
                        <FieldPalette />
                    </Box>

                    {/* Center Panel - Canvas (1/2) */}
                    <Box sx={{ width: '50%', minWidth: '400px' }}>
                        <Canvas />
                    </Box>

                    {/* Right Panel - Properties (1/4) */}
                    <Box sx={{ width: '25%', minWidth: '250px', maxWidth: '350px' }}>
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
