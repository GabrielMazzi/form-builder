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
            elevation={0}
            onClick={() => selectField(field.id)}
            sx={{
                p: 2.5,
                mb: 2,
                cursor: 'pointer',
                opacity: isDragging ? 0.5 : 1,
                border: '1px solid',
                borderColor: isSelected ? 'primary.main' : 'divider',
                bgcolor: 'background.paper',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'rgba(0, 122, 255, 0.02)',
                    transform: 'translateY(-1px)',
                    boxShadow: isSelected ? '0px 6px 16px rgba(0, 122, 255, 0.25)' : '0px 4px 12px rgba(0, 0, 0, 0.08)',
                },
                ...(isSelected && {
                    boxShadow: '0px 4px 12px rgba(0, 122, 255, 0.25)',
                }),
            }}
        >
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1.5} flex={1}>
                    <DragIndicator sx={{ cursor: 'move', color: 'text.secondary', fontSize: 20 }} />
                    <Box flex={1}>
                        <Typography variant="body1" fontWeight={500} sx={{ color: 'text.primary' }}>
                            {field.label}
                        </Typography>
                        <Box display="flex" gap={1} mt={0.5}>
                            <Chip
                                label={field.type}
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(0, 122, 255, 0.08)',
                                    color: 'primary.main',
                                    fontWeight: 500,
                                    fontSize: '0.75rem',
                                    height: 24,
                                }}
                            />
                            {field.required && (
                                <Chip
                                    label="Obrigatório"
                                    size="small"
                                    sx={{
                                        bgcolor: 'rgba(255, 59, 48, 0.08)',
                                        color: 'error.main',
                                        fontWeight: 500,
                                        fontSize: '0.75rem',
                                        height: 24,
                                    }}
                                />
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
                        sx={{
                            color: 'text.secondary',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                color: 'primary.main',
                                bgcolor: 'rgba(0, 122, 255, 0.08)',
                            },
                        }}
                    >
                        <ContentCopy fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteField(field.id);
                        }}
                        title="Excluir"
                        sx={{
                            color: 'text.secondary',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                color: 'error.main',
                                bgcolor: 'rgba(255, 59, 48, 0.08)',
                            },
                        }}
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
                className="h-full overflow-y-auto"
                sx={{
                    bgcolor: isOver ? 'rgba(0, 122, 255, 0.02)' : 'background.paper',
                    transition: 'background-color 0.2s',
                    minHeight: '500px',
                    p: 4,
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        letterSpacing: '-0.02em',
                        mb: 3,
                    }}
                >
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
                            borderRadius: 3,
                            p: 6,
                            mt: 4,
                            bgcolor: isOver ? 'rgba(0, 122, 255, 0.02)' : 'transparent',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                textAlign: 'center',
                                fontSize: '0.95rem',
                            }}
                        >
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
