import {SegmentedButtons} from 'react-native-paper';
import React from 'react';

export const ListContextSelectorComponent = () => {
  const [value, setValue] = React.useState('');

  return (
    <SegmentedButtons
      value={value}
      onValueChange={setValue}
      buttons={[
        {
          value: 'family',
          label: 'Family',
        },
        {
          value: 'personal',
          label: 'Personal',
        },
        {
          value: 'all',
          label: 'All',
        },
      ]}
    />
  );
};
