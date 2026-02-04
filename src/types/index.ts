export type FieldType =
    | 'text'
    | 'textarea'
    | 'select'
    | 'multiselect'
    | 'checkbox'
    | 'switch'
    | 'radio'
    | 'file'
    | 'image'
    | 'date';

export interface SelectOption {
    label: string;
    value: string;
}

export interface FormField {
    id: string;
    type: FieldType;
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    helperText?: string;
    options?: SelectOption[];
    displayCondition?: string; // JavaScript code
    defaultValue?: any;
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        message?: string;
    };
}

export interface DragItem {
    type: string;
    fieldType?: FieldType;
    id?: string;
    index?: number;
}

export const FIELD_TYPES: { type: FieldType; label: string; icon: string }[] = [
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
