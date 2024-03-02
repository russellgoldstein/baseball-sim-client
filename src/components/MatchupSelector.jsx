import { useEffect, useState } from 'react';
import TeamList from './TeamList';
import Table from './Table';
import {
  getDefaultHitterColumns,
  getDefaultPitcherColumns,
  getBoxScoreHitterColumns,
  getBoxScorePitcherColumns,
} from '../utils/consts';
import { usePlayGameMutation } from '../services/myApi';

const hitterColumns = getDefaultHitterColumns();
const pitcherColumns = getDefaultPitcherColumns();

const hitterBoxScoreColumns = getBoxScoreHitterColumns();
const pitcherBoxScoreColumns = getBoxScorePitcherColumns();

export default function MatchupSelector() {
  const [awayTeamHitters, setAwayTeamHitters] = useState([]);
  const [awayTeamPitchers, setAwayTeamPitchers] = useState([]);
  const [homeTeamHitters, setHomeTeamHitters] = useState([]);
  const [homeTeamPitchers, setHomeTeamPitchers] = useState([]);
  const [homeHitterBoxScore, setHomeHitterBoxScore] = useState([]);
  const [homePitcherBoxScore, setHomePitcherBoxScore] = useState([]);
  const [awayHitterBoxScore, setAwayHitterBoxScore] = useState([]);
  const [awayPitcherBoxScore, setAwayPitcherBoxScore] = useState([]);
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

  const [playGame, { error: playGameError, isLoading: playGameLoading }] = usePlayGameMutation();

  const submitMatchup = async () => {
    console.log('Submit Matchup');
    const result = await playGame({
      awayTeamHitters,
      awayTeamPitchers,
      homeTeamHitters,
      homeTeamPitchers,
    });
    const { homeHitters, homePitcher, awayHitters, awayPitcher } = result.data;
    const homeBoxScore = processDataForBoscore(homeHitters, homePitcher, 'home');
    const awayBoxScore = processDataForBoscore(awayHitters, awayPitcher, 'away');
    console.log(homeBoxScore);
    console.log(awayBoxScore);
    setHomeHitterBoxScore(homeBoxScore.hitters);
    setHomePitcherBoxScore(homeBoxScore.pitchers);
    setAwayHitterBoxScore(awayBoxScore.hitters);
    setAwayPitcherBoxScore(awayBoxScore.pitchers);
  };

  return (
    <div>
      <button onClick={submitMatchup}>Submit Matchup</button>

      {homeHitterBoxScore.length > 0 && homePitcherBoxScore.length > 0 && (
        <div>
          <h2>Home Team Box Score</h2>
          <Table columns={hitterBoxScoreColumns} data={homeHitterBoxScore} />
          <Table columns={pitcherBoxScoreColumns} data={homePitcherBoxScore} />
        </div>
      )}

      {awayHitterBoxScore.length > 0 && awayPitcherBoxScore.length > 0 && (
        <div>
          <h2>Away Team Box Score</h2>
          <Table columns={hitterBoxScoreColumns} data={awayHitterBoxScore} />
          <Table columns={pitcherBoxScoreColumns} data={awayPitcherBoxScore} />
        </div>
      )}

      {playGameLoading && <div>Simulating Game...</div>}
      {playGameError && <div>Error Simulation: {playGameError.message}</div>}
      <div className='relative mb-6'>
        <div className='absolute bottom-0 w-full h-px bg-slate-200 dark:bg-slate-700' aria-hidden='true'></div>
        <ul className='relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar'>
          <li className='mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8'>
            <a className='block pb-3 text-indigo-500 whitespace-nowrap border-b-2 border-indigo-500' href='#away-team'>
              Away Team
            </a>
          </li>
          <li className='mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8'>
            <a
              className='block pb-3 text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap'
              href='#home-team'
            >
              Home Team
            </a>
          </li>
        </ul>
      </div>

      {currentTab === 'away-team' && (
        <>
          <Table data={awayTeamHitters} columns={hitterColumns} />
          <Table data={awayTeamPitchers} columns={pitcherColumns} />
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
          <Table data={homeTeamHitters} columns={hitterColumns} />
          <Table data={homeTeamPitchers} columns={pitcherColumns} />
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

const processDataForBoscore = (hitterData, pitcherData, team) => {
  // Process hitters from both teams
  const hitters = [...Object.values(hitterData)].map((hitter) => ({
    ...hitter,
    team: team,
    name: hitter.player.name,
    PA: hitter.plateAppearances,
    R: hitter.runs,
    H: hitter.hits,
    '1B': hitter.singles,
    '2B': hitter.doubles,
    '3B': hitter.triples,
    HR: hitter.homeruns,
    RBI: hitter.rbi,
    BB: hitter.walks,
    SO: hitter.strikeouts,
  }));

  // Process pitchers
  const pitcher = {
    name: pitcherData.player.name,
    team: team,
    IP: pitcherData.plateAppearances / 3, // Assuming plate appearances can be directly converted to innings pitched, adjust based on actual logic
    H: pitcherData.hits,
    R: pitcherData.runs,
    ER: pitcherData.runs, // Assuming runs are equivalent to earned runs, adjust if necessary
    BB: pitcherData.walks,
    SO: pitcherData.strikeouts,
  };

  return {
    hitters,
    pitchers: [pitcher],
  };
};
