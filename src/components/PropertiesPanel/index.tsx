import React, { useState, useEffect } from 'react';
import { useFormBuilder } from '../../context/FormBuilderContext';
import type { SelectOption } from '../../types';
import {
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    IconButton,
    Paper,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import { Add, Delete, ExpandMore, Code } from '@mui/icons-material';
import Editor from '@monaco-editor/react';

const PropertiesPanel: React.FC = () => {
    const { getSelectedField, updateField } = useFormBuilder();
    const selectedField = getSelectedField();

    const [localField, setLocalField] = useState(selectedField);
    const [showCodeEditor, setShowCodeEditor] = useState(false);

    useEffect(() => {
        setLocalField(selectedField);
    }, [selectedField]);

    if (!selectedField || !localField) {
        return (
            <Box className="h-full bg-gray-50 p-4 border-l border-gray-200">
                <Typography variant="h6" gutterBottom fontWeight={600} color="text.secondary">
                    Propriedades
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Selecione um campo no formulário para editar suas propriedades
                </Typography>
            </Box>
        );
    }

    const handleUpdate = (updates: any) => {
        const newField = { ...localField, ...updates };
        setLocalField(newField);
        updateField(selectedField.id, updates);
    };

    const handleAddOption = () => {
        const newOptions = [
            ...(localField.options || []),
            { label: `Opção ${(localField.options?.length || 0) + 1}`, value: `option${Date.now()}` },
        ];
        handleUpdate({ options: newOptions });
    };

    const handleUpdateOption = (index: number, field: keyof SelectOption, value: string) => {
        const newOptions = [...(localField.options || [])];
        newOptions[index] = { ...newOptions[index], [field]: value };
        handleUpdate({ options: newOptions });
    };

    const handleDeleteOption = (index: number) => {
        const newOptions = localField.options?.filter((_, i) => i !== index);
        handleUpdate({ options: newOptions });
    };

    const needsOptions = ['select', 'multiselect', 'radio'].includes(localField.type);

    return (
        <Box className="h-full bg-gray-50 p-4 overflow-y-auto border-l border-gray-200">
            <Typography variant="h6" gutterBottom fontWeight={600} color="primary">
                Propriedades
            </Typography>

            <Box mt={3} display="flex" flexDirection="column" gap={2}>
                {/* Basic Properties */}
                <TextField
                    fullWidth
                    label="Label"
                    value={localField.label}
                    onChange={(e) => handleUpdate({ label: e.target.value })}
                    size="small"
                />

                <TextField
                    fullWidth
                    label="Nome"
                    value={localField.name}
                    onChange={(e) => handleUpdate({ name: e.target.value })}
                    size="small"
                />

                <TextField
                    fullWidth
                    label="Placeholder"
                    value={localField.placeholder || ''}
                    onChange={(e) => handleUpdate({ placeholder: e.target.value })}
                    size="small"
                />

                <TextField
                    fullWidth
                    label="Texto de Ajuda"
                    value={localField.helperText || ''}
                    onChange={(e) => handleUpdate({ helperText: e.target.value })}
                    size="small"
                    multiline
                    rows={2}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={localField.required || false}
                            onChange={(e) => handleUpdate({ required: e.target.checked })}
                        />
                    }
                    label="Obrigatório"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={localField.disabled || false}
                            onChange={(e) => handleUpdate({ disabled: e.target.checked })}
                        />
                    }
                    label="Desabilitado"
                />

                <Divider sx={{ my: 1 }} />

                {/* Options for Select/Radio */}
                {needsOptions && (
                    <Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Opções
                            </Typography>
                            <IconButton size="small" color="primary" onClick={handleAddOption}>
                                <Add />
                            </IconButton>
                        </Box>

                        {localField.options?.map((option, index) => (
                            <Paper key={index} elevation={0} sx={{ p: 1.5, mb: 1, backgroundColor: 'white' }}>
                                <Box display="flex" gap={1} alignItems="start">
                                    <Box flex={1}>
                                        <TextField
                                            fullWidth
                                            label="Label"
                                            value={option.label}
                                            onChange={(e) => handleUpdateOption(index, 'label', e.target.value)}
                                            size="small"
                                            sx={{ mb: 1 }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Valor"
                                            value={option.value}
                                            onChange={(e) => handleUpdateOption(index, 'value', e.target.value)}
                                            size="small"
                                        />
                                    </Box>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => handleDeleteOption(index)}
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                )}

                <Divider sx={{ my: 1 }} />

                {/* Display Condition */}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Code fontSize="small" />
                            <Typography variant="subtitle2">Condição de Exibição</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                            Escreva código JavaScript que retorna true/false para controlar quando este campo
                            deve ser exibido.
                        </Typography>

                        {!showCodeEditor ? (
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<Code />}
                                onClick={() => setShowCodeEditor(true)}
                            >
                                {localField.displayCondition ? 'Editar Código' : 'Adicionar Condição'}
                            </Button>
                        ) : (
                            <Box>
                                <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
                                    <Editor
                                        height="150px"
                                        defaultLanguage="javascript"
                                        value={localField.displayCondition || '// return true;'}
                                        onChange={(value) => handleUpdate({ displayCondition: value })}
                                        theme="vs-light"
                                        options={{
                                            minimap: { enabled: false },
                                            fontSize: 12,
                                            lineNumbers: 'off',
                                            scrollBeyondLastLine: false,
                                        }}
                                    />
                                </Box>
                                <Button
                                    size="small"
                                    onClick={() => setShowCodeEditor(false)}
                                    sx={{ mt: 1 }}
                                >
                                    Fechar Editor
                                </Button>
                            </Box>
                        )}
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
};

export default PropertiesPanel;
