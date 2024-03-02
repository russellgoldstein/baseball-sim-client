import { useState } from 'react';
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
      <h1>Matchup Selector</h1>
      <h2>Away Team</h2>
      <Table data={awayTeamHitters} columns={hitterColumns} />
      <Table data={awayTeamPitchers} columns={pitcherColumns} />
      <TeamList
        hittingLineup={awayTeamHitters}
        setHittingLineup={setAwayTeamHitters}
        pitchingLineup={awayTeamPitchers}
        setPitchingLineup={setAwayTeamPitchers}
      />

      <h2>Home Team</h2>
      <Table data={homeTeamHitters} columns={hitterColumns} />
      <Table data={homeTeamPitchers} columns={pitcherColumns} />
      <TeamList
        hittingLineup={homeTeamHitters}
        setHittingLineup={setHomeTeamHitters}
        pitchingLineup={homeTeamPitchers}
        setPitchingLineup={setHomeTeamPitchers}
      />
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
