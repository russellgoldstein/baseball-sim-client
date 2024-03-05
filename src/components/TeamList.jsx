import React, { useState } from 'react';
import TeamSelector from './TeamSelector';

import TeamHittersTable from './TeamHittersTable';
import TeamPitchersTable from './TeamPitchersTable';
import TeamHittersLineupTable from './TeamHittersLineupTable';
import TeamPitchersLineupTable from './TeamPitchersLineupTable';
import { ToggleSwitch } from '../pages/component/ToggleSwitch';

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
  const [statType, setStatType] = useState('default');

  return (
    <>
      <div className='flex flex-container flex-row space-x-2 justify-between items-center'>
        <TeamSelector selected={selectedTeam} setSelected={setSelectedTeam} />
        <ToggleSwitch
          isOn={statType === 'advanced'}
          handleToggle={() => setStatType(statType === 'default' ? 'advanced' : 'default')}
          leftText='Default'
          rightText='Advanced'
        />
      </div>
      {selectedTeam && (
        <>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='table-container w-full md:w-1/2'>
              <TeamHittersTable
                selectedTeam={selectedTeam}
                lineup={hittingLineup}
                setLineup={setHittingLineup}
                availableHitters={availableHitters}
                setAvailableHitters={setAvailableHitters}
                statType={statType}
              />
            </div>
            <div className='table-container w-full md:w-1/2'>
              <TeamHittersLineupTable
                lineup={hittingLineup}
                setLineup={setHittingLineup}
                availableHitters={availableHitters}
                setAvailableHitters={setAvailableHitters}
                statType={statType}
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='table-container w-full md:w-1/2'>
              <TeamPitchersTable
                selectedTeam={selectedTeam}
                lineup={pitchingLineup}
                setLineup={setPitchingLineup}
                availablePitchers={availablePitchers}
                setAvailablePitchers={setAvailablePitchers}
                statType={statType}
              />
            </div>

            <div className='table-container w-full md:w-1/2'>
              <TeamPitchersLineupTable
                lineup={pitchingLineup}
                setLineup={setPitchingLineup}
                availablePitchers={availablePitchers}
                setAvailablePitchers={setAvailablePitchers}
                statType={statType}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
