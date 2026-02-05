# Form Builder - Construtor de Formulários

Um construtor de formulários moderno e intuitivo construído com React, TypeScript, Material UI e Tailwind CSS, com suporte completo para dispositivos móveis e tablets.

## 🚀 Funcionalidades

- **Interface Drag & Drop Multi-Dispositivo**: Arraste campos tanto no desktop quanto em dispositivos touch
- **Responsivo**: Interface adaptada para desktop, tablets e celulares
- **Painéis Colapsáveis**: Em dispositivos móveis, acesse painéis laterais através de drawers deslizantes
- **Campos Personalizáveis**: Suporte para 10 tipos de campos diferentes
- **Editor de Propriedades**: Painel completo para editar propriedades de cada campo
- **Condições de Exibição**: Adicione lógica JavaScript para controlar quando campos são exibidos
- **Preview em Tempo Real**: Visualize seu formulário em uma modal antes de exportar
- **Exportação JSON**: Exporte a estrutura do formulário em formato JSON
- **Design Apple**: Interface com linguagem visual inspirada na Apple
- **Touch Optimizado**: Gestos e interações otimizadas para dispositivos touch

## 📋 Tipos de Campos Disponíveis

1. **Campo de Texto** - Input simples de texto
2. **Área de Texto** - Input multilinha
3. **Seleção** - Dropdown com opções únicas
4. **Seleção Múltipla** - Dropdown com múltiplas opções
5. **Checkbox** - Campo booleano
6. **Switch** - Alternativa visual para checkbox
7. **Radio Group** - Grupo de opções mutuamente exclusivas
8. **Arquivo** - Upload de arquivos
9. **Imagem** - Upload de imagens com preview
10. **Data** - Seletor de data com suporte a data mínima e máxima
11. **Hora** - Seletor de hora
12. **Data e Hora** - Seletor de data e hora com suporte a data/hora mínima e máxima

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool moderno e rápido
- **Material UI (MUI)** - Componentes React prontos
- **Tailwind CSS** - Framework CSS utilitário
- **React DnD** - Biblioteca de drag and drop
- **React DnD Multi Backend** - Suporte a mouse e touch simultaneamente
- **Monaco Editor** - Editor de código (mesmo do VS Code)
- **date-fns** - Manipulação de datas

## 📱 Uso em Dispositivos Móveis

### Desktop
- Painéis laterais fixos sempre visíveis
- Drag and drop com mouse
- Layout em 3 colunas (Paleta | Canvas | Propriedades)

### Tablets
- Layout adaptado com colunas mais largas
- Drag and drop funciona com mouse e touch
- Painéis fixos em telas médias

### Smartphones
- Canvas em tela cheia
- Painéis laterais acessados via botões no header:
  - **Ícone de módulos** (esquerda): Abre painel de componentes
  - **Ícone de engrenagem** (direita): Abre painel de propriedades
- Drag and drop otimizado para touch
- Botões de ação compactos (somente ícones)
- Tipografia e espaçamentos adaptados

## 🎯 Como Usar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## 📖 Como Construir um Formulário

1. **Adicionar Campos**: Arraste campos da paleta à esquerda para a área central
2. **Selecionar Campo**: Clique em um campo no canvas para selecioná-lo
3. **Editar Propriedades**: Use o painel direito para configurar:
   - Label do campo
   - Nome (identificador)
   - Placeholder
   - Texto de ajuda
   - Marcar como obrigatório
   - Desabilitar campo
   - Opções (para campos de seleção/radio)
   - Condição de exibição (código JavaScript)
4. **Reordenar**: Arraste campos dentro do canvas para reordenar
5. **Duplicar/Excluir**: Use os botões em cada campo
6. **Visualizar**: Clique em "Visualizar" para ver o formulário funcionando
7. **Exportar**: Clique em "Exportar" para baixar o JSON do formulário

## 🎨 Estrutura do Projeto

```
src/
├── components/
│   ├── FormBuilder/         # Componente principal
│   ├── FieldPalette/         # Painel de campos disponíveis
│   ├── Canvas/               # Área de construção do formulário
│   ├── PropertiesPanel/      # Editor de propriedades
│   ├── PreviewModal/         # Modal de preview
│   └── fields/
│       └── FieldRenderer.tsx # Renderizador de campos
├── context/
│   └── FormBuilderContext.tsx # Estado global do form builder
├── types/
│   └── index.ts              # Definições TypeScript
├── App.tsx                   # Componente raiz
└── main.tsx                  # Entry point
```

## 📝 Formato de Exportação

O formulário é exportado como JSON com a seguinte estrutura:

```json
[
  {
    "id": "unique-id",
    "type": "text",
    "label": "Nome",
    "name": "nome",
    "required": true,
    "placeholder": "Digite seu nome",
    "helperText": "Campo obrigatório",
    "displayCondition": "// código JavaScript"
  }
]
```

## 👨‍💻 Desenvolvido com carinho por Gabriel Mazzi

- React + TypeScript + Vite
- Material UI + Tailwind CSS
- React DnD + Monaco Editor
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
