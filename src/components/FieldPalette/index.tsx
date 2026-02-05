import React from 'react';
import { useDrag } from 'react-dnd';
import type { FieldType } from '../../types';
import { Paper, Typography, Box } from '@mui/material';
import * as Icons from '@mui/icons-material';

interface DraggableFieldProps {
    type: FieldType;
    label: string;
    iconName: string;
}

const DraggableField: React.FC<DraggableFieldProps> = ({ type, label, iconName }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'FIELD',
        item: { fieldType: type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const IconComponent = (Icons as any)[iconName] || Icons.Extension;

    return (
        <div ref={drag as any}>
            <Paper
                elevation={isDragging ? 3 : 0}
                className="cursor-move transition-all"
                sx={{
                    p: 2,
                    mb: 1.5,
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move',
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: isDragging ? 'primary.main' : 'divider',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        bgcolor: 'rgba(0, 122, 255, 0.04)',
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                        boxShadow: '0px 4px 12px rgba(0, 122, 255, 0.15)',
                    },
                }}
            >
                <Box display="flex" alignItems="center" gap={1.5}>
                    <IconComponent sx={{ color: 'primary.main', fontSize: 20 }} />
                    <Typography variant="body2" fontWeight={500} sx={{ color: 'text.primary' }}>
                        {label}
                    </Typography>
                </Box>
            </Paper>
        </div>
    );
};

const FieldPalette: React.FC = () => {
    const fieldTypes: { type: FieldType; label: string; icon: string }[] = [
        { type: 'text', label: 'Campo de Texto', icon: 'TextFields' },
        { type: 'textarea', label: 'Área de Texto', icon: 'Notes' },
        { type: 'select', label: 'Seleção', icon: 'ArrowDropDownCircle' },
        { type: 'multiselect', label: 'Seleção Múltipla', icon: 'Checklist' },
        { type: 'checkbox', label: 'Checkbox', icon: 'CheckBox' },
        { type: 'switch', label: 'Switch', icon: 'ToggleOn' },
        { type: 'radio', label: 'Radio Group', icon: 'RadioButtonChecked' },
        { type: 'file', label: 'Arquivo', icon: 'AttachFile' },
        { type: 'image', label: 'Imagem', icon: 'Image' },
        { type: 'date', label: 'Data', icon: 'CalendarToday' },
    ];

    return (
        <Box
            className="h-full overflow-y-auto"
            sx={{
                bgcolor: 'background.default',
                borderRight: '1px solid',
                borderColor: 'divider',
                p: 3,
                height: '100%',
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 1,
                    letterSpacing: '-0.02em',
                }}
            >
                Componentes
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: 'text.secondary',
                    mb: 3,
                    fontSize: '0.875rem',
                }}
            >
                Arraste os campos para o formulário
            </Typography>

            <Box>
                {fieldTypes.map((field) => (
                    <DraggableField
                        key={field.type}
                        type={field.type}
                        label={field.label}
                        iconName={field.icon}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default FieldPalette;
