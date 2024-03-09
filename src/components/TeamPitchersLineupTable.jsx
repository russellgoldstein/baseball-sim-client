import React from 'react';
import './index.css';
import Table from './Table';
import { getAdvancedPitcherColumns, getDefaultPitcherColumns } from '../utils/consts';
import { createColumnHelper } from '@tanstack/react-table';
import UserMinus from './icons/UserMinus';
import ChevronUp from './icons/ChevronUp';
import ChevronDown from './icons/ChevronDown';

const defaultColumns = getDefaultPitcherColumns();
const advancedColumns = getAdvancedPitcherColumns();

export default function TeamPitchersLineupTable({
  lineup,
  setLineup,
  availablePitchers,
  setAvailablePitchers,
  statType,
}) {
  const generateEmptySpots = () => {
    const emptySpots = [];
    for (let i = lineup.length; i < 1; i++) {
      emptySpots.push({ first_name: `-`, last_name: '', empty: true });
    }
    return emptySpots;
  };

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

  const completeLineup = [...lineup, ...generateEmptySpots()];

  const columnHelper = createColumnHelper();

  const removePlayerButton = columnHelper.accessor('actions', {
    header: 'Actions',
    cell: ({ row }) =>
      !row.original.empty && (
        <div className='flex space-x-2 justify-center items-center'>
          <ChevronUp onClick={() => movePlayerUp(row.original)} />
          <ChevronDown onClick={() => movePlayerDown(row.original)} />
          <UserMinus onClick={() => removePlayerFromLineup(row.original)} />
        </div>
      ),
    sticky: 'right',
  });
  const columns = statType === 'default' ? defaultColumns : advancedColumns;
  return <Table data={completeLineup} columns={[...columns, removePlayerButton]} />;
}
