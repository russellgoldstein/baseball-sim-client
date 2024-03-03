import React, { useState } from 'react';
import TeamSelector from './TeamSelector';

import TeamHittersTable from './TeamHittersTable';
import TeamPitchersTable from './TeamPitchersTable';
import TeamHittersLineupTable from './TeamHittersLineupTable';
import TeamPitchersLineupTable from './TeamPitchersLineupTable';

export default function TeamList({
  hittingLineup,
  setHittingLineup,
  pitchingLineup,
  setPitchingLineup,
  selectedTeam,
  setSelectedTeam,
}) {
  const [availableHitters, setAvailableHitters] = useState([]);
  const [availablePitchers, setAvailablePitchers] = useState([]);

  return (
    <>
      <TeamSelector selected={selectedTeam} setSelected={setSelectedTeam} />
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='table-container w-full md:w-1/2'>
          {selectedTeam && (
            <TeamHittersTable
              selectedTeam={selectedTeam}
              lineup={hittingLineup}
              setLineup={setHittingLineup}
              availableHitters={availableHitters}
              setAvailableHitters={setAvailableHitters}
            />
          )}
        </div>
        <div className='table-container w-full md:w-1/2'>
          {selectedTeam && (
            <TeamHittersLineupTable
              lineup={hittingLineup}
              setLineup={setHittingLineup}
              availableHitters={availableHitters}
              setAvailableHitters={setAvailableHitters}
            />
          )}
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='table-container w-full md:w-1/2'>
          {selectedTeam && (
            <TeamPitchersTable
              selectedTeam={selectedTeam}
              lineup={pitchingLineup}
              setLineup={setPitchingLineup}
              availablePitchers={availablePitchers}
              setAvailablePitchers={setAvailablePitchers}
            />
          )}
        </div>
        <div className='table-container w-full md:w-1/2'>
          {selectedTeam && (
            <TeamPitchersLineupTable
              lineup={pitchingLineup}
              setLineup={setPitchingLineup}
              availablePitchers={availablePitchers}
              setAvailablePitchers={setAvailablePitchers}
            />
          )}
        </div>
      </div>
    </>
  );
}
