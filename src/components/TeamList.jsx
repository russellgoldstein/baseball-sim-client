import React, { useState } from 'react';
import TeamSelector from './TeamSelector';

import TeamHittersTable from './TeamHittersTable';
import TeamPitchersTable from './TeamPitchersTable';

export default function TeamList({
  hittingLineup,
  setHittingLineup,
  pitchingLineup,
  setPitchingLineup,
  selectedTeam,
  setSelectedTeam,
}) {
  console.log('TeamList', selectedTeam, hittingLineup, pitchingLineup);
  return (
    <>
      <TeamSelector selected={selectedTeam} setSelected={setSelectedTeam} />
      {selectedTeam && (
        <TeamHittersTable selectedTeam={selectedTeam} lineup={hittingLineup} setLineup={setHittingLineup} />
      )}
      {selectedTeam && (
        <TeamPitchersTable selectedTeam={selectedTeam} lineup={pitchingLineup} setLineup={setPitchingLineup} />
      )}
    </>
  );
}
