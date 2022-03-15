import {format} from 'date-fns';

export function tConvert(time: string): string {
  if (time) {
    var hours = parseInt(time.substring(0, 2));
    var minutes = parseInt(time.substring(3, 5));
    var displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    var suffix = hours >= 12 ? 'PM' : 'AM';
    var finalTime =
      ((hours + 11) % 12) + 1 + ':' + displayMinutes + ' ' + suffix;

    return finalTime;
  }
  return '';
}

export function dConvert(time: string): string {
  if (time && time != '' && time != null) {
    return format(new Date(time), 'MM-dd-y').toString();
  }
  return '';
}

export function dConverttoSendRequest(time: string): string {
  if (time) {
    return format(new Date(time), 'y-MM-dd').toString();
  }
  return '';
}
