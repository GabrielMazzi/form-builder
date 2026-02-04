import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { FormField, FieldType } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface FormBuilderContextType {
    fields: FormField[];
    selectedFieldId: string | null;
    addField: (type: FieldType) => void;
    updateField: (id: string, updates: Partial<FormField>) => void;
    deleteField: (id: string) => void;
    moveField: (fromIndex: number, toIndex: number) => void;
    selectField: (id: string | null) => void;
    getSelectedField: () => FormField | null;
    duplicateField: (id: string) => void;
}

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export const useFormBuilder = () => {
    const context = useContext(FormBuilderContext);
    if (!context) {
        throw new Error('useFormBuilder must be used within FormBuilderProvider');
    }
    return context;
};

interface FormBuilderProviderProps {
    children: ReactNode;
}

export const FormBuilderProvider: React.FC<FormBuilderProviderProps> = ({ children }) => {
    const [fields, setFields] = useState<FormField[]>([]);
    const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

    const addField = (type: FieldType) => {
        const newField: FormField = {
            id: uuidv4(),
            type,
            label: `Novo ${getFieldLabel(type)}`,
            name: `field_${Date.now()}`,
            required: false,
            disabled: false,
        };

        if (type === 'select' || type === 'multiselect' || type === 'radio') {
            newField.options = [
                { label: 'Opção 1', value: 'option1' },
                { label: 'Opção 2', value: 'option2' },
            ];
        }

        setFields([...fields, newField]);
        setSelectedFieldId(newField.id);
    };

    const updateField = (id: string, updates: Partial<FormField>) => {
        setFields(fields.map((field) => (field.id === id ? { ...field, ...updates } : field)));
    };

    const deleteField = (id: string) => {
        setFields(fields.filter((field) => field.id !== id));
        if (selectedFieldId === id) {
            setSelectedFieldId(null);
        }
    };

    const moveField = (fromIndex: number, toIndex: number) => {
        const newFields = [...fields];
        const [movedField] = newFields.splice(fromIndex, 1);
        newFields.splice(toIndex, 0, movedField);
        setFields(newFields);
    };

    const selectField = (id: string | null) => {
        setSelectedFieldId(id);
    };

    const getSelectedField = () => {
        return fields.find((field) => field.id === selectedFieldId) || null;
    };

    const duplicateField = (id: string) => {
        const fieldToDuplicate = fields.find((field) => field.id === id);
        if (fieldToDuplicate) {
            const newField: FormField = {
                ...fieldToDuplicate,
                id: uuidv4(),
                name: `${fieldToDuplicate.name}_copy`,
                label: `${fieldToDuplicate.label} (cópia)`,
            };
            setFields([...fields, newField]);
        }
    };

    const value = {
        fields,
        selectedFieldId,
        addField,
        updateField,
        deleteField,
        moveField,
        selectField,
        getSelectedField,
        duplicateField,
    };

    return <FormBuilderContext.Provider value={value}>{children}</FormBuilderContext.Provider>;
};

function getFieldLabel(type: FieldType): string {
    const labels: Record<FieldType, string> = {
        text: 'Campo de Texto',
        textarea: 'Área de Texto',
        select: 'Seleção',
        multiselect: 'Seleção Múltipla',
        checkbox: 'Checkbox',
        switch: 'Switch',
        radio: 'Radio Group',
        file: 'Arquivo',
        image: 'Imagem',
        date: 'Data',
    };
    return labels[type];
}
