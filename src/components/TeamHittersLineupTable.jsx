import React from 'react';
import './index.css';
import Table from './Table';
import { getDefaultHitterColumns } from '../utils/consts';

const columns = getDefaultHitterColumns();

export default function TeamHittersLineupTable({ lineup }) {
  return <Table data={lineup} columns={columns} />;
}
