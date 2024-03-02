import React, { useEffect } from 'react';
import './index.css';
import { useFindHittersByMLBTeamAndSeasonMutation } from '../services/myApi';
import Table from './Table';
import { getDefaultHitterColumns } from '../utils/consts';
import { createColumnHelper } from '@tanstack/react-table';

const columns = getDefaultHitterColumns();

export default function TeamHittersTable({ selectedTeam, lineup, setLineup }) {
  console.log('TeamHittersTable', selectedTeam, lineup, setLineup);
  const addPlayerToLineup = (player) => {
    setLineup([...lineup, player]);
  };

  const columnHelper = createColumnHelper();

  const addPlayerButton = columnHelper.accessor('addPlayer', {
    header: 'Add Player',
    cell: ({ row }) => <button onClick={() => addPlayerToLineup(row.original)}>Add Player</button>,
  });

  const [findHittersByMLBTeamAndSeason, { data: teams, error: teamsError, isLoading: teamsLoading }] =
    useFindHittersByMLBTeamAndSeasonMutation();

  useEffect(() => {
    findHittersByMLBTeamAndSeason({ AbbName: selectedTeam.id, aseason: 2023 });
  }, [findHittersByMLBTeamAndSeason, selectedTeam]);

  if (teamsLoading) return <div>Loading...</div>;
  if (teamsError) return <div>Error: {teamsError.message}</div>;
  return (
    <>
      <Table data={teams} columns={[...columns, addPlayerButton]} />
    </>
  );
}
