import React, { useEffect } from 'react';
import { useFindUniqueMLBTeamsMutation } from '../services/myApi';
import Dropdown from './tailwind/components/Dropdown';

export default function TeamSelector() {
  const [findUniqueMLBTeams, { data: teams, error: teamsError, isLoading: teamsLoading }] =
    useFindUniqueMLBTeamsMutation();

  useEffect(() => {
    findUniqueMLBTeams({});
  }, [findUniqueMLBTeams]);

  // Ensure `teams` is defined before mapping over it
  const options = teams?.map((team) => ({ id: team.AbbName, label: team.AbbName })) || [];

  return (
    <div>
      <h1>Team Selector</h1>
      {teamsLoading && <div>Loading...</div>}
      {teamsError && <div>Error: {teamsError.message}</div>}
      {/* Render Dropdown only if there are teams */}
      {teams?.length > 0 ? (
        <Dropdown options={options} />
      ) : (
        !teamsLoading && <div>No teams found</div> // Provides feedback if no teams are found and not loading
      )}
    </div>
  );
}
