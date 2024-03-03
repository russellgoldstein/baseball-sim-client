import { useEffect, useState } from 'react';
import TeamList from './TeamList';

import UnselectedTab from './UnselectedTab';
import SelectedTab from './SelectedTab';
import Tabs from './Tabs';
import { SimMatchup } from './SimMatchup';

export default function MatchupSelector() {
  const [awayTeamHitters, setAwayTeamHitters] = useState([]);
  const [awayTeamPitchers, setAwayTeamPitchers] = useState([]);
  const [homeTeamHitters, setHomeTeamHitters] = useState([]);
  const [homeTeamPitchers, setHomeTeamPitchers] = useState([]);

  const [selectedHomeTeam, setSelectedHomeTeam] = useState(null);
  const [selectedAwayTeam, setSelectedAwayTeam] = useState(null);

  const [currentTab, setCurrentTab] = useState('away-team'); // Default to showing away team

  useEffect(() => {
    const handleHashChange = () => {
      // Check if the hash matches expected values, otherwise default to 'away-team'
      const hash = window.location.hash.replace('#', '');
      if (hash === 'away-team' || hash === 'home-team') {
        setCurrentTab(hash);
      }
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange, false);

    // Call the handler in case the hash is already set on component mount
    handleHashChange();

    // Cleanup listener on component unmount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div>
      <SimMatchup
        awayTeamHitters={awayTeamHitters}
        awayTeamPitchers={awayTeamPitchers}
        homeTeamHitters={homeTeamHitters}
        homeTeamPitchers={homeTeamPitchers}
      />
      <Tabs>
        {currentTab === 'home-team' && (
          <>
            <UnselectedTab label='Away Team' href='#away-team' />
            <SelectedTab label='Home Team' href='#home-team' />{' '}
          </>
        )}
        {currentTab === 'away-team' && (
          <>
            <SelectedTab label='Away Team' href='#away-team' />
            <UnselectedTab label='Home Team' href='#home-team' />{' '}
          </>
        )}
      </Tabs>

      {currentTab === 'away-team' && (
        <>
          <TeamList
            hittingLineup={awayTeamHitters}
            setHittingLineup={setAwayTeamHitters}
            pitchingLineup={awayTeamPitchers}
            setPitchingLineup={setAwayTeamPitchers}
            selectedTeam={selectedAwayTeam}
            setSelectedTeam={setSelectedAwayTeam}
          />
        </>
      )}

      {currentTab === 'home-team' && (
        <>
          <TeamList
            hittingLineup={homeTeamHitters}
            setHittingLineup={setHomeTeamHitters}
            pitchingLineup={homeTeamPitchers}
            setPitchingLineup={setHomeTeamPitchers}
            selectedTeam={selectedHomeTeam}
            setSelectedTeam={setSelectedHomeTeam}
          />
        </>
      )}
    </div>
  );
}
