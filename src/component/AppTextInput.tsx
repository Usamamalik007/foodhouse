import React from 'react';
import {useController} from 'react-hook-form';
import {
  TouchableOpacity,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {appColors} from '../utils/colors';

interface IAppTextInput {
  name?: any;
  control?: any;
  outerViewProps?: ViewProps;
  textInputProps?: TextInputProps;
  icon?: React.FC<SvgProps>;
  IconProps?: any;
  setCurrentValue?: any;
}

export function AppTextInput({
  name,
  control,
  outerViewProps = {},
  textInputProps = {},
  setCurrentValue,
  icon: Icon,
  IconProps = {},
}: IAppTextInput) {
  const {style: outerViewStyle, ...outerViewRestProps} = outerViewProps;
  const {style: textInputStyle, ...textInputRest} = textInputProps;
  const {style: IconStyle, ...IconRest} = IconProps;
  const {field} = useController({name, control});

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          height: 40,
          borderWidth: 1,
          marginVertical: 8,
          borderColor: appColors.inputBorder,
          alignItems: 'center',
          borderRadius:5
        },
        outerViewStyle,
      ]}
      {...outerViewRestProps}>
      <TextInput
        {...textInputRest}
        placeholderTextColor="#B9B9B9"
        onChangeText={e => {
          setCurrentValue && setCurrentValue(e);
          field.onChange(e);
        }}
        value={field.value}
        style={[
          {
            fontSize: 18,
            padding: 10,
            flex: 1,
            fontFamily: 'OpenSans-Regular',
            color: '#000000',
          },
          textInputStyle,
        ]}
      />
      {!!Icon && (
        <TouchableOpacity
          style={[{flexShrink: 0, marginRight: 8}, IconStyle]}
          {...IconRest}>
          <Icon />
        </TouchableOpacity>
      )}
    </View>
  );
}
