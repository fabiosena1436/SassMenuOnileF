import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

// Defina as colunas para sua tabela de dados aqui
const columns = [
  { field: 'id', headerName: 'ID do Pedido', width: 220 },
  {
    field: 'createdAt',
    headerName: 'Data',
    width: 150,
    valueGetter: (params) => params.row.createdAt?.toDate().toLocaleDateString('pt-BR') || '',
  },
  { field: 'customerName', headerName: 'Cliente', width: 200 },
  {
    field: 'total',
    headerName: 'Valor',
    type: 'number',
    width: 120,
    valueGetter: (params) => params.row.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
  { field: 'status', headerName: 'Status', width: 130 },
];

export default function DesktopDataGrid({ rows }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick
      />
    </div>
  );
}