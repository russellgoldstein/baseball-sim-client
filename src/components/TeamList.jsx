import React, { useState } from 'react';
import TeamSelector from './TeamSelector';

import TeamPlayersTable from './TeamPlayersTable';

export default function TeamList() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <TeamSelector selected={selected} setSelected={setSelected} />
      <TeamPlayersTable selectedTeam={selected} />
    </>
  );
}
