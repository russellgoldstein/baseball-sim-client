import React from 'react';
import './index.css';
import Table from './Table';
import { getDefaultPitcherColumns } from '../utils/consts';

const columns = getDefaultPitcherColumns();

export default function TeamPitchersLineupTable({ lineup }) {
  return <Table data={lineup} columns={columns} />;
}
