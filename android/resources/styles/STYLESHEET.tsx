import {StyleSheet} from 'react-native';

export const STYLESHEET = {
  colors: {
    bg_light: '#E9E9E9',
    text_light: '#505050',
    accent: '#FFEFD3',
    primary: '#FFC49B',
  },
  typo: {
    heading_one: 48,
    heading_two: 40,
    heading_three: 30,
    heading_four: 24,
    paragraph: 16,
    small: 12,
  },
};

export const TYPO = StyleSheet.create({
  heading_one: {
    fontSize: STYLESHEET.typo.heading_one,
    color: STYLESHEET.colors.text_light,
  },
  heading_two: {
    fontSize: STYLESHEET.typo.heading_two,
    color: STYLESHEET.colors.text_light,
  },
  heading_three: {
    fontSize: STYLESHEET.typo.heading_three,
    color: STYLESHEET.colors.text_light,
  },
  heading_four: {
    fontSize: STYLESHEET.typo.heading_four,
    color: STYLESHEET.colors.text_light,
  },
  bold: {
    fontWeight: 'bold',
  },
  medium: {
    fontWeight: 'normal',
  },
});

export const INPUTS = StyleSheet.create({
  text_input: {
    color: STYLESHEET.colors.text_light,
    backgroundColor: '#F1F1F1',
    borderStyle: 'solid',
    borderColor: '#D9D9D9',
    borderRadius: 7,
    width: '100%',
    borderWidth: 1,
    paddingLeft: 10,
    shadowColor: 'black',
    elevation: 10,
  },
});

export const BUTTONS = StyleSheet.create({
  primary: {
    //todo
    backgroundColor: STYLESHEET.colors.primary,
    paddingHorizontal: 52,
    paddingVertical: 16,
    borderRadius: 100,
    text: {
      color: STYLESHEET.colors.text_light,
      fontSize: 16,
    },
    shadowColor: '000000',
    elevation: 10,
  },
  accent: {
    backgroundColor: STYLESHEET.colors.accent,
    paddingHorizontal: 52,
    paddingVertical: 13,
  },
});

export const PADDINGS = StyleSheet.create({
  mt_10: {
    marginTop: 10,
  },
});
