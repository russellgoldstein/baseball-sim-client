import TeamList from './TeamList';

export default function MatchupSelector() {
  return (
    <div>
      <h1>Matchup Selector</h1>
      <h2>Away Team</h2>
      <TeamList />

      <h2>Home Team</h2>
      <TeamList />
    </div>
  );
}
