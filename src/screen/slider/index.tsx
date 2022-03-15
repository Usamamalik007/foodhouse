import React, {useCallback, useState} from 'react';
import RangeSliderRN from 'rn-range-slider';
import {View, Text} from 'react-native';

import Label from './Label';
import Notch from './Notch';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Thumb from './Thumb';

const RangeSlider = ({from, to, setFilterData}: any) => {
  const [low, setLow] = useState(from);
  const [high, setHigh] = useState(to);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  const handleValueChange = useCallback(
    (newLow, newHigh) => {
      if (newLow !== from && newHigh !== to) {
        setFilterData((prev: any) => ({
          ...prev,
          ageMin: newLow,
          ageMax: newHigh,
        }));
      }
      setLow(newLow);
      setHigh(newHigh);
    },
    [setLow, setHigh],
  );

  return (
    <View style={{paddingHorizontal: 10}}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 3,
        }}>
        <Text
          style={[
            {
              fontSize: 18,
              color: '#000000',
              fontWeight: '700',
              marginVertical: 6,
            },
          ]}>
          Price $
        </Text>
      </View>

      <RangeSliderRN
        min={from}
        max={to}
        step={1}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        onValueChanged={handleValueChange}
      />

      <View style={{flexDirection: 'row', marginTop: 13, marginBottom: 5}}>
        <Text
          style={{
            width: 180,
            // paddingHorizontal: 75,
            paddingVertical: 12,
            borderColor: '#696B6D',
            borderWidth: 1,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            textAlign: 'center',
          }}>
          {low}
        </Text>
        <Text
          style={{
            width: 180,
            // paddingHorizontal: 75,
            paddingVertical: 12,
            borderColor: '#696B6D',
            borderWidth: 1,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            textAlign: 'center',
          }}>
          {high}
        </Text>
      </View>
    </View>
  );
};

export default RangeSlider;
