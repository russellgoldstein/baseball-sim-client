import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

export default function Table({ data, columns }) {
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='rounded-lg shadow-md max-w-full overflow-auto'>
      <table className='min-w-full divide-y divide-gray-200 bg-white dark:bg-slate-800'>
        <thead className='bg-gray-50 dark:bg-slate-700'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    header.column.columnDef.sticky ? 'sticky z-10 bg-gray-50' : ''
                  } ${header.column.columnDef.align === 'right' ? 'text-right' : 'text-left'}`}
                  style={{
                    left: header.column.columnDef.sticky === 'left' ? 0 : undefined,
                    right: header.column.columnDef.sticky === 'right' ? 0 : undefined,
                  }}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`px-4 py-2 whitespace-nowrap ${
                    cell.column.columnDef.align === 'right' ? 'text-right' : 'text-left'
                  } ${cell.column.columnDef.sticky ? 'sticky bg-white z-10' : ''}`}
                  style={{
                    left: cell.column.columnDef.sticky === 'left' ? 0 : undefined,
                    right: cell.column.columnDef.sticky === 'right' ? 0 : undefined,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
