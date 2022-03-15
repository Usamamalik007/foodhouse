import Snackbar from 'react-native-snackbar';
export function SnackbarError(msg: string) {
    Snackbar.show({
        text: msg,
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'OK',
          onPress() {
            Snackbar.dismiss();
          },
        },
      });
}
export function SnackbarSuccess(msg: string) {
  Snackbar.show({
      text: msg,
      backgroundColor: 'green',
      duration: Snackbar.LENGTH_SHORT,
      action: {
        text: 'OK',
        onPress() {
          Snackbar.dismiss();
        },
      },
    });
}