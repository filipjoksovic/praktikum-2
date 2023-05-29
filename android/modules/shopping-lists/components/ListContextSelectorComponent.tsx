import {SegmentedButtons} from 'react-native-paper';
import React from 'react';
import {TouchableNativeFeedback, View} from 'react-native';

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
      ]}
    />
  );
};
