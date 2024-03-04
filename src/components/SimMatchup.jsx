import { useState } from 'react';
import { usePlayGameMutation } from '../services/myApi';
import { GameBoxScore } from './GameBoxScore';
import { Linescore } from './Linescore';

export const SimMatchup = ({ awayTeamHitters, awayTeamPitchers, homeTeamHitters, homeTeamPitchers }) => {
  const [homeBoxScore, setHomeBoxScore] = useState([]);
  const [awayBoxScore, setAwayBoxScore] = useState([]);
  const [homeLinescore, setHomeLinescore] = useState([]);
  const [awayLinescore, setAwayLinescore] = useState([]);

  const [playGame, { error: playGameError, isLoading: playGameLoading }] = usePlayGameMutation();

  const submitMatchup = async () => {
    console.log('Submit Matchup');
    const result = await playGame({
      awayTeamHitters,
      awayTeamPitchers,
      homeTeamHitters,
      homeTeamPitchers,
    });
    const { homeHitters, homePitcher, awayHitters, awayPitcher } = result.data.boxscore;
    const { home: homeLinescore, away: awayLinescore } = result.data.linescore;
    setHomeLinescore(homeLinescore);
    setAwayLinescore(awayLinescore);
    const homeBoxScore = processDataForBoscore(homeHitters, homePitcher, 'home');
    const awayBoxScore = processDataForBoscore(awayHitters, awayPitcher, 'away');
    console.log(homeBoxScore);
    console.log(awayBoxScore);
    setHomeBoxScore(homeBoxScore);
    setAwayBoxScore(awayBoxScore);
  };

  console.log('in SimMatchup', { homeBoxScore, awayBoxScore });
  return (
    <>
      <button onClick={submitMatchup}>Submit Matchup</button>
      {playGameLoading && <div>Simulating Game...</div>}
      {playGameError && <div>Error Simulation: {playGameError.message}</div>}
      <div>
        {homeBoxScore.hitters &&
          homeBoxScore.hitters.length > 0 &&
          awayBoxScore.pitchers &&
          awayBoxScore.pitchers.length > 0 && (
            <>
              <Linescore homeLinescore={homeLinescore} awayLinescore={awayLinescore} />
              <GameBoxScore homeBoxScore={homeBoxScore} awayBoxScore={awayBoxScore} />
            </>
          )}
      </div>
    </>
  );
};

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
    IP: pitcherData.outs / 3, // Assuming plate appearances can be directly converted to innings pitched, adjust based on actual logic
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
