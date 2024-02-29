import React, { useState } from 'react';
import TeamSelector from './TeamSelector';

import TeamHittersTable from './TeamHittersTable';
import TeamPitchersTable from './TeamPitchersTable';

export default function TeamList() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <TeamSelector selected={selected} setSelected={setSelected} />
      {selected && <TeamHittersTable selectedTeam={selected} />}
      {selected && <TeamPitchersTable selectedTeam={selected} />}
    </>
  );
}
