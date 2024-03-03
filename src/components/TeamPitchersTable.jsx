import React, { useEffect, useState } from 'react';
import './index.css';
import { useFindPitchersByMLBTeamAndSeasonMutation } from '../services/myApi';
import Table from './Table';
import { getDefaultPitcherColumns } from '../utils/consts';
import { createColumnHelper } from '@tanstack/react-table';

const columns = getDefaultPitcherColumns();

export default function TeamPitchersTable({
  selectedTeam,
  lineup,
  setLineup,
  availablePitchers,
  setAvailablePitchers,
}) {
  const addPlayerToLineup = (player) => {
    setLineup((currentLineup) => [...currentLineup, player]); // Use functional update
    setAvailablePitchers((availablePitchers) => availablePitchers.filter((pitcher) => pitcher.id !== player.id));
  };

  const columnHelper = createColumnHelper();

  const addPlayerButton = columnHelper.accessor('addPlayer', {
    header: 'Actions',
    cell: ({ row }) => <button onClick={() => addPlayerToLineup(row.original)}>Add Player</button>,
    sticky: 'right',
  });

  const [findHPitchersByMLBTeamAndSeason, { data: teams, error: teamsError, isLoading: teamsLoading }] =
    useFindPitchersByMLBTeamAndSeasonMutation();

  useEffect(() => {
    findHPitchersByMLBTeamAndSeason({ AbbName: selectedTeam.id, aseason: 2023 });
  }, [findHPitchersByMLBTeamAndSeason, selectedTeam]);

  useEffect(() => {
    if (teams) {
      setAvailablePitchers(teams);
    }
  }, [teams, setAvailablePitchers]);

  if (teamsLoading) return <div>Loading...</div>;
  if (teamsError) return <div>Error: {teamsError.message}</div>;
  return (
    <>
      <Table data={availablePitchers} columns={[...columns, addPlayerButton]} />
    </>
  );
}
