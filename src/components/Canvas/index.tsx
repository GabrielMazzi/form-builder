import React, { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useFormBuilder } from '../../context/FormBuilderContext';
import type { FormField } from '../../types';
import { Paper, IconButton, Box, Typography, Chip } from '@mui/material';
import { Delete, ContentCopy, DragIndicator } from '@mui/icons-material';

interface DraggableFormFieldProps {
    field: FormField;
    index: number;
}

const DraggableFormField: React.FC<DraggableFormFieldProps> = ({ field, index }) => {
    const { selectField, selectedFieldId, deleteField, duplicateField, moveField } =
        useFormBuilder();
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'FORM_FIELD',
        item: { id: field.id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'FORM_FIELD',
        hover: (item: { id: string; index: number }) => {
            if (item.index !== index) {
                moveField(item.index, index);
                item.index = index;
            }
        },
    });

    drag(drop(ref));

    const isSelected = selectedFieldId === field.id;

    return (
        <Paper
            ref={ref}
            elevation={isSelected ? 3 : 1}
            onClick={() => selectField(field.id)}
            sx={{
                p: 2,
                mb: 2,
                cursor: 'pointer',
                opacity: isDragging ? 0.5 : 1,
                border: isSelected ? 2 : 1,
                borderColor: isSelected ? 'primary.main' : 'divider',
                '&:hover': {
                    backgroundColor: 'action.hover',
                },
            }}
        >
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1} flex={1}>
                    <DragIndicator sx={{ cursor: 'move', color: 'text.secondary' }} />
                    <Box flex={1}>
                        <Typography variant="body1" fontWeight={500}>
                            {field.label}
                        </Typography>
                        <Box display="flex" gap={1} mt={0.5}>
                            <Chip label={field.type} size="small" color="primary" variant="outlined" />
                            {field.required && (
                                <Chip label="Obrigatório" size="small" color="error" variant="outlined" />
                            )}
                        </Box>
                    </Box>
                </Box>

                <Box display="flex" gap={0.5}>
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            duplicateField(field.id);
                        }}
                        title="Duplicar"
                    >
                        <ContentCopy fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteField(field.id);
                        }}
                        color="error"
                        title="Excluir"
                    >
                        <Delete fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
};

const Canvas: React.FC = () => {
    const { fields, addField } = useFormBuilder();

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'FIELD',
        drop: (item: { fieldType: any }) => {
            addField(item.fieldType);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }), [addField]);

    return (
        <div ref={drop as any} className="h-full">
            <Box
                className="h-full bg-white p-6 overflow-y-auto"
                sx={{
                    backgroundColor: isOver ? 'action.hover' : 'background.paper',
                    transition: 'background-color 0.2s',
                    minHeight: '500px',
                }}
            >
                <Typography variant="h5" gutterBottom fontWeight={600} color="primary">
                    Construtor de Formulário
                </Typography>

                {fields.length === 0 ? (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            border: '2px dashed',
                            borderColor: isOver ? 'primary.main' : 'divider',
                            borderRadius: 2,
                            p: 6,
                            mt: 4,
                            backgroundColor: isOver ? 'action.hover' : 'transparent',
                        }}
                    >
                        <Typography variant="body1" color="text.secondary" textAlign="center">
                            Arraste campos da paleta para começar a construir seu formulário
                        </Typography>
                    </Box>
                ) : (
                    <Box mt={3}>
                        {fields.map((field, index) => (
                            <DraggableFormField key={field.id} field={field} index={index} />
                        ))}
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default Canvas;
