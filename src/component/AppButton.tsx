import React, {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

interface IAppButton {
  buttonProps?: TouchableOpacityProps;
  innerTextProps?: TextProps;
  text: string;
  isLoading?: boolean;
}
export function AppButton({
  buttonProps = {},
  innerTextProps = {},
  text,
  isLoading,
}: IAppButton) {
  const {style: buttonStyle, ...buttonRest} = buttonProps;
  const {style: textStyle, ...textRest} = innerTextProps;

  return (
    <TouchableOpacity
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          height: 45,
          borderRadius:5
        },
        buttonStyle,
      ]}
      {...buttonRest}>
      {!isLoading ? (
        <Text
          style={[
            {fontSize: 20, fontFamily: 'OpenSans-Regular', color: 'white'},
            textStyle,
          ]}
          {...textRest}>
          {text}
        </Text>
      ) : (
        <ActivityIndicator size="large" color="white" />
      )}
    </TouchableOpacity>
  );
}
