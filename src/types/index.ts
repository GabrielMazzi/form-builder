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
    | 'date'
    | 'time'
    | 'datetime';

export interface SelectOption {
    label: string;
    value: string;
}

export interface DisplayConditionConfig {
    sourceFieldId?: string; // ID do campo que controla a exibição
    targetValue?: string; // Valor que o campo deve ter
    action?: 'show' | 'hide'; // Ação: exibir ou esconder
}

export interface FormField {
    id: string;
    type: FieldType;
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    helperText?: string;
    options?: SelectOption[];
    customCode?: string; // JavaScript code customizado
    displayConditionConfig?: DisplayConditionConfig; // Nova configuração de condição
    minDate?: string; // Data mínima para campos de data e datetime
    maxDate?: string; // Data máxima para campos de data e datetime
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
    { type: 'time', label: 'Hora', icon: 'AccessTime' },
    { type: 'datetime', label: 'Data e Hora', icon: 'Event' },
];
