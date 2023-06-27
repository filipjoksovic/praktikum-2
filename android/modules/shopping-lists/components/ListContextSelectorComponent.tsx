import {SegmentedButtons} from 'react-native-paper';
import React from 'react';
import {localization} from '../../../resources/localization';

export const ListContextSelectorComponent = () => {
  const [value, setValue] = React.useState('');

  return (
    <SegmentedButtons
      value={value}
      onValueChange={setValue}
      buttons={[
        {
          value: 'family',
          label: localization.GLOBAL.FAMILY_LABEL,
        },
        {
          value: 'personal',
          label: localization.GLOBAL.PERSONAL_LABEL,
        },
      ]}
    />
  );
};
