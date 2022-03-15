/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {appColors} from '../utils/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useController} from 'react-hook-form';
import {Value} from 'react-native-reanimated';

interface AppDatePicker {
  name: string;
  control?: any;
  outerViewProps?: ViewProps;
  textInputProps?: TextInputProps;
  icon?: React.FC<SvgProps>;
  minimumDate?: Date;
}

export function AppDatePicker({
  name,
  control,
  minimumDate,
  icon: Icon,
  outerViewProps = {},
  textInputProps = {},
}: AppDatePicker) {
  const {field} = useController({name, control});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: Date) => {
    field.onChange(date);

    console.log(date);
    setSelectedDate(date.toDateString());
    hideDatePicker();
  };
  const {style: outerViewStyle, ...outerViewRestProps} = outerViewProps;
  const {style: textInputStyle, ...textInputRest} = textInputProps;
  return (
    <TouchableOpacity
      onPress={showDatePicker}
      style={[
        {
          flexDirection: 'row',
          height: 50,
          borderWidth: 1,
          marginVertical: 8,
          borderColor: appColors.inputBorder,
          alignItems: 'center',
          // borderRadius: 5,
        },
        outerViewStyle,
      ]}
      {...outerViewRestProps}>
      <TextInput
        editable={false}
        {...textInputRest}
        placeholderTextColor="#B9B9B9"
        style={[
          {fontSize: 18, padding: 12, flex: 1, color: '#000000'},
          textInputStyle,
        ]}
        value={selectedDate}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={minimumDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </TouchableOpacity>
  );
}
