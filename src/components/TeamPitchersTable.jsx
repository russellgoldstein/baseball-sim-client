import React, { useEffect } from 'react';
import './index.css';
import { useFindPitchersByMLBTeamAndSeasonMutation } from '../services/myApi';
import Table from './Table';
import { getAdvancedPitcherColumns, getDefaultPitcherColumns } from '../utils/consts';
import { createColumnHelper } from '@tanstack/react-table';
import UserPlus from './icons/UserPlus';

const defaultColumns = getDefaultPitcherColumns();
const advancedColumns = getAdvancedPitcherColumns();

export default function TeamPitchersTable({
  selectedTeam,
  statType,
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
    cell: ({ row }) => <UserPlus onClick={() => addPlayerToLineup(row.original)} />,
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
  const columns = statType === 'default' ? defaultColumns : advancedColumns;
  return (
    <>
      <Table data={availablePitchers} columns={[...columns, addPlayerButton]} />
    </>
  );
}
