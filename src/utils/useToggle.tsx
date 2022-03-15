import {useState} from 'react';

export function useToggler(): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  () => void,
] {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => {
    setIsOn(prev => !prev);
  };
  return [isOn, setIsOn, toggle];
}
