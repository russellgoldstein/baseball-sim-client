import React, { useEffect, useRef } from 'react';
import './index.css';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useFindByMLBTeamAndSeasonMutation } from '../services/myApi';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('ateam', {
    header: 'Team',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    cell: (info) => <i>{info.getValue()}</i>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  // Add more columns as needed
];

export default function TeamPlayersTable({ selectedTeam }) {
  console.log('TeamPlayersTable', selectedTeam);
  const [findByMLBTeamAndSeason, { data: teams, error: teamsError, isLoading: teamsLoading }] =
    useFindByMLBTeamAndSeasonMutation();

  console.log('TeamPlayersTable', selectedTeam, teams, teamsLoading, teamsError);
  const table = useReactTable({
    data: teams ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Ref to store the previous selected value
  const prevSelectedRef = useRef();

  useEffect(() => {
    console.log('in useEffect', selectedTeam, prevSelectedRef.current?.id);
    // Check if the current selected value is different from the previous
    if (selectedTeam && selectedTeam.id !== prevSelectedRef.current?.id) {
      findByMLBTeamAndSeason({ AbbName: selectedTeam.id, aseason: 2023 });
    }
    // Update the previous selected value for the next render
    prevSelectedRef.current = selectedTeam;
  }, [findByMLBTeamAndSeason, selectedTeam]);

  if (teamsLoading) return <div>Loading...</div>;
  if (teamsError) return <div>Error: {teamsError.message}</div>;
  console.log({ teams, teamsLoading, teamsError });
  return (
    <div className='p-2'>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
