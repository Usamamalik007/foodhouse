import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  // alignitems
  itc: {
    alignItems: 'center',
  },
  its: {
    alignItems: 'flex-start',
  },
  ite: {
    alignItems: 'flex-end',
  },
  // Flex
  flex1: {flex: 1},
  w100: {width: '100%'},
  h100: {height: '100%'},
  // Flex
  // flex direction
  fdrjcsb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // flex direction
  // Font Sizes
  fs55: {
    fontSize: 55,
  },
  fs45: {
    fontSize: 45,
  },
  fs50: {
    fontSize: 50,
  },
  fs40: {
    fontSize: 40,
  },
  fs35: {
    fontSize: 35,
  },
  fs30: {
    fontSize: 30,
  },
  fs25: {
    fontSize: 25,
  },
  fs22: {
    fontSize: 22,
  },
  fs20: {
    fontSize: 20,
  },
  fs18: {
    fontSize: 18,
  },
  fs16: {
    fontSize: 16,
  },
  fs14: {
    fontSize: 14,
  },
  fs12: {
    fontSize: 12,
  },
  fs10: {
    fontSize: 10,
  },
  // Font Sizes
  // Font Families
  ffcg: {
    fontFamily: 'century-gothic',
  },
  ffgt: {
    fontFamily: 'Gotham',
  },
  ffbl: {
    fontFamily: 'OpenSans-Black',
  },
  ffbli: {
    fontFamily: 'OpenSans-BlackItalic',
  },
  ffb: {
    fontFamily: 'OpenSans-Bold',
  },
  ffbi: {
    fontFamily: 'OpenSans-BoldItalic',
  },
  ffi: {
    fontFamily: 'OpenSans-Italic',
  },
  ffl: {
    fontFamily: 'OpenSans-Light',
  },
  ffli: {
    fontFamily: 'OpenSans-LightItalic',
  },
  ffmi: {
    fontFamily: 'OpenSans-MediumItalic',
  },
  ffr: {
    fontFamily: 'OpenSans-Regular',
  },
  ffm: {
    fontFamily: 'OpenSans-Medium',
  },
  ffmt: {
    fontFamily: 'OpenSans-MediumThin',
  },
  ffmti: {
    fontFamily: 'OpenSans-MediumThinItalic',
  },
  // Font Families
  // Colors

  colorWhite: {
    color: '#ffffff',
  },
  colorBlack: {
    color: '#31363b',
  },
  colorBlue: {
    color: '#2856A2',
  },
  colorgreen: {
    color: '#1fcc7c',
  },
  colorLightBlue: {
    color: '#A3C7EE',
  },
  colorlightgreen: {
    color: '#a0ffd3',
  },
  colorlightred: {
    color: '#ff9d98',
  },
  colorred: {
    color: '#f85951',
  },
  colorlightpurple: {
    color: '#7471eb',
  },
  colorpurple: {
    color: '#4733da',
  },
  colorgrey: {
    color: '#a3a3a3',
  },
  colorlightgrey: {
    color: '#fefefe',
  },
  colorlightblack: {
    color: '#191919',
  },
  colorextralightpurple: {
    color: '#e9e8fd',
  },
  colorLightWhite: {
    color: '#758692',
  },

  colorgrey2: {
    color: '#7d7d7d',
  },
  // Colors
  // Background Colors
  bgColorYellow: {
    backgroundColor: '#FFF600',
  },
  bgColorRed: {
    backgroundColor: '#f85951',
  },
  bgColorWhite: {
    backgroundColor: '#ffffff',
  },
  bgcolorblack: {
    backgroundColor: '#000000',
  },
  bgLightBlue: {
    backgroundColor: '#3766b3',
  },
  bgColorBlue: {
    backgroundColor: '#2856a2',
  },
  bgColorGray: {
    backgroundColor: '#e4e9f5',
  },
  bgcolorlightgrey: {
    backgroundColor: '#fefefe',
  },
  bgcolorlightgrey2: {
    backgroundColor: '#f3f3f3',
  },
  bgcolorlightblack: {
    backgroundColor: '#191919',
  },
  bgcolororange: {
    backgroundColor: '#f4a261',
  },
  // Background Colors
  // line Height
  lh5: {
    lineHeight: 5,
  },
  lh10: {
    lineHeight: 10,
  },
  lh15: {
    lineHeight: 15,
  },
  lh20: {
    lineHeight: 20,
  },
  lh25: {
    lineHeight: 25,
  },
  lh30: {
    lineHeight: 30,
  },
  // line Height
  // border Radius
  br5: {
    borderRadius: 5,
  },
  br8: {
    borderRadius: 8,
  },
  br10: {
    borderRadius: 10,
  },
  br12: {
    borderRadius: 12,
  },
  br15: {
    borderRadius: 15,
  },
  br18: {
    borderRadius: 18,
  },
  br20: {
    borderRadius: 20,
  },
  br25: {
    borderRadius: 25,
  },
  br30: {
    borderRadius: 30,
  },

  br35: {
    borderRadius: 35,
  },
  br40: {
    borderRadius: 40,
  },
  br45: {
    borderRadius: 45,
  },
  br50: {
    borderRadius: 50,
  },
  br55: {
    borderRadius: 55,
  },
  br60: {
    borderRadius: 60,
  },
  // border Radius

  // Padding
  p5: {padding: 5},
  p10: {padding: 10},
  p15: {padding: 15},
  p20: {padding: 20},
  p25: {padding: 25},
  p30: {padding: 30},
  p35: {padding: 35},
  p40: {padding: 40},
  p45: {padding: 45},
  // Padding
  // paddingRight
  pr5: {paddingRight: 5},
  pr10: {paddingRight: 10},
  pr15: {paddingRight: 15},
  pr20: {paddingRight: 20},
  pr25: {paddingRight: 25},
  pr30: {paddingRight: 30},
  pr35: {paddingRight: 35},
  pr40: {paddingRight: 40},
  pr45: {paddingRight: 45},
  // paddingRight
  // paddingTop
  pt5: {paddingTop: 5},
  pt10: {paddingTop: 10},
  pt15: {paddingTop: 15},
  pt20: {paddingTop: 20},
  pt25: {paddingTop: 25},
  pt30: {paddingTop: 30},
  pt35: {paddingTop: 35},
  pt40: {paddingTop: 40},
  pt45: {paddingTop: 45},
  // paddingTop
  // paddingBottom
  pb5: {paddingBottom: 5},
  pb10: {paddingBottom: 10},
  pb15: {paddingBottom: 15},
  pb20: {paddingBottom: 20},
  pb25: {paddingBottom: 25},
  pb30: {paddingBottom: 30},
  pb35: {paddingBottom: 35},
  pb40: {paddingBottom: 40},
  pb45: {paddingBottom: 45},
  // paddingBottom
  // paddingLeft
  pl5: {paddingLeft: 5},
  pl10: {paddingLeft: 10},
  pl15: {paddingLeft: 15},
  pl20: {paddingLeft: 20},
  pl25: {paddingLeft: 25},
  pl30: {paddingLeft: 30},
  pl35: {paddingLeft: 35},
  pl40: {paddingLeft: 40},
  pl45: {paddingLeft: 45},
  // paddingLeft
  // paddingHorizontal
  ph5: {paddingHorizontal: 5},
  ph10: {paddingHorizontal: 10},
  ph15: {paddingHorizontal: 15},
  ph20: {paddingHorizontal: 20},
  ph25: {paddingHorizontal: 25},
  ph30: {paddingHorizontal: 30},
  ph35: {paddingHorizontal: 35},
  ph40: {paddingHorizontal: 40},
  ph45: {paddingHorizontal: 45},
  // paddingHorizontal
  // paddingVertical
  pv5: {paddingVertical: 5},
  pv10: {paddingVertical: 10},
  pv15: {paddingVertical: 15},
  pv20: {paddingVertical: 20},
  pv25: {paddingVertical: 25},
  pv30: {paddingVertical: 30},
  pv35: {paddingVertical: 35},
  pv40: {paddingVertical: 40},
  pv45: {paddingVertical: 45},
  // paddingVertical
  // margin
  m10: {margin: 10},
  m15: {margin: 15},
  m20: {margin: 20},
  m25: {margin: 25},
  m30: {margin: 30},
  m35: {margin: 35},
  m40: {margin: 40},
  m45: {margin: 45},
  // margin
  // paddingRight
  mr5: {marginRight: 5},
  mr10: {marginRight: 10},
  mr15: {marginRight: 15},
  mr20: {marginRight: 20},
  mr25: {marginRight: 25},
  mr30: {marginRight: 30},
  mr35: {marginRight: 35},
  mr40: {marginRight: 40},
  mr45: {marginRight: 45},
  // marginRight
  // marginTop
  mt5: {marginTop: 5},
  mt10: {marginTop: 10},
  mt15: {marginTop: 15},
  mt20: {marginTop: 20},
  mt25: {marginTop: 25},
  mt30: {marginTop: 30},
  mt35: {marginTop: 35},
  mt40: {marginTop: 40},
  mt45: {marginTop: 45},
  // marginTop
  // marginBottom
  mb5: {marginBottom: 5},
  mb10: {marginBottom: 10},
  mb15: {marginBottom: 15},
  mb20: {marginBottom: 20},
  mb25: {marginBottom: 25},
  mb30: {marginBottom: 30},
  mb35: {marginBottom: 35},
  mb40: {marginBottom: 40},
  mb45: {marginBottom: 45},
  mb60: {marginBottom: 60},
  // marginBottom
  // marginLeft
  ml5: {marginLeft: 5},
  ml10: {marginLeft: 10},
  ml15: {marginLeft: 15},
  ml20: {marginLeft: 20},
  ml25: {marginLeft: 25},
  ml30: {marginLeft: 30},
  ml35: {marginLeft: 35},
  ml40: {marginLeft: 40},
  ml45: {marginLeft: 45},
  // marginLeft

  // Shadow of box
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.074,
    shadowRadius: 3.84,

    elevation: 4,
  },

  // shadow of box

  Container: {
    flex: 1,
    padding: 16,
  },
  mapcontainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  cardview: {},
  WelcomeContent: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 32,
  },
  LoginContainer: {
    paddingHorizontal: 40,
  },
  LoginContent: {
    paddingTop: 20,
  },
  RegisterContent: {
    flex: 1,
    padding: 48,
  },
  VerifyContent: {
    flex: 1,
    padding: 48,
  },
  borderStyleBase: {
    width: 40,
    height: 65,
    backgroundColor: 'red',
  },
  borderStyleHighLighted: {
    borderColor: 'red',
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: 'grey',
  },
  // Welcome screen CSS
  headingwelcome: {
    paddingVertical: 8,
  },
  descwelcome: {
    paddingVertical: 20,
    textAlign: 'center',
  },
  // Welcome screen CSS
  // Help Screen CSS
  cardhelp: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  shadow2: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  shadow5: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 40,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Help Screen CSS
  inputField: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    borderColor: '#d8dfe4',
    borderWidth: 1,
    height: 60,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
    overflow: 'hidden',
  },
  inputFields: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    borderColor: '#d8dfe4',
    borderWidth: 1,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
    overflow: 'hidden',
  },
  icon: {
    marginLeft: 12,
  },
  errorField: {
    fontSize: 14,
    color: 'red',
    fontFamily: 'OpenSans-Regular',
  },
  inputFieldText: {
    height: 40,
    width: '80%',
    fontSize: 16,
    marginLeft: 20,
    color: '#31363b',
    fontFamily: 'OpenSans-Regular',
  },
  dropdown: {
    width: (Dimensions.get('screen').width - 130) / 2,
    borderWidth: 0,
    marginTop: -15,
    paddingLeft: 10,
  },
  Dropdown: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: '#31363b',
  },
  camerabtn: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  menuview: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menutxt: {
    color: '#7d7d7d',
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
  uploadBox: {
    marginTop: 20,

    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    height: 130,
  },
  customLargeText: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    color: '#fff',
  },
  smallButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#3766B3',
    borderRadius: 5,
  },
  backgroundVideo: {
    width: Dimensions.get('screen').width - 40,
    height: 230,
  },
  profileViewSP: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewInner: {
    padding: 16,
  },
  Maintext: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 30,
  },
  profiletext: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
  },
  infotext: {
    fontSize: 12,
    fontWeight: '400',
  },
  photouploadtext: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'left',
  },
  steptxt: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left',
    color: '#C4C4C4',
  },
  basicinfotitletxt: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    color: '#CB9B37',
  },
  dropdownstyle: {
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 5,
  },
  joblistview: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#E4E2E2',
  },
  jobdetaillistview: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  login_top_text: {
    fontSize: 20,
    fontFamily: 'OpenSans-Regular',
    // fontWeight: '500',
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 30,
  },
  introTextView: {
    marginTop: 15,
    marginBottom: 5,
  },
  introText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  blogsOptionsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 0,
  },
  blogOptionText: {
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(41, 28, 28, 0.13)',
    borderRadius: 1,
    padding: 20,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  backgroundVideoNew: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
  },

  fdr: {
    flexDirection: 'row',
  },
  fdc: {
    flexDirection: 'column',
  },

  off: {
    alignSelf: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 7,
    paddingVertical: 5,
    backgroundColor: '#CE3E3E',
    color: 'white',
    width: 70,
    position: 'absolute',
    right: 5,
    top: 10,
    zIndex: 1000,
  },
  favourite: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    width: 45,
    position: 'absolute',
    right: 5,
    bottom: 80,
    zIndex: 1000,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150 / 2,
  },
});

const colors = {
  primary: '#31363b',
};

export default styles;
