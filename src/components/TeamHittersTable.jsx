import React, { useEffect, useRef } from 'react';
import './index.css';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useFindHittersByMLBTeamAndSeasonMutation } from '../services/myApi';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('first_name', {
    header: 'First Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('last_name', {
    header: 'Last Name',
    cell: (info) => <i>{info.getValue()}</i>,
  }),
  columnHelper.accessor('G', {
    header: 'G',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('AB', {
    header: 'AB',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('PA', {
    header: 'PA',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('H', {
    header: 'H',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('R', {
    header: 'R',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('HR', {
    header: 'HR',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('RBI', {
    header: 'RBI',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('SB', {
    header: 'SB',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('CS', {
    header: 'CS',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('BB', {
    header: 'BB',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('SO', {
    header: 'K',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('AVG', {
    header: 'AVG',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('OBP', {
    header: 'OBP',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('SLG', {
    header: 'SLG',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('OPS', {
    header: 'OPS',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('LD_PERCENT', {
    header: 'LD%',
    cell: (info) => (info.renderValue() * 100).toFixed(1),
  }),
  columnHelper.accessor('GB_PERCENT', {
    header: 'GB%',
    cell: (info) => (info.renderValue() * 100).toFixed(1),
  }),
  columnHelper.accessor('FB_PERCENT', {
    header: 'FB%',
    cell: (info) => (info.renderValue() * 100).toFixed(1),
  }),
  columnHelper.accessor('HR_FB', {
    header: 'HR/FB%',
    cell: (info) => (info.renderValue() * 100).toFixed(1),
  }),
];

export default function TeamHittersTable({ selectedTeam }) {
  const [findHittersByMLBTeamAndSeason, { data: teams, error: teamsError, isLoading: teamsLoading }] =
    useFindHittersByMLBTeamAndSeasonMutation();

  const table = useReactTable({
    data: teams ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    findHittersByMLBTeamAndSeason({ AbbName: selectedTeam.id, aseason: 2023 });
  }, [findHittersByMLBTeamAndSeason, selectedTeam]);

  if (teamsLoading) return <div>Loading...</div>;
  if (teamsError) return <div>Error: {teamsError.message}</div>;
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
      </table>
    </div>
  );
}
