import React, { useEffect } from 'react';
import './index.css';
import { useFindPitchersByMLBTeamAndSeasonMutation } from '../services/myApi';
import Table from './Table';
import { getDefaultPitcherColumns } from '../utils/consts';
import { createColumnHelper } from '@tanstack/react-table';

const columns = getDefaultPitcherColumns();

export default function TeamPitchersTable({ selectedTeam, lineup, setLineup }) {
  const addPlayerToLineup = (player) => {
    setLineup([...lineup, player]);
  };

  const columnHelper = createColumnHelper();

  const addPlayerButton = columnHelper.accessor('addPlayer', {
    header: 'Add Player',
    cell: ({ row }) => <button onClick={() => addPlayerToLineup(row.original)}>Add Player</button>,
  });

  const [findHPitchersByMLBTeamAndSeason, { data: teams, error: teamsError, isLoading: teamsLoading }] =
    useFindPitchersByMLBTeamAndSeasonMutation();

  useEffect(() => {
    findHPitchersByMLBTeamAndSeason({ AbbName: selectedTeam.id, aseason: 2023 });
  }, [findHPitchersByMLBTeamAndSeason, selectedTeam]);

  if (teamsLoading) return <div>Loading...</div>;
  if (teamsError) return <div>Error: {teamsError.message}</div>;
  return (
    <>
      <Table data={teams} columns={[...columns, addPlayerButton]} />
    </>
  );
}
