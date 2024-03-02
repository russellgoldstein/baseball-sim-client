import React from 'react';
import Table from './Table';

export default function BoxScoreTable({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'player.name',
      },
      {
        Header: 'Team',
        accessor: 'team',
      },
      {
        Header: 'PA',
        accessor: 'plateAppearances',
      },
      {
        Header: 'R',
        accessor: 'runs',
      },
      {
        Header: 'H',
        accessor: 'hits',
      },
      {
        Header: '1B',
        accessor: 'singles',
      },
      {
        Header: '2B',
        accessor: 'doubles',
      },
      {
        Header: '3B',
        accessor: 'triples',
      },
      {
        Header: 'HR',
        accessor: 'homeruns',
      },
      {
        Header: 'RBI',
        accessor: 'rbi',
      },
      {
        Header: 'BB',
        accessor: 'walks',
      },
      {
        Header: 'SO',
        accessor: 'strikeouts',
      },
    ],
    []
  );
  return <Table columns={columns} data={data} />;
}
