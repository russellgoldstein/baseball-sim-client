import { useReactTable } from '@tanstack/react-table';
import React from 'react';

const MyTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useReactTable({
    data,
    columns,
  });

  console.log('headers', headers);
  console.log('rows', rows);

  return (
    <table {...getTableProps()}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.id}>{header.isPlaceholder ? null : header.renderHeader()}</th>
          ))}
        </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MyTable;
