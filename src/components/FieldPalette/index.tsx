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
                elevation={isDragging ? 4 : 1}
                className="cursor-move transition-all hover:shadow-lg"
                sx={{
                    p: 2,
                    mb: 1.5,
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}
            >
                <Box display="flex" alignItems="center" gap={1.5}>
                    <IconComponent color="primary" />
                    <Typography variant="body2" fontWeight={500}>
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
        <Box className="h-full bg-gray-50 p-4 overflow-y-auto border-r border-gray-200">
            <Typography variant="h6" gutterBottom fontWeight={600} color="primary">
                Componentes
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
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
