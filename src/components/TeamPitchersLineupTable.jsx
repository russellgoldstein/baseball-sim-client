import React from 'react';
import './index.css';
import Table from './Table';
import { getDefaultPitcherColumns } from '../utils/consts';
import { createColumnHelper } from '@tanstack/react-table';

const columns = getDefaultPitcherColumns();

export default function TeamPitchersLineupTable({ lineup, setLineup, availablePitchers, setAvailablePitchers }) {
  const removePlayerFromLineup = (player) => {
    setLineup(lineup.filter((pitcher) => pitcher.id !== player.id));
    setAvailablePitchers([...availablePitchers, player]);
  };

  const movePlayerUp = (player) => {
    const index = lineup.findIndex((hitter) => hitter.id === player.id);
    if (index > 0) {
      const newLineup = [...lineup];
      const temp = newLineup[index];
      newLineup[index] = newLineup[index - 1];
      newLineup[index - 1] = temp;
      setLineup(newLineup);
    }
  };

  const movePlayerDown = (player) => {
    const index = lineup.findIndex((hitter) => hitter.id === player.id);
    if (index < lineup.length - 1) {
      const newLineup = [...lineup];
      const temp = newLineup[index];
      newLineup[index] = newLineup[index + 1];
      newLineup[index + 1] = temp;
      setLineup(newLineup);
    }
  };

  const columnHelper = createColumnHelper();

  const removePlayerButton = columnHelper.accessor('removePlayer', {
    header: 'Actions',
    cell: ({ row }) => (
      <>
        <button onClick={() => removePlayerFromLineup(row.original)}>Remove Player</button>
        <button onClick={() => movePlayerUp(row.original)}>Move Up</button>
        <button onClick={() => movePlayerDown(row.original)}>Move Down</button>
      </>
    ),
  });
  return <Table data={lineup} columns={[...columns, removePlayerButton]} />;
}
