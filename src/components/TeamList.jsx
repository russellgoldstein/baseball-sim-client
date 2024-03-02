import React, { useState } from 'react';
import TeamSelector from './TeamSelector';

import TeamHittersTable from './TeamHittersTable';
import TeamPitchersTable from './TeamPitchersTable';

export default function TeamList({ hittingLineup, setHittingLineup, pitchingLineup, setPitchingLineup }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <TeamSelector selected={selected} setSelected={setSelected} />
      {selected && <TeamHittersTable selectedTeam={selected} lineup={hittingLineup} setLineup={setHittingLineup} />}
      {selected && <TeamPitchersTable selectedTeam={selected} lineup={pitchingLineup} setLineup={setPitchingLineup} />}
    </>
  );
}
