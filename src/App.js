import React from 'react';
import { useGetItemsQuery } from './services/myApi';
import MyTable from './components/MyTable';

function App() {
  const { data, error, isLoading } = useGetItemsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Assuming `data` is the array of items you want to display
  return (
    <MyTable
      data={
        data || [
          { id: 1, name: 'First item' },
          { id: 2, name: 'Second item' },
          // Add more items as needed
        ]
      }
    />
  );
}

export default App;
