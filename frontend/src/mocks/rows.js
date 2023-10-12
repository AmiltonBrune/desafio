import Actions from 'components/Actions';

export const rowsMock = [
  {
    name: 'Felipe Miguel Luan Pires',
    description: 'Rua Falcão, 152',
    actions: <Actions />,
  },
  {
    name: 'Benjamin Kaique Juan da Cunha',
    description: 'Corredor Público A',
    actions: <Actions />,
  },
  {
    name: 'Joana Raimunda Flávia Moreira',
    description: 'Rua F',
    actions: <Actions />,
  },
  {
    name: 'Jorge Caio Guilherme Porto',
    description: 'Rua Soldado-Polícia Militar Arineu Ferreira Lima',
    actions: <Actions />,
  },
  {
    name: 'Arthur Vicente Martins',
    description: 'Rua Falcão, 152',
    actions: <Actions />,
  },
  {
    name: 'Ryan Gael Anderson da Rosa',
    description: 'Rua Tabelião João Nunes Travassos',
    actions: <Actions />,
  },
  {
    name: 'Manuela Mariana Andrea Aragão',
    description: 'Rua Orlando Jorge Binder',
    actions: <Actions />,
  },
];

export const rowsKeysMock = [
  {
    key: 'name',
    align: 'left',
    isComponent: false,
  },
  {
    key: 'description',
    align: 'left',
    isComponent: false,
  },
  {
    key: 'actions',
    align: 'center',
    isComponent: true,
  },
];

export const cellsHeadersMock = [
  {
    label: 'Nome',
    align: 'left',
  },
  {
    label: 'Descrição',
    align: 'left',
  },
  {
    label: 'Ações',
    align: 'center',
  },
];
