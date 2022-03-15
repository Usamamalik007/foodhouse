/* eslint-disable react-native/no-inline-styles */
// import {bool} from 'aws-sdk/clients/signer';
import React, {useEffect, useState, memo} from 'react';
import {useController} from 'react-hook-form';
import {TextInputProps, ViewProps} from 'react-native';
import DropDownPicker, {
  DropDownPickerProps,
} from 'react-native-dropdown-picker';
import styles from '../assets/css/style';
interface AppDropdown {
  name?: any; //should be string
  control?: any;
  outerViewProps?: ViewProps;
  dropdownInputProps?: Partial<DropDownPickerProps>;
  textProps?: Partial<DropDownPickerProps>;
  data?: any;
  isLoading?: boolean;
  disabled?: boolean;
  setCurrentValue?: any;
  currentValue?: any;
}
export default function AppDropdown({
  name,
  control,
  outerViewProps = {},
  dropdownInputProps = {},
  textProps = {},
  data,
  isLoading,
  disabled,
  setCurrentValue,
  currentValue,
}: AppDropdown) {
  const {field} = useController({name, control});

  const [opendropdown, setopendropdown] = useState(false);
  const [valuedropdown, setvaluedropdown] = useState(null);
  const [itemsdropdown, setitemsdropdown] = useState(data);
  const {textStyle: textPropsStyle, ...textRestProps} = textProps;
  const {style: outerViewStyle, ...outerViewRestProps} = outerViewProps;
  const {
    style: textInputStyle,
    open,
    value,
    setOpen,
    setValue,
    ...restOfdropdownInputProps
  } = dropdownInputProps;

  useEffect(() => {
    currentValue && setvaluedropdown(currentValue);
  }, [currentValue]);

  useEffect(() => {
    setitemsdropdown(data);
  }, [isLoading]);

  return (
    <DropDownPicker
      style={[styles.dropdownstyle, outerViewStyle]}
      labelStyle={{color: '#212326', fontSize: 14}}
      textStyle={[
        {color: '#383A3D', fontSize: 14, fontWeight: '400'},
        textPropsStyle,
      ]}
      placeholderStyle={{color: '#B9B9B9'}}
      min={1}
      zIndex={3000}
      zIndexInverse={1000}
      open={opendropdown}
      value={valuedropdown}
      listMode="MODAL"
      mode="SIMPLE"
      items={itemsdropdown}
      setValue={setvaluedropdown}
      setOpen={setopendropdown}
      setItems={setitemsdropdown}
      onChangeValue={(value: any) => {
        setCurrentValue && setCurrentValue(value);
        field.onChange(value);
        console.log(value);
      }}
      loading={isLoading}
      disabled={isLoading || disabled}
      {...restOfdropdownInputProps}
    />
  );
}
