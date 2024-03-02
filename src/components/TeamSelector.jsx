import React, { useEffect } from 'react';
import { useFindUniqueMLBTeamsMutation } from '../services/myApi';
import Dropdown from './Dropdown';

export default function TeamSelector({ selected, setSelected }) {
  console.log('TeamSelector', selected);
  const [findUniqueMLBTeams, { data: teams, error: teamsError, isLoading: teamsLoading }] =
    useFindUniqueMLBTeamsMutation();

  useEffect(() => {
    findUniqueMLBTeams({});
  }, [findUniqueMLBTeams]);

  if (teamsLoading || !teams) return <div>Loading...</div>;
  if (teamsError) return <div>Error: {teamsError.message}</div>;

  return (
    <div>
      <h1>Team Selector</h1>
      {teams?.length > 0 && (
        <Dropdown
          options={teams?.map((team) => ({ id: team.AbbName, label: team.AbbName })) || []}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      {!teamsLoading && teams?.length === 0 && <div>No teams found</div>}
    </div>
  );
}
