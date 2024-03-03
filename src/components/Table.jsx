import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
export default function Table({ data, columns }) {
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='rounded-lg shadow-md max-w-full'>
      <table className='min-w-full divide-y divide-gray-200 bg-white dark:bg-slate-800'>
        <thead className='border-b bg-gray-50 dark:bg-slate-700'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    header.column.columnDef.sticky ? 'sticky top-0 z-10 bg-gray-50' : ''
                  }`}
                  style={{
                    left: header.column.columnDef.sticky === 'left' ? 0 : 'auto',
                    right: header.column.columnDef.sticky === 'right' ? 0 : 'auto',
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
              {row.getVisibleCells().map((cell, index) => (
                <td
                  key={cell.id}
                  className={`px-6 py-3 whitespace-nowrap ${cell.column.columnDef.sticky ? 'sticky bg-white' : ''}`}
                  style={{
                    left: cell.column.columnDef.sticky === 'left' ? 0 : 'auto',
                    right: cell.column.columnDef.sticky === 'right' ? 0 : 'auto',
                    zIndex: cell.column.columnDef.sticky ? 1 : 'auto',
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
