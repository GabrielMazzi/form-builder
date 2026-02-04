import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
} from '@mui/material';
import { useFormBuilder } from '../../context/FormBuilderContext';
import FieldRenderer from '../fields/FieldRenderer';

interface PreviewModalProps {
    open: boolean;
    onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ open, onClose }) => {
    const { fields } = useFormBuilder();
    const [formValues, setFormValues] = useState<Record<string, any>>({});

    const handleFieldChange = (fieldId: string, value: any) => {
        setFormValues((prev) => ({
            ...prev,
            [fieldId]: value,
        }));
    };

    const shouldDisplayField = (field: any): boolean => {
        if (!field.displayCondition) return true;

        try {
            // Create a function from the display condition code
            // eslint-disable-next-line no-new-func
            const conditionFn = new Function('formValues', field.displayCondition);
            return conditionFn(formValues);
        } catch (error) {
            console.error('Error evaluating display condition:', error);
            return true;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formValues);
        alert('Formulário enviado! Verifique o console para ver os valores.');
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Typography variant="h6" fontWeight={600}>
                    Pré-visualização do Formulário
                </Typography>
            </DialogTitle>

            <DialogContent dividers>
                {fields.length === 0 ? (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ p: 6, textAlign: 'center' }}
                    >
                        <Typography variant="body1" color="text.secondary">
                            Nenhum campo adicionado ao formulário ainda.
                        </Typography>
                    </Box>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" flexDirection="column" gap={3}>
                            {fields
                                .filter(shouldDisplayField)
                                .map((field) => (
                                    <FieldRenderer
                                        key={field.id}
                                        field={field}
                                        value={formValues[field.id]}
                                        onChange={(value) => handleFieldChange(field.id, value)}
                                    />
                                ))}
                        </Box>
                    </form>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Fechar
                </Button>
                {fields.length > 0 && (
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Testar Envio
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default PreviewModal;
