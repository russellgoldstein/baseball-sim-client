import { createColumnHelper } from '@tanstack/react-table';
import Table from './Table';

export const Linescore = ({ homeLinescore, awayLinescore }) => {
  console.log({ homeLinescore, awayLinescore });
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('inning', {
      header: 'Inning',
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('away', {
      header: 'Away',
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('home', {
      header: 'Home',
      cell: (info) => info.renderValue(),
    }),
  ];

  const data = homeLinescore.map((inning, index) => ({
    inning: index + 1,
    home: homeLinescore[index],
    away: awayLinescore[index],
  }));
  return <Table data={data} columns={columns} />;
};
