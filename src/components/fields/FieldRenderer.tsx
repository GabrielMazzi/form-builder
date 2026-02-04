import React from 'react';
import type { FormField, SelectOption } from '../../types';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    Switch,
    Radio,
    RadioGroup,
    FormLabel,
    Button,
    OutlinedInput,
    ListItemText,
    Box,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

interface FieldRendererProps {
    field: FormField;
    value?: any;
    onChange?: (value: any) => void;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => {
    const handleChange = (newValue: any) => {
        if (onChange) {
            onChange(newValue);
        }
    };

    const renderField = () => {
        switch (field.type) {
            case 'text':
                return (
                    <TextField
                        fullWidth
                        label={field.label}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        disabled={field.disabled}
                        helperText={field.helperText}
                        value={value || ''}
                        onChange={(e) => handleChange(e.target.value)}
                        variant="outlined"
                    />
                );

            case 'textarea':
                return (
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label={field.label}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        disabled={field.disabled}
                        helperText={field.helperText}
                        value={value || ''}
                        onChange={(e) => handleChange(e.target.value)}
                        variant="outlined"
                    />
                );

            case 'select':
                return (
                    <FormControl fullWidth required={field.required} disabled={field.disabled}>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                            value={value || ''}
                            label={field.label}
                            onChange={(e) => handleChange(e.target.value)}
                        >
                            {field.options?.map((option: SelectOption) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );

            case 'multiselect':
                return (
                    <FormControl fullWidth required={field.required} disabled={field.disabled}>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                            multiple
                            value={value || []}
                            onChange={(e: SelectChangeEvent<string[]>) => handleChange(e.target.value)}
                            input={<OutlinedInput label={field.label} />}
                            renderValue={(selected) =>
                                (selected as string[])
                                    .map(
                                        (val) =>
                                            field.options?.find((opt: SelectOption) => opt.value === val)?.label || val
                                    )
                                    .join(', ')
                            }
                        >
                            {field.options?.map((option: SelectOption) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <Checkbox checked={(value || []).indexOf(option.value) > -1} />
                                    <ListItemText primary={option.label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );

            case 'checkbox':
                return (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={value || false}
                                onChange={(e) => handleChange(e.target.checked)}
                                disabled={field.disabled}
                            />
                        }
                        label={field.label}
                    />
                );

            case 'switch':
                return (
                    <FormControlLabel
                        control={
                            <Switch
                                checked={value || false}
                                onChange={(e) => handleChange(e.target.checked)}
                                disabled={field.disabled}
                            />
                        }
                        label={field.label}
                    />
                );

            case 'radio':
                return (
                    <FormControl component="fieldset" required={field.required} disabled={field.disabled}>
                        <FormLabel component="legend">{field.label}</FormLabel>
                        <RadioGroup
                            value={value || ''}
                            onChange={(e) => handleChange(e.target.value)}
                        >
                            {field.options?.map((option: SelectOption) => (
                                <FormControlLabel
                                    key={option.value}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                );

            case 'file':
                return (
                    <Box>
                        <FormLabel>{field.label}</FormLabel>
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            disabled={field.disabled}
                            sx={{ mt: 1 }}
                        >
                            Escolher Arquivo
                            <input
                                type="file"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    handleChange(file);
                                }}
                            />
                        </Button>
                        {value && <Box sx={{ mt: 1, fontSize: '0.875rem' }}>Arquivo: {value.name}</Box>}
                    </Box>
                );

            case 'image':
                return (
                    <Box>
                        <FormLabel>{field.label}</FormLabel>
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            disabled={field.disabled}
                            sx={{ mt: 1 }}
                        >
                            Escolher Imagem
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    handleChange(file);
                                }}
                            />
                        </Button>
                        {value && (
                            <Box sx={{ mt: 2 }}>
                                <img
                                    src={URL.createObjectURL(value)}
                                    alt="Preview"
                                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                                />
                            </Box>
                        )}
                    </Box>
                );

            case 'date':
                return (
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                        <DatePicker
                            label={field.label}
                            value={value || null}
                            onChange={(newValue) => handleChange(newValue)}
                            disabled={field.disabled}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    required: field.required,
                                    helperText: field.helperText,
                                },
                            }}
                        />
                    </LocalizationProvider>
                );

            default:
                return <div>Campo não suportado</div>;
        }
    };

    return <div className="field-renderer">{renderField()}</div>;
};

export default FieldRenderer;
