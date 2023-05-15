import {ScrollView, Text, View} from 'react-native';
import {
  LAYOUT,
  STYLESHEET,
  TYPO,
} from '../../../../resources/styles/STYLESHEET';
import {CustomTextInput} from '../../../shared/components/CustomTextInput';
import DatePicker from 'react-native-date-picker';
import {CustomButton} from '../../../shared/components/CustomButton';
import React from 'react';

export const AccountSetup = () => {
  const handleChange = ({name, value}: {name: string; value: string}) => {};
  const submitData = () => {};
  return (
    <ScrollView style={{...LAYOUT.container}}>
      <View>
        <Text style={{...TYPO.heading_one, ...TYPO.bold}}>
          Welcome to WishList!
        </Text>
        <Text style={{...TYPO.heading_four, marginBottom: 10}}>
          It's a pleasure to meet you.
        </Text>
        <Text style={TYPO.paragraph}>
          Though, before you begin using the application, we'll need you to tell
          us a bit about yourself
        </Text>
      </View>
      <View>
        <CustomTextInput
          labelText={'First name'}
          value={''}
          name={'fname'}
          onChangeEmit={handleChange}
          style={{marginBottom: 20, marginTop: 20}}
        />
        <CustomTextInput
          labelText={'Last name'}
          value={'Last name'}
          name={'lname'}
          onChangeEmit={handleChange}
          style={{marginBottom: 30}}
        />
        <View style={{width: '100%'}}>
          <Text style={TYPO.heading_four}>Date of birth</Text>

          <DatePicker
            date={new Date()}
            androidVariant={'nativeAndroid'}
            mode={'date'}
            textColor={STYLESHEET.colors.text_light}
            title={'Date of birth'}
            style={{alignItems: 'center'}}
          />
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <CustomButton
          text={'Proceed'}
          onPressHandler={submitData}
          style={{width: '50%', marginTop: 20, marginBottom: 30}}
        />
      </View>
    </ScrollView>
  );
};
