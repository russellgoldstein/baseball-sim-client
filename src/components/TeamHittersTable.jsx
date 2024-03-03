import React, { useEffect } from 'react';
import './index.css';
import { useFindHittersByMLBTeamAndSeasonMutation } from '../services/myApi';
import Table from './Table';
import { getDefaultHitterColumns } from '../utils/consts';
import { createColumnHelper } from '@tanstack/react-table';

const columns = getDefaultHitterColumns();

export default function TeamHittersTable({ selectedTeam, lineup, setLineup, availableHitters, setAvailableHitters }) {
  console.log('in TeamHittersTable', selectedTeam, lineup, availableHitters, setAvailableHitters);
  const addPlayerToLineup = (player) => {
    console.log('in addPlayerToLineup', player);
    setLineup((currentLineup) => [...currentLineup, player]); // Use functional update
    setAvailableHitters((currentHitters) => currentHitters.filter((hitter) => hitter.id !== player.id));
  };

  const columnHelper = createColumnHelper();

  const addPlayerButton = columnHelper.accessor('addPlayer', {
    header: 'Actions',
    cell: ({ row }) => <button onClick={() => addPlayerToLineup(row.original)}>Add Player</button>,
    sticky: 'right',
  });

  const [findHittersByMLBTeamAndSeason, { data: teams, error: teamsError, isLoading: teamsLoading }] =
    useFindHittersByMLBTeamAndSeasonMutation();

  useEffect(() => {
    findHittersByMLBTeamAndSeason({ AbbName: selectedTeam.id, aseason: 2023 });
  }, [findHittersByMLBTeamAndSeason, selectedTeam]);

  useEffect(() => {
    console.log('in useEffect', teams);
    if (teams) {
      setAvailableHitters(teams);
    }
  }, [teams, setAvailableHitters]);

  if (teamsLoading) return <div>Loading...</div>;
  if (teamsError) return <div>Error: {teamsError.message}</div>;
  return (
    <>
      <Table data={availableHitters} columns={[...columns, addPlayerButton]} />
    </>
  );
}
