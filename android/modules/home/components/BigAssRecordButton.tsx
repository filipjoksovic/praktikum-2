import {useEffect, useRef, useState} from 'react';
import {Easing} from 'react-native';
import {Animated, View} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';

export interface IRecordButtonProps {
  onPress: any;
  mainCircleWidth: number;
}

export const BigAssRecordButton = (props: IRecordButtonProps) => {
  const {mainCircleWidth} = props;
  const pressed = () => {
    props.onPress();
  };
  return (
    <Animated.View>
      <View
        style={{
          borderRadius: 100000,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          width: mainCircleWidth,
          height: mainCircleWidth,
          shadowColor: 'black',
          elevation: 10,
        }}>
        <TouchableRipple
          onPress={pressed}
          style={{
            width: mainCircleWidth,
            height: mainCircleWidth,
            borderRadius: 10000,
            backgroundColor: '#AA4D4D',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: mainCircleWidth * 0.8,
              height: mainCircleWidth * 0.8,
              borderRadius: 100000,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              shadowColor: 'black',
              elevation: 10,
            }}>
            <TouchableRipple
              style={{
                width: mainCircleWidth * 0.8,
                height: mainCircleWidth * 0.8,
                backgroundColor: '#C19797',
                borderRadius: 10000,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={pressed}>
              <View
                style={{
                  width: mainCircleWidth * 0.5,
                  height: mainCircleWidth * 0.5,
                  borderRadius: 10000,
                  overflow: 'hidden',
                  shadowColor: 'black',
                  elevation: 10,
                }}>
                <TouchableRipple
                  onPress={pressed}
                  style={{
                    width: mainCircleWidth * 0.5,
                    height: mainCircleWidth * 0.5,
                    backgroundColor: '#E9E9E9',
                    borderRadius: 10000,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View></View>
                </TouchableRipple>
              </View>
            </TouchableRipple>
          </View>
        </TouchableRipple>
      </View>
    </Animated.View>
  );
};
