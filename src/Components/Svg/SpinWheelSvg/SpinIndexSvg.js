import * as React from 'react';
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Mask,
  Circle,
  ClipPath,
} from 'react-native-svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {View} from 'react-native';

function SpinFortune(props) {
  return (
    <Svg viewBox="0 0 1600 420" width={wp('75%')} height={wp('30%')} {...props}>
      <Path
        d="M320 14h942l16 4 10 4 12 8 7 6 11 14 7 15 3 12 1 7v138h258l2 2-1 5-27 15-23 13-75 42-23 13-14 8h-2v2l6 2 25 14 23 13 109 61 1 6-3 2-166-4-199-5-21-3-17-5-16-8-10-6-14-11-8-8-9-12H475l-7 9-9 10-12 10-16 10-19 8-16 4-16 2-359 9h-6l-3-2v-5l23-13 25-14 23-13 91-51h2v-2l-6-2-21-12-100-56-23-13-14-8-1-5 2-2h240V88l2-15 5-15 8-13 9-10 9-8 15-8 13-4z"
        fill="#F8B245"
      />
      <Path
        d="M529 55h16l14 2 13 4 13 7 11 11 5 9 1-31h88l15 3 12 5 6 5 1-14h177v44l-8 2v19l3 7 2 1h9l3-2 1-3 1-23-8-1-1-11V56h128l9 13v2h2v3h2v3h2l-1-21h166l1 50h-19v20h18l1 1v49l-1 1h-171l-13-19-2-1v20h-59v-44l9-1-1-30-8-1h-5v23l-3 16-5 12-8 11-8 7-13 6-9 2h-28l-12-3-14-7-10-9-7-10-5-14-2-13v-15h-23l-3-3-1 28 9 1v44l-55 1h-21l-1-1v-43l9-2-1-28-2 3h-17l-3 9-5 7-7 5v2l2 1 2 4 2 1 3 5 2 1 3 5 2 2v29h-56l-5-9-1 9h-68l-1-32-7 11-10 10-16 8-12 3-7 1h-25l-16-3-13-5v-2l-5-2-5-3-10-14-5-12-2-9-1-21h-4l-1 31-8-1-2-1v41h-77v-44l9-1-1-30-8-2V57h101l1 24 7-8 4-5 14-7 9-3 9-2z"
        fill="#733101"
      />
      <Path
        d="M488 195h255v44h2v-44h360v43l-9 2v32l9-7h22v50l-47 1H746l-1-43-1-1-1 44h-77v-44l9-1v-30h-15l-3 10-22 59-3 6h-60l-4-10-4-11-7 22h-61l-22-58-6-16-7-2-6-1v-44z"
        fill="#712F00"
      />
      <Path
        d="M664 240h9l2 1v30l-9 1v44h77v-44l1-1h6l-4 2v43h382v-10l5 1 4 2 1-3h13l-1 3 7-1 2-2 8 1 5-1h11v2h7l3-2 40 1 1 2h6v-2h7v2h3v-2h41l6 1v2l5-3 6 1 5-1h10l-1 6-9 14-9 10-8 7-15 8-14 4-11 2h-131l-804-1-21-5-10-5v-2l-5-2-12-11-8-11-7-14-2-9 3 1 12 1 1 3 4-1 2 1 1-3h36l3 1 1 2 4 1 1-4h12l21 1 3 1 2-1h18l1 3h2l1-3h7l4 2 4 1v-3h36l1 3 6-3h20v3l5-2 18-1 4-2v2h2l5 13v3h61l1-7 5-15 2-1 7 21h60l18-48 10-26z"
        fill="#FDB382"
      />
      <Path
        d="M1328 222h259l2 2-1 5-27 15-23 13-75 42-23 13-14 8h-2v2l6 2 25 14 23 13 109 61 1 6-3 2-166-4-199-5-21-3-17-5-16-8-10-6-14-11-8-8-8-10v-2l130-1 19-4 12-5 10-6 10-9 8-10 6-10 5-15 1-7zM13 222h241l1 69 4 16 8 16 8 10 10 9 5 3v2l5 1 8 4 18 4 154 1-4 7-14 15-16 12-16 9-16 6-19 4-10 1-359 9h-6l-3-2v-5l23-13 25-14 23-13 91-51h2v-2l-6-2-21-12-100-56-23-13-14-8-1-5z"
        fill="#C87D24"
      />
      <Path
        d="M462 203h68v30l-6 2 2 9 8 26 3-8 8-27-7-2v-30h68v30l-7 1 11 37 10-33 1-4h-5l-1-1v-30h50v29l-3 2-7 2-6 16-4 9-5 15-4 10-6 16-3 7h-50l-12-35v-3h-2l-2 9-5 16-4 12-1 1h-50l-5-14-5-12-6-17-4-9-6-16-2-5-11-3z"
        fill="#F8B245"
      />
      <Path
        d="M674 202h61l1 1v30l-9 1v13h35v-13l-9-1v-31h62v31l-8 2-1 42 9 1v31h-62v-31l9-1v-14h-35v14l8 1 1 1v29l-1 1h-62v-30l5-2h4l-1-42-8-2v-30z"
        fill="#F7B144"
      />
      <Path
        d="M1053 63h45v31l-9 1v43l9 1v30l-1 1h-53l-5-7v-3h-2l-9-13v-3h-2l-9-14-7-10v17l8 2v31h-44l-1-1v-29l5-2h4V95l-8-1V64h54v3h2v3h2v3h2l5 9 6 8v3h2v3h2v3h2l5 9 4 5v3h2V95l-9-1z"
        fill="#FBF576"
      />
      <Path
        d="M522 63h27l14 3 12 5 11 8 4 4v3h2l4 10 3 9v22l-3 12-7 13-8 8h-3v2h-3v2l-12 5-17 3h-19l-13-2-11-4-10-6-8-8-2-3v-3h-2l-5-14-1-5v-21l4-14 3-6h2l2-4 4-5 4-3h2v-2l11-5z"
        fill="#FBD959"
      />
      <Path
        d="M609 64h78l18 4 10 5 6 7 3 6v19l-3 8-4 5-10 6h-3l5 9 9 11 7 8v18h-45l-8-15-6-16-1-7h-3v38h-53v-30l8-2V96l-7-1-1-1z"
        fill="#FBF676"
      />
      <Path
        d="M836 64h57v30l-7 2v30l1 5h2l4 4 2 1h14l6-3 3-5 1-4 1-29-9-1V64h51v30l-9 1v31l-3 15-3 7h-2l-1 4-7 8-3 3h-3v2l-9 4-9 2h-23l-16-4-10-6-7-6-7-11-3-7-2-12V95h-7l-2-1z"
        fill="#FBF677"
      />
      <Path
        d="M829 202h93v35l-1 1h-11l-10-5-12-3-6-1v18l18-4h3v25l-16-3-5-2v19l10-2 12-4 5-3h13v35l-1 1h-92v-31l8-2 1-42-9-1zM932 202h93v36h-12l-12-6-15-3v18l16-4h4v25l-19-4-1 17 13-2 9-4 5-3h11l1 1v35h-93v-30l8-2 1-42-9-1z"
        fill="#F7B144"
      />
      <Path
        d="M1111 63h93v35h-13l-7-4-10-3-10-1 1 18 20-4v24l-10-1-10-2v17l15-2 6-3h3v-2l3-1h12v35h-93v-30l9-1V95l-9-1z"
        fill="#FBF475"
      />
      <Path
        d="M732 64h97v35h-12l-7-6-7-3v48l8 1 1 1v30h-62l-1-12v-18l9-2V91l-9 3-5 5h-12z"
        fill="#FBF777"
      />
      <Path
        d="M383 65h85v35h-12l-3-3-8-4-9-2v18l17-4h2v25l-11-2-8-2v13l8 1 1 1v30h-62l-1-1v-29l5-2h4l-1-42-7-2z"
        fill="#FBF677"
      />
      <Path
        d="M1035 202h63v30l-9 2v47l13-4 6-5h12v36h-85v-30l9-2v-42l-8-1-1-1z"
        fill="#F7B144"
      />
      <Path
        d="M1328 222h5l1 1v29l-2 50-3 18-9 24-10 15h-2l-2 4-12 12-8 5-14 5-15 2h-104l-13-11-11-12-3-4v-2l130-1 19-4 12-5 10-6 10-9 8-10 6-10 5-15 1-7z"
        fill="#7C470A"
      />
      <Path
        d="M257 307h2l8 16 8 10 10 9 5 3v2l5 1 8 4 18 4 154 1-4 7-14 15-10 8H324l-16-3-17-12-8-7-9-11-8-13-6-14-3-11z"
        fill="#7F490B"
      />
      <Path
        d="M522 63h27l14 3 12 5 11 8 4 4v3h2l6 15v25l-4-1-36-1-3 1-1-16-4-10-5-3-4-1h-8l-7 3-3 3-3 8-1 15-1-2-41-1-1 3v-23l5-13 1-2h2l2-4 4-5 4-3h2v-2l11-5z"
        fill="#FBF677"
      />
      <Path
        d="M618 96h1l1 30 10-1 37 1 28 1h10l12 16 8 9v18h-45l-8-15-6-16-1-7h-3v38h-53v-30l8-2z"
        fill="#FBDA5A"
      />
      <Path
        d="M390 96h2l1 22h26l31 1 3 1v-15h2v25l-11-2-8-2v13l8 1 1 1v30h-62l-1-1v-29l5-2h4z"
        fill="#F9D758"
      />
      <Path
        d="M911 64h51v30l-9 1v31l-3 13-2 1v-2l-2-1-10-1-22-1 4-7 1-4 1-29-9-1z"
        fill="#FBF777"
      />
      <Path
        d="M850 133h22l20 1 3 2h14l2-1h25l13 2 1 4-3 7h-2l-1 4-7 8-3 3h-3v2l-9 4-9 2h-23l-16-4-10-6-7-6-7-11-3-9z"
        fill="#FAD959"
      />
      <Path
        d="M1192 134h12v35h-93v-30l2 4 1-1h24l27 1v-1l15-2 6-3h3v-2z"
        fill="#FBDA5A"
      />
      <Path
        d="M755 90h4l1 41 2-1 36 1 3 1 1-41h1v47l8 1 1 1v30h-62l-1-12v-18l9-2V91z"
        fill="#F9D557"
      />
      <Path
        d="M1328 222h5l1 1v29l-2 50-3 18-9 24-10 15h-2l-2 4-12 12-8 5-14 5-15 2h-104l-10-8v-1l115-1 15-3 15-6 8-6 9-11 7-11 5-11 1-7-2 1 2-5 4-8 4-12 1-7z"
        fill="#8C510E"
      />
      <Path
        d="M257 307h2l8 16 8 10 1 5 4 8 8 11 7 7 10 8 8 3 13 2 131 1-5 5-5 4H324l-16-3-17-12-8-7-9-11-8-13-6-14-3-11z"
        fill="#8B4F0E"
      />
      <Path
        d="M1028 139h18l47 1 3 1 2-2v30l-1 1h-53l-5-7v-3h-2l-9-13v-3h-2v-4z"
        fill="#F9D758"
      />
      <Path
        d="M982 99h1v39l6-1 19 1v-16h1l1 15 8 2v31h-44l-1-1v-29l5-2h4z"
        fill="#F7D356"
      />
      <Path
        d="M664 240h9l2 1v30l-9 1v44h-1l-1-15-2 1-1 3-13 1-6-1 1-3-3-1-1-5 19-50 2-5z"
        fill="#F5AE42"
      />
      <Path
        d="M533 94h8l7 3 4 4 3 8v14l-2 6-3 5-6 4h-14l-6-4-4-8-1-3v-14l4-10 6-4z"
        fill="#763402"
      />
      <Path
        d="M382 141h1l1 14h30l27 2 2 1 1-17h1v30h-62l-1-1z"
        fill="#F6C249"
      />
      <Path
        d="M497 160h37l38 1 3 3-12 5-17 3h-19l-13-2-11-4-7-4z"
        fill="#F8C54B"
      />
      <Path
        d="M901 56h1l1 33h1v11l8 1v23l-3 5-2 1h-9l-5-5-1-4v-19l6-2h3z"
        fill="#F0A93F"
      />
      <Path d="M1100 100h8l5 2v29l-6 2-10-1-1-1v-30z" fill="#F2AB40" />
      <Path d="M929 240l5 1v29l-5 1v-6h-19v-19l1-1h18z" fill="#F0A93F" />
      <Path
        d="M1032 239l5 1v30l-5 1v-6h-18v-20h18zM532 102h9l4 2 2 5v15l-3 5-4 2-9-1-3-3-1-3v-15l3-6z"
        fill="#F3AC41"
      />
      <Path d="M819 239l11 1v31l-11 1-5-1v-31z" fill="#F5AF42" />
      <Path d="M662 88h11l5 3 2 4v9l-4 6-5 2h-9z" fill="#7D3A05" />
      <Path d="M1036 203h61v11l-1-3-8-1-14-1h-34l-2 1-2 4z" fill="#FDCC4F" />
      <Path d="M982 202h42v13h-1v-6l-3-1-50-2h-36l-1 3v-6z" fill="#FCC94D" />
      <Path d="M609 140h1l1 23 48 1h2l1 6h-53z" fill="#F8C44B" />
      <Path d="M744 271h6l-4 2v43h184v1H745l-2-1v-44z" fill="#D99030" />
      <Path d="M1192 134h11v12l-29-2 1-2 9-4 5-1v-2z" fill="#FBF576" />
      <Path d="M724 152h1v18h-45v-3l1-2h19l19 2v1l5 1z" fill="#F6BF48" />
      <Path d="M605 101l6 1v30l-1 1h-5l1-20z" fill="#E69E38" />
      <Path d="M501 305l16 2 34-1v3h-50z" fill="#F9AF79" />
      <Path d="M744 271h6l-4 2-1 42-2 1v-44z" fill="#E19746" />
      <Path d="M501 305l14 2 1 2h-15z" fill="#FAB07B" />
    </Svg>
  );
}

const SpinCard = props => (
  <View>
    <Svg viewBox="0 0 1600 554" width={wp('96%')} height={wp('30%')} {...props}>
      <Path
        transform="translate(108)"
        d="m0 0h1384l16 3 16 6 14 8 10 8 12 12 10 15 6 14 4 14 2 16v326l-2 16-5 17-10 19-9 11-10 10-10 7-17 9-17 5-17 2h-1370l-17-2-17-5-19-10-11-9-10-10-7-10-9-17-5-17-2-17v-324l2-17 5-17 8-16 9-12 14-14 14-9 13-6 13-4z"
        fill="rgba(255, 255, 255, 0.83)"
      />
      <Path
        transform="translate(108)"
        d="m0 0h1384l16 3 16 6 3 2v16l-459 1h-104v9h-11l-10-3-8-5h-792l-13 9-13 6-10 2h-10l-13-4v-4l5-7 7 2h13l12-4-71-1 6-7 14-9 13-6 13-4z"
        fill="#AA8DC0"
      />
      <Path
        transform="translate(233,193)"
        d="m0 0h18l20 3 16 5 15 7 11 6 13 10 10 9 11 13 9 15 6 13 4 13 2 11v24l-4 17-6 14-8 14h-2l-7 8-10 8-14 8-12 5-16 4-7 1h-26l-17-3-16-5-19-9-12-8-11-9-12-12-11-16-8-16-5-15-2-10-1-14 2-19 7-22h2l2-5 9-12 12-12 14-9 14-6 14-4z"
        fill="#F2F0FB"
      />
      <Path
        transform="translate(1e3)"
        d="m0 0h487l16 3 16 6 3 2v16h-522z"
        fill="#86ABE5"
      />
      <Path
        transform="translate(228,215)"
        d="m0 0h14l15 2 21 7 16 8 11 8 8 7-6 7-3 3h-2l-2 4-12 12-8 7-7 7-1 2h2l3 7v10l-3 6-3 3 2 4 51 51-16 9-15 5-11 2h-24l-13-2-16-5-19-9-13-9-3-4 25-25 8-7 15-15-1-5h-2l-2-5v-10l3-6 1-4-52-52v-2l11-5 14-4z"
        fill="#7AC1FD"
      />
      <Path
        transform="translate(108)"
        d="m0 0h349l1 23 2 4h-409l5-6 14-9 13-6 13-4z"
        fill="#D9658E"
      />
      <Path
        transform="translate(397,153)"
        d="m0 0h13l12 3 12 6 9 7v2h2l8 12 4 12v15l-4 11-6 11-6 8-9 7-10 4-6 1h-13l-10-2-12-5-9-7-7-7-7-12-3-12v-9l3-11 6-12 7-9 7-6 10-5z"
        fill="#F1EFFA"
      />
      <Path
        transform="translate(457)"
        d="m0 0h256l1 2v24l-1 1h-253l-3-4z"
        fill="#C876A0"
      />
      <Path
        transform="translate(149,248)"
        d="m0 0 1 2-5 15-2 21 2 18 5 17 8 16 7 11 8 10 11 11 15 11 21 11 15 5 14 3 7 1h26l17-3 16-6 13-7 9-7 9-8 3-3-2 6-2 4h-2l-1 4-7 11-13 13-15 10-20 8-16 3h-31l-17-3-18-6-21-11-12-9-12-11-10-12-8-13-7-15-4-13-2-12v-22l3-15 5-13 6-12z"
        fill="#DEDFFB"
      />
      <Path
        transform="translate(1354)"
        d="m0 0h138l16 3 16 6 3 2v16h-172l-2-7 1-10z"
        fill="#79B7F3"
      />
      <Path
        transform="translate(108)"
        d="m0 0h121l1 7v15l1 5h-180l5-6 14-9 13-6 13-4z"
        fill="#E95C7A"
      />
      <Path transform="translate(1e3)" d="m0 0h147v27h-147z" fill="#98A2D9" />
      <Path
        transform="translate(188,227)"
        d="m0 0 7 6 4 5 8 7 35 35-1 4-3 6-1 6h-78l-1-2v-20l4-16 8-16 8-9z"
        fill="#F25271"
      />
      <Path
        transform="translate(932)"
        d="m0 0h73l1 8-1 19h63v1h-104v9h-11l-10-3-8-5h-792l-13 9-13 6-10 2h-10l-13-4v-4l5-7 7 2h13l12-4-71-1v-1h882l1-21z"
        fill="#A397CA"
      />
      <Path
        transform="translate(585)"
        d="m0 0h128l1 2v24l-1 1h-126l-1-4v-13z"
        fill="#BE7DAA"
      />
      <Path
        transform="translate(277,303)"
        d="m0 0h68l1 5v19l-4 17-9 17-8 8-4-1-51-51 2-4 3-4z"
        fill="#F4738D"
      />
      <Path
        transform="translate(159,296)"
        d="m0 0h78l2 9h2l2 5-22 22-8 7-18 18-4-1-7-7-10-13-8-14-5-14-2-7z"
        fill="#FED175"
      />
      <Path
        transform="translate(228,215)"
        d="m0 0h14l15 2 3 2v60h-10l-8 2-53-53v-2l11-5 14-4z"
        fill="#7CC2FD"
      />
      <Path
        transform="translate(243,309)"
        d="m0 0 11 7v69l-9-1-16-5-19-9-13-9-3-4 25-25 8-7z"
        fill="#6EB954"
      />
      <Path
        transform="translate(312,248)"
        d="m0 0 4 2 8 8 10 15 7 15 3 9v5h-66l-4-10v-3h-2l2-4 12-12 8-7 12-12z"
        fill="#FEDC8F"
      />
      <Path
        transform="translate(713)"
        d="m0 0h91v26l-1 1h-90z"
        fill="#B386B5"
      />
      <Path
        transform="translate(149,248)"
        d="m0 0 1 2-5 15-2 21 2 18 5 17 8 16 7 11 8 10 6 7-12 23h-4l-9-10-10-14-9-19-4-13-2-12v-22l3-15 5-13 6-12z"
        fill="#DEDFFB"
      />
      <Path
        transform="translate(233,208)"
        d="m0 0h18l18 3 18 6 17 9 11 8 12 11 11 14 9 17 5 17 1 6v21l-5 21-7 12-5 5-1-2 6-12 4-17v-24l-16 1-52-1 1-2h52l14 1-5-17-9-17-9-12-13-13-14-10-16-8-14-5-13-3-9-1h-14l-19 3-16 6-13 8-2-1 7-7 11-6 7-4 20-6z"
        fill="#CFCEF0"
      />
      <Path
        transform="translate(260,219)"
        d="m0 0 7 1 16 6 14 8 13 10 3 4-9 9h-2l-2 4-12 12-8 7-8 8-8-6-4-2z"
        fill="#6EB954"
      />
      <Path
        transform="translate(396,162)"
        d="m0 0h9l14 4 9 5 5 4-2 4-13 13v11l-2 3 22 22-5 4-9 3h-18l-14-5-9-6 6-7 13-13 1-3 4 2h8v-7l-1-3-8-1-2 2-1 6-2-1 1-10-19-19-2-3 9-4z"
        fill="#84C282"
      />
      <Path transform="translate(1e3)" d="m0 0h73v27h-73z" fill="#9896D0" />
      <Path
        transform="translate(472,53)"
        d="m0 0h2l8 14 12 17 11 11 12 6h8l8-4 8-9 8-17 1-3 10 2 1 4-6 14-8 12-7 7-12 6h-15l-9-4-11-8-7-7-12-16-11-19 3-3z"
        fill="#F3B281"
      />
      <Path
        transform="translate(50,27)"
        d="m0 0h884v1l-791 1-13 9-13 6-10 2h-10l-13-4v-4l5-7 7 2h13l12-4-71-1z"
        fill="#CFCFD0"
      />
      <Path
        transform="translate(215,254)"
        d="m0 0 7 6 20 20-1 4-3 6-1 6h-41l-2-6v-13l4-11 5-6z"
        fill="#F4748D"
      />
      <Path
        transform="translate(1439,27)"
        d="m0 0h13l11 16 10 12 10 7 9 3 10-2 9-8 8-14 4-9 7 1 4 2-5 13-6 11-9 10-9 6-6 2h-11l-9-3-11-7-10-10-11-15-8-13z"
        fill="#F3B280"
      />
      <Path
        transform="translate(379,168)"
        d="m0 0 4 1 20 20-1 10 2-6 2-2h5l5 5v7l-1 1h-8l-4-3-1 4-18 18-4-2-7-9-5-12v-16l4-9 5-6z"
        fill="#FFD475"
      />
      <Path
        transform="translate(108)"
        d="m0 0h12l2 7v16l3 4h-74l5-6 14-9 13-6 13-4z"
        fill="#F35270"
      />
      <Path
        transform="translate(362,180)"
        d="m0 0 1 2-1 4v12l4 13 7 11 7 7 12 7 11 4 7 1h10l10-2 12-6 6-5-2 5-4 6-7 6-10 5-9 2h-13l-10-2-12-5-9-7-7-7-7-12-3-12v-9l3-11z"
        fill="#DEDFFB"
      />
      <Path
        transform="translate(199,240)"
        d="m0 0 4 1 12 12v2l-12 6-4 5-4 11v13l1 6h-21l-1-2v-18l4-13 6-10 6-7z"
        fill="#F35170"
      />
      <Path
        transform="translate(149,248)"
        d="m0 0 1 2-5 15-2 21 2 18 5 17 1 6-12 22-3-1-5-16-2-12v-22l3-15 5-13 6-12z"
        fill="#D0CEF2"
      />
      <Path
        transform="translate(224,231)"
        d="m0 0h20l15 3v22l-8-1-11-2h-12l-13 1-14-14v-2l13-5z"
        fill="#58B3FE"
      />
      <Path
        transform="translate(295,344)"
        d="m0 0 4 1 11 11-1 4-10 6-11 4-5 1h-27l-1-1v-22l18 1 14-2z"
        fill="#58B3FD"
      />
      <Path
        transform="translate(159,296)"
        d="m0 0h15l3 8 5 13 7 12 11 13 5 4-1 3-8 7-4 1-8-8-10-13-8-14-5-14-2-7z"
        fill="#FED376"
      />
      <Path
        transform="translate(433,176)"
        d="m0 0 6 5 6 10 3 11v9l-4 11-5 6-4-2-20-20 2-3v-11z"
        fill="#F15B79"
      />
      <Path
        transform="translate(306,304)"
        d="m0 0h22l1 2v22l-4 12-7 11-6 6-4-2-11-11 5-5 4-6 2-9v-10z"
        fill="#F35170"
      />
      <Path
        transform="translate(196,297)"
        d="m0 0h41l2 8h2l2 5-22 22-4-2-9-9-9-14z"
        fill="#FEDC8F"
      />
      <Path
        transform="translate(205,346)"
        d="m0 0 8 6 10 6 16 7 15 4v16l-9-1-16-5-19-9-13-9-3-4 8-8z"
        fill="#6EB956"
      />
      <Path
        transform="translate(665,41)"
        d="m0 0h5l2 6v5l-9 3-13 5-8 5-3 3v7l7 9 6 5-5 9h-3l-8-7-6-7-3-6v-13l6-9 10-7 15-6z"
        fill="#F3B281"
      />
      <Path
        transform="translate(228,215)"
        d="m0 0h14l15 2 2 1v14l-14-2h-21l-14 3-10 4-4-2-7-7v-2l11-5 14-4z"
        fill="#5BB3FD"
      />
      <Path
        transform="translate(332,304)"
        d="m0 0h12l2 4v19l-4 17-9 17-8 8-4-1-8-8 6-7 6-8 5-11 2-9z"
        fill="#F25271"
      />
      <Path
        transform="translate(311,360)"
        d="m0 0 4 1 9 9-16 9-15 5-11 2h-24l-4-1v-13h25l14-3 12-5z"
        fill="#5BB3FC"
      />
      <Path
        transform="translate(260,219)"
        d="m0 0 7 1 16 6 14 8 13 10 3 4-9 9h-2l-1 2-9-8-15-9-13-5-4-1z"
        fill="#6FB956"
      />
      <Path
        transform="translate(301,259)"
        d="m0 0 4 2 10 12 9 16 3 9v3h-22l-7-14-8-10-3-4z"
        fill="#FFD475"
      />
      <Path
        transform="translate(1490,1)"
        d="m0 0h9l15 4 12 5 1 1v16h-39v-22z"
        fill="#7AC1FD"
      />
      <Path
        transform="translate(348,366)"
        d="m0 0 1 2-4 8h-2l-1 4-7 11-13 13-15 10-20 8h-3l2-6 10-18 17-6 15-8 9-7 9-8z"
        fill="#D0CEF2"
      />
      <Path
        transform="translate(218,391)"
        d="m0 0 10 3 20 5-2 6-10 18-3 1-17-4-10-4 1-5z"
        fill="#D0CEF2"
      />
      <Path
        transform="translate(1193,64)"
        d="m0 0h2l7 8 8 7 7 3h9l6-3 7-8 2-3 9 3 1 4-7 9-8 7-9 4-13-1-14-7-14-14 1-4z"
        fill="#C776A0"
      />
      <Path
        transform="translate(220,101)"
        d="m0 0h3l7 8 7 6 6 3h11l8-5 6-9 9 3 2 1-2 6-9 10-9 6-6 1h-8l-11-4-9-6-11-11-1-3z"
        fill="#C776A0"
      />
      <Path
        transform="translate(990,84)"
        d="m0 0h11v12l-21 3-8 4-2 2v6l6 10 2 3-6 7-4-1-6-8-4-9v-12l4-6 6-5 15-5z"
        fill="#F3B381"
      />
      <Path
        transform="translate(243,309)"
        d="m0 0 11 7v32l-14-4-15-8-6-3 5-5z"
        fill="#84C283"
      />
      <Path
        transform="translate(724,55)"
        d="m0 0h10l10 3 13 9 7 7v2l-7 6-4-2-9-8-8-4h-9l-7 3-6 9-1 2-10-3-1-3 7-11 7-6z"
        fill="#C677A1"
      />
      <Path
        transform="translate(248,283)"
        d="m0 0h10l6 3 7 8 1 2v11l-5 6-2 1h-11l-9-6-3-5-1-4v-7l2-4h2l2-4z"
        fill="#F2F0FB"
      />
      <Path
        transform="translate(312,248)"
        d="m0 0 4 2 8 8 10 15 7 15 3 9v4h-13l-6-15-6-11-10-13-5-6z"
        fill="#FFD476"
      />
      <Path
        transform="translate(379,168)"
        d="m0 0 4 1 20 20-1 6-1 2h-33v-13l4-9 5-6z"
        fill="#F15473"
      />
      <Path
        transform="translate(112,83)"
        d="m0 0 2 4 1 7v15l-3 15-7 14-6 7-7 4-5-10 7-7 6-12 3-14 1-9 7-13z"
        fill="#7A59C1"
      />
      <Path
        transform="translate(1084,45)"
        d="m0 0 2 4 1 5v23l-3 12-6 12-8 9-3 2h-3l-4-8 2-4h2l2-4 5-8 3-9 2-17z"
        fill="#7A5AC1"
      />
      <Path
        transform="translate(121,29)"
        d="m0 0h20l-5 5-10 6-9 4-10 2h-10l-13-4v-4l5-7 7 2h13z"
        fill="#7C5EC2"
      />
      <Path
        transform="translate(408,206)"
        d="m0 0h8l22 22-5 4-9 3h-15l-1-7z"
        fill="#63B7FC"
      />
      <Path
        transform="translate(396,162)"
        d="m0 0h9l6 2v26h-8l-20-20-2-3 9-4z"
        fill="#7BBFFA"
      />
      <Path
        transform="translate(250,278)"
        d="m0 0h7l10 5 7 6 3 7v10l-3 6-6 5-4 1h-7l-10-5-5-4-1-4h-2l-2-5v-10l3-6 4-4zm-2 5-3 3v2l-3 1-1 3v7l3 7 5 5 5 3h11l6-5 1-2v-11l-4-6-5-5-5-2z"
        fill="#7B5DBD"
      />
      <Path
        transform="translate(260,257)"
        d="m0 0 16 8 9 7v3l-13 13-8-6-4-2z"
        fill="#84C282"
      />
      <Path
        transform="translate(167,353)"
        d="m0 0h2l7 8 3 4-12 23h-4l-9-10 8-16z"
        fill="#D0CEF2"
      />
      <Path
        transform="translate(1523,32)"
        d="m0 0 7 1 4 2-5 13-6 11-9 10-3 1-5-8 2-4 7-9 7-16z"
        fill="#F5748C"
      />
      <Path
        transform="translate(433,176)"
        d="m0 0 6 5 6 10 2 8h-29l-1-7z"
        fill="#FFD475"
      />
      <Path
        transform="translate(642,62)"
        d="m0 0v3l-3 3v7l7 9 6 5-5 9h-3l-8-7-6-7-3-6v-13l9-2z"
        fill="#F35471"
      />
      <Path
        transform="translate(550,68)"
        d="m0 0 10 2 1 4-6 14-8 12-6 6-3-1-4-7 2-4 6-8 7-15z"
        fill="#F6748D"
      />
      <Path
        transform="translate(362,180)"
        d="m0 0 1 2-1 4v12l4 13 7 11 3 3-1 5-4 6-6-5-7-12-3-12v-9l3-11z"
        fill="#DEDFFB"
      />
      <Path
        transform="translate(394,160)"
        d="m0 0h19l14 5 12 9 6 8 4 8 2 9-1 13-4 8-1-2 2-7v-11h-28v-1h28l-5-12-7-9-8-7-11-5-11-3h-9l-12 2 1-2z"
        fill="#CFCEED"
      />
      <Path
        transform="translate(393,213)"
        d="m0 0 5 1 6 3 5 2v16l-10-2-12-6-4-4z"
        fill="#75BC63"
      />
      <Path
        transform="translate(406,191)"
        d="m0 0h5l5 5v7l-1 1h-8l-4-3-1 4-7 7-4-2-6-8-1-5h17l1 2 2-6z"
        fill="#FEDC8F"
      />
      <Path
        transform="translate(112,83)"
        d="m0 0 2 4 1 7v15h-1l-1-8-14 29-8 16-3-4-1-3 7-7 6-12 3-14 1-9 7-13z"
        fill="#9796D0"
      />
      <Path
        transform="translate(1084,45)"
        d="m0 0 2 4 1 5v8l-22 45-3 1-2-6 4-2 2-4 5-8 3-9 2-17z"
        fill="#9797D1"
      />
      <Path
        transform="translate(268,104)"
        d="m0 0 9 3 2 1-2 6-9 10-8 5-4-1v-11l6-4z"
        fill="#7C5BC1"
      />
      <Path
        transform="translate(1241,68)"
        d="m0 0 9 3 1 4-7 9-8 7-4 2h-3l-1-11 10-10z"
        fill="#7C5BC0"
      />
      <Path
        transform="translate(197,236)"
        d="m0 0 4 4-11 7-8 10-5 11-2 8v20h-5v-22l4-13 6-10 9-9 6-4h2z"
        fill="#F5738D"
      />
      <Path
        transform="translate(391,178)"
        d="m0 0 7 6 5 5-1 6-1 2h-18v-9l3-6 5-2z"
        fill="#F2748F"
      />
      <Path
        transform="translate(720,57)"
        d="m0 0 2 1-1 1 1 11-5 5-4 7-10-3-1-3 7-11 7-6z"
        fill="#7C5CC1"
      />
      <Path
        transform="translate(958,110)"
        d="m0 0h11l7 11 2 3-6 7-4-1-6-8-4-9z"
        fill="#F5748C"
      />
      <Path
        transform="translate(934,27)"
        d="m0 0h29l1 2v8h-11l-10-3-9-6z"
        fill="#D86990"
      />
      <Path
        transform="translate(171,296)"
        d="m0 0 4 1 6 18 6 11 7 9 7 8 4 3-1 3-4-2-12-12-9-14-5-11-3-10z"
        fill="#FFDD90"
      />
      <Path
        transform="translate(406,189)"
        d="m0 0 6 1 5 4 1 2v7l-3 3h-7v12l-7-1-7-4 6-7 3-5 4 2h8v-7l-1-3-8-1-2 2-1 6-2-1 1-7 1-2z"
        fill="#83BE84"
      />
      <Path
        transform="translate(1193,64)"
        d="m0 0h2l7 8 2 4-2 11-4-2-12-12 1-4z"
        fill="#D9668E"
      />
      <Path
        transform="translate(220,101)"
        d="m0 0h3l7 8 1 3-2 11-5-3-10-10-1-3z"
        fill="#D9668E"
      />
      <Path
        transform="translate(385,173)"
        d="m0 0 5 3 1 4-5 3-2 5-1 9h-8v-12l5-8z"
        fill="#F25271"
      />
      <Path
        transform="translate(302,257)"
        d="m0 0 4 1 10 11 8 13 5 11 2 8h13v1h-38v-1h21l-5-14-8-14-12-14z"
        fill="#FFDD90"
      />
      <Path
        transform="translate(362,180)"
        d="m0 0 1 2-1 4v12l3 12-5 9h-2l-3-12v-9l3-11z"
        fill="#D1CFF2"
      />
      <Path
        transform="translate(418,199)"
        d="m0 0 13 1 1 3v7l-4 8-7-6-6-7 2-2z"
        fill="#F1748E"
      />
      <Path
        transform="translate(368,197)"
        d="m0 0h7l5 12 7 8v3l-3 3-4-2-7-9-5-12z"
        fill="#FFD477"
      />
      <Path
        transform="translate(408,206)"
        d="m0 0h8l11 11-3 2-5 1h-7l-4-1z"
        fill="#7FC2FA"
      />
      <Path
        transform="translate(431,200)"
        d="m0 0h9l1 8-3 9-4 5-4-1-2-2 1-4 2-5z"
        fill="#F25271"
      />
      <Path
        transform="translate(748,62)"
        d="m0 0 5 2 10 9 1 3-7 6-4-2-6-7z"
        fill="#DA658E"
      />
      <Path
        transform="translate(424,218)"
        d="m0 0 5 1 3 3v2l-5 3-4 1h-14v-9h10z"
        fill="#57B3FE"
      />
      <Path
        transform="translate(392,170)"
        d="m0 0h16l2 1v9l-6-1h-12l-5-5v-2z"
        fill="#57B3FE"
      />
      <Path
        transform="translate(393,213)"
        d="m0 0 5 1 6 3 5 2v9l-9-2-11-6v-3z"
        fill="#6FB956"
      />
      <Path
        transform="translate(433,176)"
        d="m0 0 6 5 6 10 2 8h-7l-7-13-4-4 2-4z"
        fill="#FED67C"
      />
      <Path
        transform="translate(1523,32)"
        d="m0 0 7 1 4 2-5 13-2 3-3-1-3-5-2-1 1-6z"
        fill="#DB668D"
      />
      <Path
        transform="translate(550,68)"
        d="m0 0 10 2 1 4-6 14h-2l-6-8 1-6z"
        fill="#DB668D"
      />
      <Path
        transform="translate(252,283)"
        d="m0 0h6l6 3 7 8-1 8-4 1-10-13-2-2v-3z"
        fill="#FBFBFB"
      />
      <Path
        transform="translate(259,219)"
        d="m0 0h1v38h-1v-23l-15-2h-20l-16 4-9 3-1-2 12-5 14-3h21l12 2 2 1z"
        fill="#88ACE4"
      />
      <Path
        transform="translate(205,346)"
        d="m0 0 8 6 10 6 16 7 15 4v3l-8-1-18-6-15-8-8-6-3-2z"
        fill="#85C384"
      />
      <Path
        transform="translate(260,231)"
        d="m0 0 16 6 16 9 11 9 1 2h-2l-1 2-9-8-15-9-13-5-4-1z"
        fill="#85C384"
      />
      <Path
        transform="translate(396,162)"
        d="m0 0h9l5 1v6h-17l-8 3-4-5 9-4z"
        fill="#5DB2FB"
      />
      <Path
        transform="translate(254,317)"
        d="m0 0h1l1 53h27l14-4 11-6 3-3 2 3-14 8-14 4-6 1h-18l-7-1z"
        fill="#83ADE7"
      />
      <Path
        transform="translate(243,288)"
        d="m0 0h1l1 9 5 8 6 4 10 1 3 1-4 3h-11l-9-6-3-5-1-4v-7z"
        fill="#CCCBCF"
      />
      <Path
        transform="translate(447,228)"
        d="m0 0 1 2-6 9-7 6-10 5h-3l2-6 3-4 12-5z"
        fill="#D1CFF2"
      />
      <Path
        transform="translate(393,238)"
        d="m0 0 10 2 3 2-5 9-8-1-5-2 2-5z"
        fill="#D0CEF2"
      />
      <Path
        transform="translate(121,29)"
        d="m0 0h20l-5 5-4 2-23-1v-2z"
        fill="#9796D0"
      />
      <Path
        transform="translate(412,172)"
        d="m0 0 6 1 10 7-2 4-3 3-4-2-7-4z"
        fill="#6EB954"
      />
      <Path
        transform="translate(406,191)"
        d="m0 0h5l5 5v7l-1 1h-8l-4-3v-7z"
        fill="#EDEBF6"
      />
      <Path
        transform="translate(20,120)"
        d="m0 0h8l1 1v11l-11 1v-12z"
        fill="#F2BA88"
      />
      <Path
        transform="translate(1081,38)"
        d="m0 0h2l2 4-1 6-7 14-1 11h-1v-23z"
        fill="#D6D5F5"
      />
      <Path
        transform="translate(412,165)"
        d="m0 0 7 1 9 5 5 4-2 4-4-1-10-6-5-2z"
        fill="#6FB958"
      />
      <Path
        transform="translate(971,119)"
        d="m0 0h4l3 5-6 7-4-1-6-8v-2z"
        fill="#DB668D"
      />
      <Path
        transform="translate(422,187)"
        d="m0 0 5 5 3 5v2h-12l-1-7z"
        fill="#FCDC8F"
      />
      <Path
        transform="translate(1084,45)"
        d="m0 0 2 4-1 7-8 16h-1v-10z"
        fill="#91A5DD"
      />
      <Path
        transform="translate(112,83)"
        d="m0 0 2 4-1 5-9 18-1-4 1-9 7-13z"
        fill="#97A2D9"
      />
      <Path
        transform="translate(110,75)"
        d="m0 0 2 1 1 7-4 6-4 8-1 9h-1v-17z"
        fill="#D0CEF2"
      />
      <Path
        transform="translate(934,27)"
        d="m0 0 21 1-1 3-5 5-10-4z"
        fill="#F5758C"
      />
      <Path
        transform="translate(100,124)"
        d="m0 0 1 2-9 19-2 1-3-7 7-7 4-7z"
        fill="#9698D2"
      />
      <Path
        transform="translate(371,221)"
        d="m0 0 5 4-1 5-4 6-5-5z"
        fill="#D0CEF2"
      />
      <Path
        transform="translate(406,189)"
        d="m0 0 6 1 5 4 1 2v7l-3 3h-6l-2-2 8-1v-7l-1-3-8-1-2 2-1 6-2-1 1-7 1-2z"
        fill="#8060C1"
      />
      <Path
        transform="translate(277,301)"
        d="m0 0h53l14 1v1l-15 1-52-1z"
        fill="#F5F4F8"
      />
      <Path
        transform="translate(724,55)"
        d="m0 0 4 1h-2v10l2 1-6 2-2-5v-5z"
        fill="#B48AB6"
      />
      <Path
        transform="translate(107,74)"
        d="m0 0 4 1-9 18v-11l3-6z"
        fill="#EBEAFB"
      />
      <Path
        transform="translate(121,29)"
        d="m0 0h20l-2 3h-23l3-2z"
        fill="#91A5DD"
      />
      <Path
        transform="translate(384,171)"
        d="m0 0 1 3-6 5-3 6-1 12h-2v-12l4-8z"
        fill="#F4748D"
      />
      <Path
        transform="translate(1229,80)"
        d="m0 0 2 1-2 2v11l-7 1 4-1-1-3v-8z"
        fill="#B690BA"
      />
      <Path
        transform="translate(254,118)"
        d="m0 0h2l1 10 2 2h-6v-10h-6v-1z"
        fill="#B288B7"
      />
      <Path
        transform="translate(373,197)"
        d="m0 0h2l5 12 7 8 1 2-5-2-7-10-3-8z"
        fill="#FFDD90"
      />
      <Path
        transform="translate(1079,38)"
        d="m0 0h2l-2 6-4 8h-1v-6z"
        fill="#F3F1FC"
      />
      <Path
        transform="translate(407,192)"
        d="m0 0 7 1 2 3v5l-6-5z"
        fill="#FAF9FA"
      />
      <Path
        transform="translate(112,83)"
        d="m0 0 1 2-8 16-1-4 7-13z"
        fill="#86ABE5"
      />
      <Path
        transform="translate(406,189)"
        d="m0 0 5 1v1l-6 2-2 7-2-1 1-7 1-2z"
        fill="#7A5EBA"
      />
      <Path
        transform="translate(310,357)"
        d="m0 0 3 3-12 7-2-1 10-7z"
        fill="#8AABE2"
      />
      <Path
        transform="translate(403,194)"
        d="m0 0 2 3 1 4 9 2v1h-8l-4-3z"
        fill="#C6C3CE"
      />
      {props.children}
    </Svg>
  </View>
);

const SpinCongrats = props => (
  <Svg viewBox="0 0 2048 809" width={wp('100%')} height={wp('38%')} {...props}>
    <Path
      transform="translate(250,24)"
      d="m0 0h8l2 3 6 1v2l4 2v5l2 1v7l-6 2 15 9 11 6 15 9v2l6 1 5 3v2h3v2h2v3l5 2 6 4v2l4 2 15 11 11 7 3 2v3l4 2 3 2 25 2 22 5 17 6 14 7 11 6 13 9 11 8v2l4 2 5 4v2h2v2l3 1v2h2l6 7v2h2l7 9 2 5h2l14 23 6 13 7 18 4 14 4 17 2 19 4 9 1 5v16l-3 9-3 8-3 17-4 15-1 5v13l-9 25-7 15-7 14-10 17-13 19-12 14-9 10-8 8-7 2-6 5h-2l-1 7-6 1-7 1-8 4-9 3-1 2h2v2l4 2 15 5 3 3v7l-5 5-9 4-6 1v22l-3 11-3 9-2 12 1 12 4 8 9 10 10 8 14 10 5 5 1 3 3 1v2h2l6 9 3 9v14l-4 14-4 10-2 9 1 8 1 6h2l6 6v6l-2 2h-6l-6-4-5-8-2-12 2-14 5-14 2-5 1-5v-10l-4-10-9-10-18-13-10-8v-2l-4-2-8-11-4-8-1-3v-19l7-27 1-11v-7h-13l-9-2-4-4-1-7 3-5 13-8 3-3 1-3-3 1h-14l-11-1-16-4-12-4-9-4-20-10v-2l-4-1-4-2v-2l-5-2-4-2v-2l-5-2-2-1v-2l-4-2-9-7-4-3v-2l-4-2-12-11-11-12v-2l-3-1v-2h-2l-1-4h-2l-6-8v-2h-2l-10-16-7-11-11-23v-4h-2l-5-16-4-11-3-7-4-13-3-16-1-12v-24l1-12 5-22 3-3h3l3-11 2-7-2-3v-9l4-8 3-3 7-2 4-8 6-10h2l2-5 9-11 4-5h2l1-3v-11l-1-7-1-28v-20l-1-5 1-2 1-30 2-19-6-4-1-6-6-1-3-3v-6l3-3h6v-6z"
      fill="#FED45F"
    />
    <Path
      transform="translate(1288,457)"
      d="m0 0h28l20 4-4 17-9-1-14-2h-15l-14 3-10 6-6 8-3 8-1 5v15l1 8-14 4 9 6 6 8 3 9v18l-3 9-9 10-3 3 8 10 1-1 1-10 9-1 4-16 15-51h65l13 43 7 23 9 2 1 22h2v-17l6-2h2l-1-25-2 2h-21l-1-1v-47h106l1 14 9-8 11-5 9-2h32l14 3 13 5 2 1v-8h64v38l-7 35 3 1v40h-55l-1-1-1-28-4 10-7 9-10 6-11 4-7 1h-28l-15-3-12-4-6-4v-36l1-1 8-1-6-8-4-10h-14l-3-3-1 26 8 1 1 22v19l-1 1-45 1 8 16 10 15 9 10 8 7 9 4 10 1 10-3 9-6 5-4 11-14 9-16 1-2 9 3 7 4-3 7-6 11-9 12-9 10-10 8-13 6-9 2h-9l-12-3-11-6-11-9-11-13-12-19-10-20v-2h-7l-1-17-1-3-1 20h-50l-4-16h-14l-4 16h-98l-4-7-1 7-20 1h-43l-1-1-1-8-17 6-13 3-8 1h-17l-16-3-14-7-10-9-7-10-1 7v20l-1 1-20 1 7 9 9 8 8 4 11 1 11-4 9-7 6-8 9 5 6 4-6 9-8 8-13 8-11 3h-12l-13-4-11-7-8-7-11-14-5-7v-2h-19l-12-18-1 17-1 1h-55l-1-30-7 11-8 8-12 7-14 4-6 1h-22l-2 5-7 11-11 11-9 6-5 1-6-16 9-6 5-5 7-9-15-8-11-10-6-10-1 21-9 4-16 4-7 1h-29l-16-4-11-1h-10l-14 2-9 4-3 4v9l4 10 5 7-1 4-10 8h-3l-7-11-5-11-2-13 2-10 6-9 9-6 11-4 14-2-7-14-3-15v-14l2-12 5-12 6-8 7-7 16-8 14-3h28l18 4 13 5 1 1 1 21 6-10 9-9 12-7 13-4 17-2 19 1 16 4 13 7 9 8 7 11 1-29h61l12 18 1-18h56l1 27 6-9 9-9 16-8 15-3h22l14 2 16 5 6 3v-9h74l17 2 8 2-1-13v-10l3-16 6-12 9-10 11-7 12-4zm-81 107v6h2v-6zm-107 4-3 2h9l-3-2zm44 0v2h3v28h4v-29zm-404 1-6 4-3 7v7l3 7 6 3h14l18-4 9-3 1-2-1-10-26-1-5-6-4-2zm171 0v30l5-1v-28zm120 0-1 1v28l5 1v-30zm-183 1 1 26 4-1 3-5v-14l-3-5zm718-1v3h-8l6 10 3 8 1 9 2 2 3-1-1-10-4-19zm-475 6-1 3v10l2 3v-16z"
      fill="#F9EADF"
    />
    <Path
      transform="translate(204,262)"
      d="m0 0h6l2 2v8l-2 8-2 13v37l3 17 4 14 1 9 7 6v2l4 2 3 2v2l4 2 14 10 16 10 5 5 3 5 2 1h14l10 4 25 6 11 2 12 1h34l15-2 16-3 21-6 20-9 15-9 9-7 10-9 5-5-30-2-12-2-17-4-17-5-12-5h-3l-3 6-4 2h-7l-5-3-5-7-2-9v-10l3-10 6-7 4-2 7 1 6 5 4 7 5 3v2l8 1 8 3v2l9 1 14 4 9 2 31 3h12l19-3 9-4 6-4 6-7 2-7-1-13h-2l-5-6-10-3 9 4 5 5 2 10-3 9-5 5-5 3-4 1h-9l-6-2-2-1v-2l-5-1-3-3v-2h-2l-4-8-1-9 2-13 5-8h2l2-4 4-1v-2l10-4h14l13 5 9 7 8 10 3 7 1 5v16l-3 9-3 8-3 17-4 15-1 5v13l-9 25-7 15-7 14-10 17-13 19-12 14-9 10-8 8-7 2-6 5h-2l-1 7-6 1-7 1-8 4-9 3-1 2h2v2l4 2 15 5 3 3v7l-5 5-9 4-6 1v22l-3 11-3 9-2 12 1 12 4 8 9 10 10 8 14 10 5 5 1 3 3 1v2h2l6 9 3 9v14l-4 14-4 10-2 9 1 8 1 6h2l6 6v6l-2 2h-6l-6-4-5-8-2-12 2-14 5-14 2-5 1-5v-10l-4-10-9-10-18-13-10-8v-2l-4-2-8-11-4-8-1-3v-19l7-27 1-11v-7h-13l-9-2-4-4-1-7 3-5 13-8 3-3 1-3-3 1h-14l-11-1-16-4-12-4-9-4-20-10v-2l-4-1-4-2v-2l-5-2-4-2v-2l-5-2-2-1v-2l-4-2-9-7-4-3v-2l-4-2-12-11-11-12v-2l-3-1v-2h-2l-1-4h-2l-6-8v-2h-2l-10-16-7-11-11-23v-4h-2l-5-16-4-11-3-7-4-13-3-16-1-12v-24l1-12 5-22z"
      fill="#FEC217"
    />
    <Path
      transform="translate(1504,525)"
      d="m0 0h32l14 3 13 5 2 1v-8h64v38l-7 35 3 1v40h-55l-1-1-1-28-4 10-7 9-10 6-11 4-7 1h-28l-15-3-12-4-6-4v-36l1-1 8-1-6-8-4-10h-14l-3-3-1 26 8 1 1 22v19l-1 1-45 1 8 16 10 15 9 10 8 7 9 4 10 1 10-3 9-6 5-4 11-14 9-16 1-2 9 3 7 4-3 7-6 11-9 12-9 10-10 8-13 6-9 2h-9l-12-3-11-6-11-9-11-13-12-19-10-20v-2h-7l-1-17-2-6 3-1v-17l6-2h2l-1-25-2 2h-21l-1-1v-47h106l1 14 9-8 11-5zm62 44v3h-8l6 10 3 8 1 9 2 2 3-1-1-10-4-19z"
      fill="#F9EADF"
    />
    <Path
      transform="translate(250,24)"
      d="m0 0h8l2 3 6 1v2l4 2v5l2 1v7l-6 2 15 9 11 6 15 9v2l6 1 5 3v2h3v2h2v3l5 2 6 4v2l4 2 15 11 11 7 3 2v3l4 2 3 2 15 1 7 3 1 6-2 3-28 6-20 6-15 5-11 5-15 7-14 7-21 13h-2v2l-9 6h-2v2l-5-1-3-3 1-6 4-2-1-15-1-7-1-28v-20l-1-5 1-2 1-30 2-19-6-4-1-6-6-1-3-3v-6l3-3h6v-6z"
      fill="#FC625D"
    />
    <Path
      transform="translate(915,534)"
      d="m0 0h50l21 32 11 17v-19l-7-2v-28h41v28l-8 1v41l8 1v28h-50l-8-11-13-19-11-16-1 17 8 1v28l-18 1h-23v-29l8-1-1-40-7-2z"
      fill="#E658FE"
    />
    <Path
      transform="translate(834,533)"
      d="m0 0h26l16 4 11 6 7 6 7 11 4 16v14l-3 14-6 11-7 8-10 6-11 4-13 2h-18l-16-3-14-7-10-10-5-10-3-11v-22l4-13 7-10 8-7 10-5zm14 37 1 26 4-1 3-5v-14l-3-5z"
      fill="#E658FE"
    />
    <Path
      transform="translate(1150,534)"
      d="m0 0h76l14 3 10 5 6 8 2 8v13l-4 10-7 6-6 3h-2l4 8 14 17 1 1v17h-41l-9-17-6-18-2-1v36h-50v-28l8-2v-40l-8-1zm57 30v6h2v-6z"
      fill="#E658FE"
    />
    <Path
      transform="translate(516,286)"
      d="m0 0h14l13 5 9 7 8 10 3 7 1 5v16l-3 9-6 11-3 1-2 4-3 1v2l-9 6-16 6-10 2-19 1h-17l-15-1-12-2-17-4-17-5-12-5h-3l-3 6-4 2h-7l-5-3-5-7-2-9v-10l3-10 6-7 4-2 7 1 6 5 4 7 5 3v2l8 1 8 3v2l9 1 14 4 9 2 31 3h12l19-3 9-4 6-4 6-7 2-7-1-13h-2l-5-6-10-3 9 4 5 5 2 10-3 9-5 5-5 3-4 1h-9l-6-2-2-1v-2l-5-1-3-3v-2h-2l-4-8-1-9 2-13 5-8h2l2-4 4-1v-2z"
      fill="#3249D2"
    />
    <Path
      transform="translate(1294,533)"
      d="m0 0h53l3 8 17 57 8 3v31l-1 1h-36l-4-16-27-1-2 13-1 4h-37v-33l8-1 2-10 16-55z"
      fill="#E658FE"
    />
    <Path
      transform="translate(1087,532)"
      d="m0 0h17l20 3 13 5v30h-20l-8-7-3-1h-9l-8 5-4 6-1 3v14l3 7 5 4 5 2h15v-8h-12l-1-5v-12l1-1h40v47l-8 4-17 5-6 1h-26l-12-3-11-6-7-6-7-11-4-12-1-7v-14l3-14 4-8 9-10 10-6 13-4z"
      fill="#E658FE"
    />
    <Path
      transform="translate(1507,532)"
      d="m0 0h25l17 3 10 4v26h-19l-7-6-4-2h-9l-3 3-2 6 14 1 12 3 8 4 6 5 5 10 1 4v16l-4 10-7 7-10 5-7 2-10 1h-15l-16-2-16-5v-26h20l5 5 8 3 8-1 3-8-16-2-11-4-10-6-6-9-2-6v-16l4-10 5-6 10-6z"
      fill="#E658FE"
    />
    <Path
      transform="translate(727,533)"
      d="m0 0h24l15 3 11 4 1 1v30h-19l-8-7-3-1h-11l-6 4-4 5-2 5v12l3 8 5 4 5 2h18l22-5v31l-15 4-13 2h-22l-16-4-10-5-8-7-7-11-4-13v-25l4-12 6-9 9-8 11-5z"
      fill="#E658FE"
    />
    <Path
      transform="translate(341,147)"
      d="m0 0h2l2 5v9l-4 9-5 10-5 8h-2l-2 5-4 6h-2l-2 4-7 9-9 13-6 11-8 17-8 22-3 11-3 17-1 13-1 4v25l2 21-1 10-5 5-6 1-5-3-3-5-2-6-2-17v-41l2-21 2-10 4-21 7-25 6-15 9-17 8-12 16-20h2l1-3h2v-2l3-3h2l2-4 11-5z"
      fill="#FEDE84"
    />
    <Path
      transform="translate(1376,533)"
      d="m0 0h91v33h-11l-7-6-7-2v45l8 1v29h-58v-28l8-3v-44l-8 3-5 5h-11l-1-10v-22z"
      fill="#E658FE"
    />
    <Path
      transform="translate(388,124)"
      d="m0 0h6l3 3-1 5-1 2-28 6-20 6-15 5-11 5-15 7-14 7-21 13h-2v2l-9 6h-2v2l-5-1-3-3 1-6 4-2-1-15-1-7v-27l1-1h49l31 3h11l21-6 14-3z"
      fill="#FC615C"
    />
    <Path
      transform="translate(806,87)"
      d="m0 0h17l11 4 10 6 10 9 9 10 10 15 12 22 10 23v4l-14 6h-2l-9-21-8-16-8-14-10-13-10-10-11-6-4-1h-9l-11 4-10 8-9 11-8 13-5 9-9-3-7-4 8-16 8-12 9-11 14-11 12-5z"
      fill="#FAAE49"
    />
    <Path
      transform="translate(1764,498)"
      d="m0 0 4 1 6 16 9 19 10 15 11 12 14 9 9 3 14 1 14-3 14-6 14-10 6-6 4 2 9 8-1 4-10 9-14 9-15 7-11 3-7 1h-13l-14-3-10-4-13-9-7-6-9-11-10-15-8-16-6-14-3-8 1-4z"
      fill="#A25CCE"
    />
    <Path
      transform="translate(736,221)"
      d="m0 0 12 1 11 4 10 8 7 10 5 11 5 19 2 15 1 20v12l-1 9-17-1-1-31-2-19-4-16-4-10-6-8-10-5h-10l-13 4-13 7-10 8-3 2-11-11 1-4 11-9 15-9 13-5z"
      fill="#F79C44"
    />
    <Path
      transform="translate(1392,640)"
      d="m0 0h19l10 19 12 17 10 10 10 6 8 2 10-1 12-6 7-6 11-14 9-16 1-2 9 3 7 4-3 7-6 11-9 12-9 10-10 8-13 6-9 2h-9l-12-3-11-6-11-9-11-13-12-19-10-20z"
      fill="#FAAD49"
    />
    <Path
      transform="translate(1572,533)"
      d="m0 0h50v29l-7 34-1 3h-33l-4-16-5-24z"
      fill="#E658FE"
    />
    <Path
      transform="translate(1055,111)"
      d="m0 0h31l25 4-1 10-2 8-27-4h-21l-16 3-14 7-8 8-6 12-2 7-1 8v10l2 17-14 4h-3l-3-16v-20l3-14 5-12 7-10 8-8 14-8 12-4z"
      fill="#A25CCE"
    />
    <Path
      transform="translate(490,169)"
      d="m0 0 5 2 1 3h2v2l3 1v2h2l6 7v2h2l7 9 2 5h2l14 23 6 13 7 18 4 14 4 17 1 7v11l-5-5-8-7-11-5-12-2-4-31-5-21-6-20-8-21-6-13-3-8z"
      fill="#FEC21B"
    />
    <Path
      transform="translate(1451,102)"
      d="m0 0 7 1 9 3-1 7-6 16-10 21-11 17-9 11-9 10-12 10-11 7-14 7-13 4-6 1h-13l1-17 18-3 15-6 14-9 12-11 9-10 10-15 11-21 8-22z"
      fill="#9375E0"
    />
    <Path
      transform="translate(1786,295)"
      d="m0 0 15 4 21 8 16 8 15 9 11 9 12 11 10 13 9 16 5 15 1 4v12h-10l-7-1-3-16-8-17-9-12-13-13-16-11-19-10-21-8-13-4 2-11z"
      fill="#9376E0"
    />
    <Path
      transform="translate(264,109)"
      d="m0 0h51l33 3 15 2 2-1 2 1v3l4 2 3 2 15 1 4 2-18 3-20 5-10 3h-11l-31-3h-49l-1 5h-1v-27z"
      fill="#FC635D"
    />
    <Path
      transform="translate(1926,541)"
      d="m0 0 6 1 25 12 14 9 14 11 12 12 11 15 8 17 4 16v15l-15-1-2-1-3-18-5-13-8-13-10-12-11-9-13-9-21-11-12-5z"
      fill="#8B68DE"
    />
    <Path
      transform="translate(424,580)"
      d="m0 0h7l1 2v19l-3 11-3 9-2 12 1 12 4 8 9 10 10 8 14 10 5 5 1 3 3 1v2h2l6 9 3 9v14l-4 14-4 10-2 9 1 8 1 6h2l6 6v6l-2 2h-6l-6-4-5-8-2-12 2-14 5-14 2-5 1-5v-10l-4-10-9-10-18-13-10-8v-2l-4-2-8-11-4-8-1-3v-19l7-27 1-11v-8z"
      fill="#07040A"
    />
    <Path
      transform="translate(2017,174)"
      d="m0 0 26 1-1 17-5 1h-29l-18 3-10 4-5 4-3 6v10l4 12 7 11 3 4v3l-11 9h-3l-10-14-7-16-2-11v-7l3-11 6-9 11-8 13-5 16-3z"
      fill="#F79D44"
    />
    <Path
      transform="translate(914,295)"
      d="m0 0 4 2 10 8-2 5-5 13-1 5v25l4 17 6 15 8 15 12 17 1 3-13 10-5-5-10-14-9-16-8-20-4-16-1-7v-23l3-14 5-13z"
      fill="#8155D0"
    />
    <Path
      transform="translate(1225,43)"
      d="m0 0h13l14 3 12 6 10 9 8 14 4 13 1 6v33l-1 7-3 1-13-2-2-2 1-9v-24l-4-16-5-9-8-7-11-4h-20l-10 2-5-13v-4l12-3z"
      fill="#A25CCE"
    />
    <Path
      transform="translate(1288,457)"
      d="m0 0h28l20 4-4 17-9-1-14-2h-15l-14 3-10 6-6 8-3 8-1 5v15l1 8-17 4-2-6-1-9v-10l3-16 6-12 9-10 11-7 12-4z"
      fill="#A25CCE"
    />
    <Path
      transform="translate(1689,633)"
      d="m0 0h8l1 7v10l-1 1-22 3-15 4-11 6-5 6v9l5 10 9 10 2 4-10 12-4-2-9-9-7-11-4-10-1-4v-9l4-11 7-8 10-7 16-6 20-4z"
      fill="#F79C44"
    />
    <Path
      transform="translate(660,447)"
      d="m0 0h2l10 13-5 5-12 11-9 10-7 12-1 9 3 6 9 6 12 4 7 2-1 16-3 1-16-4-16-8-8-8-4-8-1-5v-9l4-13 7-11 9-10 4-5 8-7z"
      fill="#FAAE4A"
    />
    <Path
      transform="translate(1767,151)"
      d="m0 0 6 2 13 9 8 8 5 8 2 7v11l-4 10-8 10-12 9-21 11-11 4-5-12-1-5 18-8 14-8 9-8 3-7-1-7-5-7-13-9-4-3z"
      fill="#F1955E"
    />
    <Path
      transform="translate(1292,255)"
      d="m0 0h21l16 4 16 7-1 5-6 11-19-7-9-2h-15l-9 4-7 8-4 12-1 10-1 1h-17l1-14 4-13 5-9 8-9 14-7z"
      fill="#A25CCE"
    />
    <Path
      transform="translate(996,641)"
      d="m0 0h21l8 10 9 8 8 4 11 1 11-4 9-7 6-8 9 5 6 4-6 9-8 8-13 8-11 3h-12l-13-4-11-7-8-7-11-14-5-7z"
      fill="#A25CCE"
    />
    <Path
      transform="translate(1772,667)"
      d="m0 0h16l11 4 11 7 14 14 8 11-5 5-8 5-3-1-8-11-8-8-10-6-6-2h-9l-10 5-8 8-4 6-15-8 2-5 8-10 8-7 12-6z"
      fill="#A25DCE"
    />
    <Path
      transform="translate(388,124)"
      d="m0 0h6l3 3-1 5-1 2-28 6-20 6-15 5-11 5-15 7-14 7-21 13h-2v2l-9 6h-2v2l-5-1-3-3 1-6 10-8 9-6 7-4 18-10 23-11 21-8 27-8 14-3z"
    />
    <Path
      transform="translate(543,393)"
      d="m0 0 4 1 3 3-1 9-8 22-7 15-7 14-10 17-13 19-12 14-9 10-8 8-4 1-4-2-1-5 2-4 3-3h2l1-3h2l2-4 13-15 12-17 1-2h2l1-4 2-4h2l2-5 14-28 8-20 4-13z"
      fill="#030104"
    />
    <Path
      transform="translate(1362,351)"
      d="m0 0 9 1 8 2 2 15 5 12 6 9 6 7 13 10 14 8-1 5-6 11-6-2-13-8-10-8-12-12-9-14-5-13-2-16z"
      fill="#8D6BDE"
    />
    <Path
      transform="translate(897,489)"
      d="m0 0 5 5 5 8-2 4-19 10-15 5-10 2h-22l-12-3-11-6-3-2 1-4 10-10 11 5 10 2h10l15-3 17-7z"
      fill="#8C68DE"
    />
    <Path
      transform="translate(682,619)"
      d="m0 0 5 1 7 8 9 6 4 3h-19l-14 2-9 4-3 4v9l4 10 5 7-1 4-10 8h-3l-7-11-5-11-2-13 2-10 6-9 9-6 11-4z"
      fill="#FAAD4A"
    />
    <Path
      transform="translate(736,221)"
      d="m0 0 12 1 11 4 4 3-1 18-2 4-5-5-8-5-3-1h-10l-13 4-13 7-10 8-3 2-11-11 1-4 11-9 15-9 13-5z"
      fill="#FC645D"
    />
    <Path
      transform="translate(250,24)"
      d="m0 0h8l2 3 6 1v2l4 2v5l2 1v7l-6 2 15 9 11 6 15 9v2l-41 1-11 1-2 1 2-21-6-4-1-6-6-1-3-3v-6l3-3h6v-6z"
      fill="#FC645D"
    />
    <Path
      transform="translate(427,547)"
      d="m0 0 2 1-1 2h2v2l4 2 15 5 3 3v7l-5 5-9 4-6 1-1 3v-2l-12 2h-11l-9-2-4-4-1-7 3-5 13-8 3-3 1-3 10-2z"
      fill="#FAAF4C"
    />
    <Path
      transform="translate(204,262)"
      d="m0 0h6l2 2v8l-2 8-2 13v37l3 17 4 14v9l-4 3-5-2-3-7-4-13-3-16-1-12v-24l1-12 5-22z"
      fill="#030205"
    />
    <Path
      transform="translate(802,88)"
      d="m0 0h3l3 10 2 7-11 4-10 8-9 11-8 13-5 9-9-3-7-4 8-16 8-12 9-11 14-11z"
      fill="#FC625C"
    />
    <Path
      transform="translate(1511,649)"
      d="m0 0 9 3 7 4-3 7-6 11-9 12-9 10-10 8-10 5h-2l-5-14-1-2 11-6 7-6 11-14 9-16z"
      fill="#FC625D"
    />
    <Path
      transform="translate(1055,111)"
      d="m0 0h31l25 4-1 10-2 8-27-4h-27l-10-14v-2z"
      fill="#E645A2"
    />
    <Path
      transform="translate(1764,498)"
      d="m0 0 4 1 6 16 9 19 6 9-1 5-5 12-3 2-12-18-8-16-6-14-3-8 1-4z"
      fill="#E745A2"
    />
    <Path
      transform="translate(1956,200)"
      d="m0 0 15 1h2l1 5-2 4v10l4 12 7 11 3 4v3l-11 9h-3l-10-14-7-16-2-11v-7z"
      fill="#F13A4A"
    />
    <Path
      transform="translate(842,562)"
      d="m0 0h9l8 4 4 7v19l-4 8-5 3-4 1h-7l-7-3-4-5-2-6v-15l3-7 6-5zm6 8 1 26 4-1 3-5v-14l-3-5z"
      fill="#F9EADF"
    />
    <Path
      transform="translate(1642,660)"
      d="m0 0 9 1-6 7-1 2v9l5 10 9 10 2 4-10 12-4-2-9-9-7-11-4-10-1-4v-9l3-8 2-1z"
      fill="#FC645D"
    />
    <Path transform="translate(1577,608)" d="m0 0h41v24h-41z" fill="#E658FE" />
    <Path
      transform="translate(1786,295)"
      d="m0 0 15 4 21 8 5 2 2 6 12 18 1 3-2 1-16-9-18-8-24-8 2-11z"
      fill="#CAC9CE"
    />
    <Path
      transform="translate(806,87)"
      d="m0 0h17l11 4 10 6 1 4 6 16 4 11 1 6h-3l-9-12-10-10-11-6-13-2-5-11v-5z"
      fill="#F1955E"
    />
    <Path
      transform="translate(1451,102)"
      d="m0 0 7 1 9 3-1 7-6 16-6 13h-5v2l-6 3-13 8-4-1 9-15 9-19 6-17z"
      fill="#CAC9CE"
    />
    <Path
      transform="translate(1976,568)"
      d="m0 0 4 2 10 9 7 7 11 15 8 17 4 16v15h-2l-14-27-10-18-6-11-8-14-4-8z"
      fill="#8154D0"
    />
    <Path
      transform="translate(1282,80)"
      d="m0 0 2 1 3 13v33l-1 7-3 1-13-2-2-2 1-9v-32l7-4z"
      fill="#E645A2"
    />
    <Path
      transform="translate(1250,479)"
      d="m0 0 4 2 7 9 2 1-2 9-1 5v15l1 8-17 4-2-6-1-9v-10l3-16z"
      fill="#3048D3"
    />
    <Path
      transform="translate(1e3 151)"
      d="m0 0 4 2 6 8 4 1-1 12v10l2 17-14 4h-3l-3-16v-20l3-14z"
      fill="#8155D0"
    />
    <Path
      transform="translate(333,247)"
      d="m0 0h18l7 1 9 4 8 5v5l-3 3-7-1v-2l-5-1-9-3-11-1-14 3-10 6-3 1-1 3-3 2h-6l-2-2v-6l9-8 11-6 5-2z"
    />
    <Path
      transform="translate(912,297)"
      d="m0 0h3l-2 53-1 26-1 6-3-1-5-17-2-12v-23l3-14 5-13z"
      fill="#2E47D3"
    />
    <Path
      transform="translate(387,322)"
      d="m0 0 7 1 6 5 3 7-11-1-5 2-2 4v9l5 5 7 3v2l5 1v2h-2l-3 6-4 2h-7l-5-3-5-7-2-9v-10l3-10 6-7z"
    />
    <Path
      transform="translate(446,234)"
      d="m0 0h15l10 4 6 4 2 2v6l-3 1v2h-5l-5-4-8-3h-12l-8 4-3 1-2 4-5 7h-6l-2-3 1-6 6-8 3-3h2v-2l10-5z"
    />
    <Path
      transform="translate(1767,151)"
      d="m0 0 6 2 13 9 8 8 5 8 1 5-16 6-7-11-13-9-4-3z"
      fill="#FC625D"
    />
    <Path
      transform="translate(820,639)"
      d="m0 0 18 3-2 5-7 11-11 11-9 6-5 1-6-16 9-6 5-5z"
      fill="#8355D0"
    />
    <Path
      transform="translate(1926,541)"
      d="m0 0 6 1 21 10 3 9 9 16v3l-4-2-15-9-21-10-5-2z"
      fill="#CAC9CE"
    />
    <Path
      transform="translate(639,512)"
      d="m0 0 11 7 12 4 7 2-1 16-3 1-16-4-16-8-6-6v-3l9-7z"
      fill="#FC615D"
    />
    <Path
      transform="translate(1852,325)"
      d="m0 0 5 2 15 13 9 10 10 15 7 16 3 11v7l-3-4-22-32-13-19-11-16z"
      fill="#8B67DF"
    />
    <Path
      transform="translate(1288,457)"
      d="m0 0h28l20 4-4 17-9-1-20-3-2-1-5-9-4-5z"
      fill="#E745A2"
    />
    <Path
      transform="translate(250,24)"
      d="m0 0h8l2 3 6 1v2l4 2v5l2 1v7l-1 1h-8l-2-1-1 7h-2v2l-7-1-3-4v-4l-6-1-3-3v-6l3-3h6v-6z"
      fill="#354BD3"
    />
    <Path
      transform="translate(1433,171)"
      d="m0 0 1 2-9 11-12 11-13 9-16 8-13 4h-9l2-1v-2l17-10 19-12 12-7 9-6z"
      fill="#8155D0"
    />
    <Path
      transform="translate(1794,207)"
      d="m0 0v3l-6 7-14 10-23 11-6 2-5-12 5-4 26-9 18-7z"
      fill="#FBAE4A"
    />
    <Path
      transform="translate(1439,683)"
      d="m0 0 8 6 9 4 10 1 6-1 3 4 3 9-1 4-9 2h-9l-12-3-3-3-1-7-4-11z"
      fill="#F1955E"
    />
    <Path
      transform="translate(252,104)"
      d="m0 0h72l32 3 8 5-1 3-26-3-22-2h-64z"
      fill="#F13949"
    />
    <Path
      transform="translate(644,647)"
      d="m0 0 16 2 4 13 6 10 1 4-11 9h-3l-7-11-5-11-2-13z"
      fill="#FC625D"
    />
    <Path
      transform="translate(1305,255)"
      d="m0 0h8l16 4 16 7-1 5-6 11-19-7-7-3-5-13v-3z"
      fill="#E745A2"
    />
    <Path
      transform="translate(1889,549)"
      d="m0 0 4 2 9 8-1 4-10 9-14 9-11 5 3-10 3-8v-5l12-9z"
      fill="#8B67DF"
    />
    <Path
      transform="translate(1225,43)"
      d="m0 0h13l9 2-6 7-5 5-1 3-24 4-5-13v-4l12-3z"
      fill="#8255D0"
    />
    <Path
      transform="translate(1805,675)"
      d="m0 0 6 4 13 13 8 11-5 5-8 5-3-1-8-11-6-6 2-16z"
      fill="#E745A2"
    />
    <Path
      transform="translate(927,383)"
      d="m0 0h2l9 17 12 17 1 3-13 10-5-5-8-11v-2h2z"
      fill="#CAC9CE"
    />
    <Path
      transform="translate(254,131)"
      d="m0 0h49l40 4-4 2-14 5-6-2-31-2-34-1-1-5z"
      fill="#F13849"
    />
    <Path
      transform="translate(1362,351)"
      d="m0 0 4 1 10 25 14 34 1 2-4-2-10-10-9-14-5-13-2-16z"
      fill="#2E47D3"
    />
    <Path
      transform="translate(996,641)"
      d="m0 0h21l7 9 1 6-3 13-2 2-8-7-11-14-5-7z"
      fill="#E645A2"
    />
    <Path
      transform="translate(1439,162)"
      d="m0 0h2l-2 5-5 5-14 8-12 7-32 20-10 6h-2l1 4h-12l1-4 10-5 13-8 22-14h3v-2l8-4 11-7 10-6z"
      fill="#8B67DE"
    />
    <Path
      transform="translate(1956,200)"
      d="m0 0 15 1h2l1 5-2 4v10l1 6-9 1-10-2-1-14z"
      fill="#FC645D"
    />
    <Path
      transform="translate(814,510)"
      d="m0 0h10l44 6 7 1-1 3-13 3h-22l-12-3-11-6z"
      fill="#2F47D3"
    />
    <Path
      transform="translate(706,231)"
      d="m0 0h3l1 7-1 12-11 9-3 2-11-11 1-4 11-9z"
      fill="#E745A1"
    />
    <Path
      transform="translate(918,337)"
      d="m0 0h1l1 16 4 17 4 11-1 31-4-1-8-14v-2h2v-14l1-20z"
      fill="#9476E0"
    />
    <Path
      transform="translate(583,348)"
      d="m0 0h6l12 8 11 5 3 4-1 4-4 3-4 1-12-6-12-8-2-4 1-5z"
      fill="#08050D"
    />
    <Path
      transform="translate(1952,553)"
      d="m0 0 5 1 11 7 2 5 10 18 7 14-1 4-9-11-11-9-14-28z"
      fill="#9476E0"
    />
    <Path
      transform="translate(1511,649)"
      d="m0 0 9 3 7 4-3 7-6 11-6 8-2-3-5-12-2-3z"
      fill="#E745A2"
    />
    <Path
      transform="translate(724,223)"
      d="m0 0h6v17l-15 7-6 3v-19l-2-1 14-6z"
      fill="#F13B4A"
    />
    <Path
      transform="translate(897,489)"
      d="m0 0 5 5 5 8-2 4-5 3-27-3-6-2 3-2 17-7z"
      fill="#CAC9CE"
    />
    <Path
      transform="translate(1398,398)"
      d="m0 0 4 2 12 9 11 6-1 5-6 11-6-2-5-3-1-5-8-20z"
      fill="#CAC9CE"
    />
    <Path
      transform="translate(266,73)"
      d="m0 0h44l8 4 1 4h-7l-3-1h-48l-6 1-2-1 1-5 1-1z"
      fill="#F13949"
    />
    <Path
      transform="translate(765,120)"
      d="m0 0 3 3 5 11 1 3-7 13-9-3-7-4 8-16 4-6z"
      fill="#E745A1"
    />
    <Path
      transform="translate(639,491)"
      d="m0 0 3 1-4 10 1 11-10 8h-2l-1 2-5-9-1-10 8-5z"
      fill="#F1955F"
    />
    <Path
      transform="translate(594,286)"
      d="m0 0 5 1 2 1 1 5-3 5-7 7-8 4-7-1-2-2 1-7 10-6z"
      fill="#0A060E"
    />
    <Path
      transform="translate(1079,645)"
      d="m0 0 9 5 6 4-6 9-8 8-6 4h-2l1-10 2-15z"
      fill="#8B67DF"
    />
    <Path
      transform="translate(1262,280)"
      d="m0 0 4 4 5 11 3 3v9l-1 1h-17l1-14 4-13z"
      fill="#8A65DD"
    />
    <Path
      transform="translate(1200,555)"
      d="m0 0 10 1 5 3 2 5-1 9-4 4-2 1h-10zm7 9v6h2v-6z"
      fill="#FAEADF"
    />
    <Path
      transform="translate(1756,674)"
      d="m0 0h1v13l-1 9 2 1-5 7-15-8 2-5 8-10z"
      fill="#8B67DF"
    />
    <Path
      transform="translate(1364,351)"
      d="m0 0 7 1 6 16 18 43 3 8-4-2-4-4-10-24-14-34v-3z"
      fill="#8154D0"
    />
    <Path
      transform="translate(651,631)"
      d="m0 0 1 2 19 2 5 2-2 2-9 4-3 4-1 6-1-4-13-1-3-1 1-7z"
      fill="#F1955F"
    />
    <Path
      transform="translate(1320,557)"
      d="m0 0 2 3 6 28v6h-15l1-9z"
      fill="#F6E7DD"
    />
    <Path
      transform="translate(1651,695)"
      d="m0 0 4 1 5 5-2 5-8 9-4-2-9-9-3-4 1-3z"
      fill="#E745A1"
    />
    <Path
      transform="translate(843,569)"
      d="m0 0h7l-2 1 1 2v25h-6l-5-4-1-3v-14l3-5z"
      fill="#C6C3CF"
    />
    <Path
      transform="translate(817,505)"
      d="m0 0 54 7 15 2v2l-8 3h-3v-2h-8l-43-6-10-1-1 2 1-4z"
      fill="#8055D0"
    />
    <Path
      transform="translate(524,308)"
      d="m0 0 10 3 5 5v2h2l2 8-1 9-4 7-8 7-9 4-7 2h-6l4-9 15-2 6-4h2l2-4 2-10-3-9-6-5-8-2z"
      fill="#FDBB20"
    />
    <Path
      transform="translate(596,319)"
      d="m0 0h17l2 2v6l-4 3-22 1-3-3 1-6 3-2z"
      fill="#07040C"
    />
    <Path
      transform="translate(816,644)"
      d="m0 0 4 5-1 6-7 10-6 10-2 1-6-16 9-6 5-5z"
      fill="#9679DF"
    />
    <Path
      transform="translate(1642,682)"
      d="m0 0h3l7 11 1 2-2 1-18 2-5-9v-5z"
      fill="#F13A4A"
    />
    <Path
      transform="translate(272,395)"
      d="m0 0 5 1 6 5 3 7v6l-4 2-13-6-2-2v-7z"
      fill="#FFDF85"
    />
    <Path
      transform="translate(217,221)"
      d="m0 0h7l2 3-1 7-2 3-2 7-1 2-5 1-5-3v-9l4-8z"
      fill="#040206"
    />
    <Path
      transform="translate(1767,151)"
      d="m0 0 6 2 10 7-1 3-14 6-2 1-6-3 4-10z"
      fill="#E745A1"
    />
    <Path
      transform="translate(862,504)"
      d="m0 0h7l15 2 14 2v2l-9 4-2-1-31-4-10-2v-1z"
      fill="#9476E0"
    />
    <Path
      transform="translate(844,99)"
      d="m0 0 4 1 4 4v8l9 23 7 20 3 6v2h-2l-8-16-6-10-1-9-6-16-4-11z"
      fill="#F69C44"
    />
    <Path
      transform="translate(662,524)"
      d="m0 0h6l1 1-1 16-3 1-16-4 5-6 7-5z"
      fill="#E745A1"
    />
    <Path
      transform="translate(1387,385)"
      d="m0 0 5 5 6 7 5 14 5 12v2l-5-1-3-3-8-20-5-12z"
      fill="#9476E0"
    />
    <Path
      transform="translate(1982,243)"
      d="m0 0 4 4v3l-11 9h-3l-9-13v-2h18z"
      fill="#E745A2"
    />
    <Path
      transform="translate(1786,295)"
      d="m0 0 5 5 8 12 1 5-16-4-2-1 2-11z"
      fill="#FDFDFD"
    />
    <Path
      transform="translate(650,671)"
      d="m0 0h19l2 2-1 4-10 8h-3l-7-11z"
      fill="#E745A2"
    />
    <Path
      transform="translate(1392,640)"
      d="m0 0h19l4 8-1 2-18-1-4-7z"
      fill="#F09560"
    />
    <Path
      transform="translate(1451,102)"
      d="m0 0 7 1 9 3-3 3-16 10h-3l3-10z"
      fill="#FDFDFD"
    />
    <Path
      transform="translate(682,619)"
      d="m0 0 5 1 7 8 9 6 4 3h-9l-9-1-9-15z"
      fill="#F09560"
    />
    <Path
      transform="translate(1960,194)"
      d="m0 0h11l11 2v3l-8 5-1-3-2 1h-7l-7-2 2-5z"
      fill="#F1945E"
    />
    <Path
      transform="translate(918,337)"
      d="m0 0h1l1 16 1 6v22l-1 19h-3l-2-5h2v-14l1-20z"
      fill="#8F6EDD"
    />
    <Path
      transform="translate(254,160)"
      d="m0 0h15l14 2-3 2-8 5v-2l-16-1z"
      fill="#F13849"
    />
    <Path
      transform="translate(253,159)"
      d="m0 0 2 3 1 3 16 2v2l-15 10-2 1-1-14z"
      fill="#FB635C"
    />
    <Path
      transform="translate(1925,543)"
      d="m0 0 4 5 7 13v2l-9-3-7-3z"
      fill="#FDFDFD"
    />
    <Path
      transform="translate(2e3 626)"
      d="m0 0 3 1 10 18v3h-8l-2-1z"
      fill="#9476E0"
    />
    <Path
      transform="translate(996,641)"
      d="m0 0h21l4 5v2l-13-1-10-1z"
      fill="#A55CCB"
    />
    <Path
      transform="translate(940,406)"
      d="m0 0 3 1 8 11v2l-10 8-1-4z"
      fill="#FDFDFD"
    />
    <Path
      transform="translate(453,528)"
      d="m0 0 6 1 1 2v6l-3 3-6-1-2-3 1-5z"
      fill="#010002"
    />
    <Path
      transform="translate(818,649)"
      d="m0 0h2l-1 6-7 10-6 10-2 1-1-5 4-5 3-5 7-11z"
      fill="#8B67DF"
    />
    <Path
      transform="translate(1413,409)"
      d="m0 0 12 6-1 5-3 6h-2l-6-14z"
      fill="#FDFDFD"
    />
    <Path
      transform="translate(897,489)"
      d="m0 0 5 5 2 5-19-2 5-4z"
      fill="#FDFDFD"
    />
    <Path
      transform="translate(920,299)"
      d="m0 0 8 6-2 5-5 13-1 5h-1l1-16z"
      fill="#9475DD"
    />
    <Path
      transform="translate(524,308)"
      d="m0 0 10 3 5 5v2h2l2 8v5l-4-5-3-9-6-5-8-2z"
      fill="#F7A73C"
    />
    <Path
      transform="translate(824,498)"
      d="m0 0 11 5 4 1-1 2-13-1-4-1 2-4z"
      fill="#987CDE"
    />
    <Path
      transform="translate(1079,645)"
      d="m0 0 9 5 1 2-5 1-9-1 2-4z"
      fill="#8256D1"
    />
    <Path
      transform="translate(825,641)"
      d="m0 0h8l5 1-2 5h-3l-6-2z"
      fill="#3548D2"
    />
    <Path
      transform="translate(1269,294)"
      d="m0 0 5 4v9h-8l4-6z"
      fill="#8358D2"
    />
    <Path
      transform="translate(1374,353)"
      d="m0 0 5 1 1 14-4-5-2-5z"
      fill="#9578DF"
    />
    <Path
      transform="translate(1262,280)"
      d="m0 0 4 4-1 2h-4l-2 4 1-7z"
      fill="#8358D3"
    />
  </Svg>
);

const SpinDiscount = props => (
  <View>
    <Svg
      width={wp('30%')}
      height={wp('30%')}
      viewBox="0 0 116 112"
      fill="none"
      {...props}>
      <G filter="url(#filter0_d_2347_428)">
        <Path
          d="M5.23961 51.6531L0.884678 59.7823C-0.235016 61.8724 0.145976 64.4491 1.82261 66.1258L8.77216 73.0753C9.72024 74.0234 10.2801 75.2914 10.3419 76.6308L10.799 86.5356C10.9065 88.8642 12.5017 90.8586 14.7498 91.475L24.2628 94.0834C25.4746 94.4156 26.5317 95.1616 27.251 96.1918L32.9711 104.386C34.2935 106.28 36.6777 107.118 38.8945 106.468L47.3781 103.982C48.657 103.607 50.0294 103.72 51.2295 104.299L60.1451 108.604C62.1858 109.589 64.6251 109.189 66.245 107.605L73.4303 100.575C74.3116 99.7134 75.4622 99.1802 76.6897 99.0651L86.5484 98.1408C88.8689 97.9233 90.7853 96.2361 91.295 93.9618L93.1667 85.6114C93.4576 84.3135 94.2191 83.1695 95.304 82.4001L104.003 76.2318C105.843 74.9271 106.673 72.6131 106.083 70.4362L103.691 61.6139C103.345 60.3392 103.48 58.9819 104.071 57.8006L108.246 49.451C109.291 47.3607 108.867 44.8347 107.196 43.2004L100.235 36.3907C99.2812 35.4575 98.7083 34.2031 98.6275 32.8711L98.0166 22.7903C97.8731 20.4233 96.1966 18.4296 93.8894 17.8821L85.3335 15.8519C84.0554 15.5486 82.9324 14.7881 82.1765 13.7138L76.2752 5.32784C74.95 3.44468 72.5732 2.61394 70.3634 3.26162L61.9473 5.72841C60.6193 6.11765 59.1924 5.98008 57.9632 5.3443L49.1911 0.806975C47.1105 -0.269172 44.5727 0.124833 42.9164 1.78115L35.4306 9.26699C34.4854 10.2122 33.2222 10.7715 31.8871 10.8361L22.8587 11.273C20.4585 11.3891 18.4265 13.0832 17.8805 15.4234L15.8495 24.1276C15.5474 25.4224 14.7764 26.5594 13.6853 27.3193L4.98935 33.3754C3.03214 34.7385 2.20626 37.2276 2.96049 39.4903L5.60109 47.4121C6.06883 48.8153 5.93809 50.3493 5.23961 51.6531Z"
          fill="url(#paint0_linear_2347_428)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_2347_428"
          x1={54.4994}
          y1={-1}
          x2={54.4994}
          y2={110.245}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#308FFF" />
          <Stop offset={1} stopColor="#9443FB" />
        </LinearGradient>
      </Defs>
      <View>{props.children}</View>
    </Svg>
  </View>
);

const SpinButton = props => (
  <Svg
    width={wp('38%')}
    height={wp('17%')}
    viewBox="0 0 182 77"
    fill="none"
    {...props}>
    <G>
      <Rect
        x={7}
        y={3}
        width={168}
        height={63.1214}
        rx={20.7168}
        fill="url(#paint0_linear_2365_5729)"
      />
    </G>
    <Mask
      id="path-2-outside-1_2365_5729"
      maskUnits="userSpaceOnUse"
      x={33.2697}
      y={19.8273}
      width={116.05}
      height={28.2083}
      fill="black">
      <Rect
        fill="white"
        x={33.2697}
        y={19.8273}
        width={116.05}
        height={28.2083}
      />
      <Path d="M55.8344 38.3768C55.8257 39.42 55.6746 40.3475 55.381 41.1594C55.0979 41.9607 54.6988 42.6569 54.1835 43.2479C53.6682 43.8284 53.0632 44.3247 52.3685 44.7369C51.6738 45.1386 50.9263 45.4666 50.1259 45.7209C49.3255 45.9647 48.4828 46.119 47.5978 46.1838C46.7234 46.2591 45.8436 46.2976 44.9585 46.2992C43.3568 46.302 41.95 46.2413 40.738 46.1171C40.0424 46.034 39.0041 45.8041 37.6231 45.4272C36.4951 45.1237 35.6094 44.8039 34.966 44.4678L34.9548 38.2246L39.7123 38.2161C40.2616 38.9738 40.879 39.5311 41.5646 39.8882C42.2606 40.2452 42.9722 40.423 43.6993 40.4217C43.8889 40.4214 44.0997 40.4052 44.3314 40.3732C44.5632 40.3411 44.779 40.2512 44.979 40.1033C45.1894 39.9554 45.3629 39.7233 45.4993 39.4069C45.6463 39.0905 45.7192 38.6479 45.7182 38.0789C44.8119 37.9962 43.9107 37.8766 43.0148 37.7202C42.1294 37.5637 41.2808 37.3492 40.4689 37.0767C39.6571 36.8042 38.8978 36.4631 38.1911 36.0534C37.4949 35.6332 36.8881 35.1285 36.3707 34.5394C35.8639 33.9502 35.4622 33.2607 35.1657 32.471C34.8798 31.6707 34.7359 30.7489 34.734 29.7058C34.732 28.5888 34.8778 27.6086 35.1713 26.7651C35.4648 25.9111 35.8639 25.1781 36.3686 24.566C36.8838 23.9434 37.4835 23.4313 38.1677 23.0296C38.8624 22.6174 39.6047 22.2894 40.3945 22.0457C41.1949 21.8019 42.0218 21.6476 42.8752 21.5828C43.7391 21.5181 44.5978 21.4849 45.4513 21.4834C46.6947 21.4812 47.8117 21.5266 48.8024 21.6196C49.8035 21.7021 50.7047 21.8375 51.5058 22.0257C52.307 22.2139 53.0134 22.4287 53.625 22.6699C54.2471 22.9006 54.8007 23.1262 55.2858 23.3466L55.2968 29.5108L50.5394 29.5193C50.0006 28.7616 49.399 28.2042 48.7345 27.8472C48.0806 27.4901 47.4059 27.3122 46.7104 27.3134C46.5208 27.3138 46.3048 27.3405 46.0625 27.3936C45.8203 27.4362 45.5939 27.5472 45.3835 27.7267C45.1731 27.8957 44.9944 28.1489 44.8475 28.4864C44.7005 28.8133 44.6276 29.2613 44.6286 29.8303C46.4727 29.8902 48.0958 30.0875 49.4978 30.4221C50.8998 30.7568 52.0651 31.2658 52.9936 31.949C53.9326 32.6217 54.6402 33.4897 55.1162 34.5531C55.5923 35.606 55.8317 36.8805 55.8344 38.3768ZM58.6494 21.7126L72.4161 21.6878C74.2074 21.6846 75.7618 21.7661 77.0792 21.9324C78.3967 22.0881 79.5193 22.3179 80.4471 22.6218C81.3749 22.9257 82.129 23.2984 82.7093 23.7399C83.3002 24.1814 83.7594 24.6758 84.0871 25.2232C84.4252 25.7705 84.6529 26.3707 84.7699 27.0238C84.8976 27.6769 84.962 28.3722 84.9634 29.1098C84.9647 29.8684 84.8922 30.5798 84.7459 31.2439C84.6101 31.908 84.3531 32.5196 83.9747 33.0788C83.5964 33.6274 83.0704 34.1236 82.3968 34.5673C81.7338 35.0111 80.8757 35.3867 79.8225 35.6942C78.7799 35.9911 77.5159 36.2252 76.0304 36.3964C74.5555 36.5571 72.8171 36.6393 70.815 36.6429L70.8187 38.7134L72.8426 39.1049L72.8549 45.9646L58.6931 45.99L58.6807 39.1304L60.7031 38.7316L60.6856 28.9637L58.6618 28.5722L58.6494 21.7126ZM70.8072 32.2963C71.4184 32.2952 71.9715 32.2626 72.4666 32.1985C72.9723 32.1344 73.3988 32.0019 73.7462 31.8011C74.1041 31.5897 74.3775 31.2889 74.5664 30.8987C74.7554 30.5085 74.8493 29.9815 74.8481 29.3176C74.847 28.6749 74.7512 28.164 74.5609 27.785C74.3705 27.3955 74.096 27.1009 73.7374 26.9013C73.3893 26.7018 72.9623 26.5708 72.4564 26.5085C71.961 26.4462 71.4078 26.4156 70.7966 26.4167L70.8072 32.2963ZM87.0047 21.6616L101.167 21.6362L101.179 28.4958L99.1565 28.8946L99.174 38.6625L101.198 39.054L101.21 45.9136L87.0483 45.9391L87.036 39.0794L89.0584 38.6807L89.0409 28.9128L87.017 28.5213L87.0047 21.6616ZM112.506 34.0549L112.514 38.6385L114.538 39.0142L114.55 45.8897L104.434 45.9078L104.422 39.0482L106.445 38.6494L106.427 28.8816L104.403 28.4901L104.391 21.6304L116.53 21.6086L124.644 34.0331L124.635 28.8805L122.611 28.4574L122.599 21.5977L132.715 21.5795L132.727 28.4392L130.704 28.838L130.722 38.6058L132.746 38.9973L132.758 45.857L120.604 45.8788L112.506 34.0549ZM135.792 27.8805L135.781 21.574L147.935 21.5522L147.947 27.8587L145.941 37.7408L137.849 37.7553L135.792 27.8805ZM136.841 39.7803L146.956 39.7621L146.967 45.8315L136.852 45.8496L136.841 39.7803Z" />
    </Mask>
    <Path
      d="M55.8344 38.3768C55.8257 39.42 55.6746 40.3475 55.381 41.1594C55.0979 41.9607 54.6988 42.6569 54.1835 43.2479C53.6682 43.8284 53.0632 44.3247 52.3685 44.7369C51.6738 45.1386 50.9263 45.4666 50.1259 45.7209C49.3255 45.9647 48.4828 46.119 47.5978 46.1838C46.7234 46.2591 45.8436 46.2976 44.9585 46.2992C43.3568 46.302 41.95 46.2413 40.738 46.1171C40.0424 46.034 39.0041 45.8041 37.6231 45.4272C36.4951 45.1237 35.6094 44.8039 34.966 44.4678L34.9548 38.2246L39.7123 38.2161C40.2616 38.9738 40.879 39.5311 41.5646 39.8882C42.2606 40.2452 42.9722 40.423 43.6993 40.4217C43.8889 40.4214 44.0997 40.4052 44.3314 40.3732C44.5632 40.3411 44.779 40.2512 44.979 40.1033C45.1894 39.9554 45.3629 39.7233 45.4993 39.4069C45.6463 39.0905 45.7192 38.6479 45.7182 38.0789C44.8119 37.9962 43.9107 37.8766 43.0148 37.7202C42.1294 37.5637 41.2808 37.3492 40.4689 37.0767C39.6571 36.8042 38.8978 36.4631 38.1911 36.0534C37.4949 35.6332 36.8881 35.1285 36.3707 34.5394C35.8639 33.9502 35.4622 33.2607 35.1657 32.471C34.8798 31.6707 34.7359 30.7489 34.734 29.7058C34.732 28.5888 34.8778 27.6086 35.1713 26.7651C35.4648 25.9111 35.8639 25.1781 36.3686 24.566C36.8838 23.9434 37.4835 23.4313 38.1677 23.0296C38.8624 22.6174 39.6047 22.2894 40.3945 22.0457C41.1949 21.8019 42.0218 21.6476 42.8752 21.5828C43.7391 21.5181 44.5978 21.4849 45.4513 21.4834C46.6947 21.4812 47.8117 21.5266 48.8024 21.6196C49.8035 21.7021 50.7047 21.8375 51.5058 22.0257C52.307 22.2139 53.0134 22.4287 53.625 22.6699C54.2471 22.9006 54.8007 23.1262 55.2858 23.3466L55.2968 29.5108L50.5394 29.5193C50.0006 28.7616 49.399 28.2042 48.7345 27.8472C48.0806 27.4901 47.4059 27.3122 46.7104 27.3134C46.5208 27.3138 46.3048 27.3405 46.0625 27.3936C45.8203 27.4362 45.5939 27.5472 45.3835 27.7267C45.1731 27.8957 44.9944 28.1489 44.8475 28.4864C44.7005 28.8133 44.6276 29.2613 44.6286 29.8303C46.4727 29.8902 48.0958 30.0875 49.4978 30.4221C50.8998 30.7568 52.0651 31.2658 52.9936 31.949C53.9326 32.6217 54.6402 33.4897 55.1162 34.5531C55.5923 35.606 55.8317 36.8805 55.8344 38.3768ZM58.6494 21.7126L72.4161 21.6878C74.2074 21.6846 75.7618 21.7661 77.0792 21.9324C78.3967 22.0881 79.5193 22.3179 80.4471 22.6218C81.3749 22.9257 82.129 23.2984 82.7093 23.7399C83.3002 24.1814 83.7594 24.6758 84.0871 25.2232C84.4252 25.7705 84.6529 26.3707 84.7699 27.0238C84.8976 27.6769 84.962 28.3722 84.9634 29.1098C84.9647 29.8684 84.8922 30.5798 84.7459 31.2439C84.6101 31.908 84.3531 32.5196 83.9747 33.0788C83.5964 33.6274 83.0704 34.1236 82.3968 34.5673C81.7338 35.0111 80.8757 35.3867 79.8225 35.6942C78.7799 35.9911 77.5159 36.2252 76.0304 36.3964C74.5555 36.5571 72.8171 36.6393 70.815 36.6429L70.8187 38.7134L72.8426 39.1049L72.8549 45.9646L58.6931 45.99L58.6807 39.1304L60.7031 38.7316L60.6856 28.9637L58.6618 28.5722L58.6494 21.7126ZM70.8072 32.2963C71.4184 32.2952 71.9715 32.2626 72.4666 32.1985C72.9723 32.1344 73.3988 32.0019 73.7462 31.8011C74.1041 31.5897 74.3775 31.2889 74.5664 30.8987C74.7554 30.5085 74.8493 29.9815 74.8481 29.3176C74.847 28.6749 74.7512 28.164 74.5609 27.785C74.3705 27.3955 74.096 27.1009 73.7374 26.9013C73.3893 26.7018 72.9623 26.5708 72.4564 26.5085C71.961 26.4462 71.4078 26.4156 70.7966 26.4167L70.8072 32.2963ZM87.0047 21.6616L101.167 21.6362L101.179 28.4958L99.1565 28.8946L99.174 38.6625L101.198 39.054L101.21 45.9136L87.0483 45.9391L87.036 39.0794L89.0584 38.6807L89.0409 28.9128L87.017 28.5213L87.0047 21.6616ZM112.506 34.0549L112.514 38.6385L114.538 39.0142L114.55 45.8897L104.434 45.9078L104.422 39.0482L106.445 38.6494L106.427 28.8816L104.403 28.4901L104.391 21.6304L116.53 21.6086L124.644 34.0331L124.635 28.8805L122.611 28.4574L122.599 21.5977L132.715 21.5795L132.727 28.4392L130.704 28.838L130.722 38.6058L132.746 38.9973L132.758 45.857L120.604 45.8788L112.506 34.0549ZM135.792 27.8805L135.781 21.574L147.935 21.5522L147.947 27.8587L145.941 37.7408L137.849 37.7553L135.792 27.8805ZM136.841 39.7803L146.956 39.7621L146.967 45.8315L136.852 45.8496L136.841 39.7803Z"
      fill="url(#paint1_linear_2365_5729)"
    />
    <Path
      d="M55.8344 38.3768L57.1292 38.3876L57.1292 38.3745L55.8344 38.3768ZM55.381 41.1594L54.1633 40.7191L54.1601 40.7281L55.381 41.1594ZM54.1835 43.2479L55.1519 44.1075L55.1595 44.0988L54.1835 43.2479ZM52.3685 44.7369L53.0166 45.8578L53.0229 45.8542L53.0292 45.8504L52.3685 44.7369ZM50.1259 45.7209L50.5032 46.9595L50.5106 46.9572L50.518 46.9549L50.1259 45.7209ZM47.5978 46.1838L47.5033 44.8924L47.495 44.8931L47.4867 44.8938L47.5978 46.1838ZM40.738 46.1171L40.5845 47.4027L40.5953 47.404L40.606 47.4051L40.738 46.1171ZM37.6231 45.4272L37.964 44.1781L37.9596 44.1769L37.6231 45.4272ZM34.966 44.4678L33.6712 44.4702L33.6726 45.2531L34.3666 45.6155L34.966 44.4678ZM34.9548 38.2246L34.9525 36.9298L33.6577 36.9322L33.66 38.227L34.9548 38.2246ZM39.7123 38.2161L40.7606 37.4561L40.372 36.9201L39.71 36.9213L39.7123 38.2161ZM41.5646 39.8882L40.9665 41.0366L40.9737 41.0403L41.5646 39.8882ZM44.979 40.1033L44.2345 39.0439L44.2217 39.0529L44.209 39.0623L44.979 40.1033ZM45.4993 39.4069L44.325 38.8615L44.3174 38.8778L44.3103 38.8942L45.4993 39.4069ZM45.7182 38.0789L47.013 38.0765L47.0109 36.8966L45.8358 36.7894L45.7182 38.0789ZM43.0148 37.7202L42.7895 38.9952L42.7921 38.9957L43.0148 37.7202ZM38.1911 36.0534L37.522 37.162L37.5318 37.1679L37.5417 37.1736L38.1911 36.0534ZM36.3707 34.5394L35.3891 35.3838L35.3978 35.3937L36.3707 34.5394ZM35.1657 32.471L33.9464 32.9066L33.9499 32.9164L33.9535 32.926L35.1657 32.471ZM35.1713 26.7651L36.3942 27.1907L36.3958 27.186L35.1713 26.7651ZM36.3686 24.566L35.371 23.7405L35.3696 23.7423L36.3686 24.566ZM38.1677 23.0296L38.8232 24.1463L38.8284 24.1432L38.1677 23.0296ZM40.3945 22.0457L40.0172 20.807L40.0127 20.8085L40.3945 22.0457ZM42.8752 21.5828L42.7784 20.2917L42.7772 20.2918L42.8752 21.5828ZM48.8024 21.6196L48.6813 22.9087L48.6886 22.9094L48.696 22.91L48.8024 21.6196ZM53.625 22.6699L53.1498 23.8744L53.1622 23.8793L53.1748 23.8839L53.625 22.6699ZM55.2858 23.3466L56.5806 23.3443L56.5791 22.512L55.8214 22.1678L55.2858 23.3466ZM55.2968 29.5108L55.2992 30.8056L56.594 30.8033L56.5916 29.5085L55.2968 29.5108ZM50.5394 29.5193L49.4841 30.2696L49.8721 30.8153L50.5417 30.8141L50.5394 29.5193ZM48.7345 27.8472L48.114 28.9836L48.1216 28.9877L48.7345 27.8472ZM46.0625 27.3936L46.2867 28.6689L46.3134 28.6642L46.3399 28.6584L46.0625 27.3936ZM45.3835 27.7267L46.1942 28.7364L46.2092 28.7243L46.2238 28.7118L45.3835 27.7267ZM44.8475 28.4864L46.0285 29.0172L46.0316 29.0102L46.0346 29.0032L44.8475 28.4864ZM44.6286 29.8303L43.3338 29.8326L43.336 31.0837L44.5866 31.1244L44.6286 29.8303ZM52.9936 31.949L52.2262 32.9919L52.2328 32.9968L52.2396 33.0016L52.9936 31.949ZM55.1162 34.5531L53.9345 35.0822L53.9364 35.0866L55.1162 34.5531ZM54.5396 38.366C54.5319 39.2923 54.398 40.0703 54.1634 40.7191L56.5986 41.5997C56.9512 40.6247 57.1195 39.5477 57.1291 38.3876L54.5396 38.366ZM54.1601 40.7281C53.9269 41.3884 53.6067 41.9392 53.2075 42.397L55.1595 44.0988C55.7908 43.3746 56.269 42.5331 56.6019 41.5907L54.1601 40.7281ZM53.2152 42.3883C52.7923 42.8647 52.2922 43.2766 51.7078 43.6234L53.0292 45.8504C53.8343 45.3728 54.5442 44.792 55.1518 44.1075L53.2152 42.3883ZM51.7205 43.616C51.1104 43.9687 50.4491 44.2596 49.7338 44.4869L50.518 46.9549C51.4034 46.6735 52.2372 46.3084 53.0166 45.8578L51.7205 43.616ZM49.7486 44.4823C49.0456 44.6964 48.2981 44.8342 47.5033 44.8924L47.6924 47.4751C48.6675 47.4037 49.6054 47.2329 50.5032 46.9595L49.7486 44.4823ZM47.4867 44.8938C46.6487 44.966 45.8053 45.0028 44.9562 45.0044L44.9608 47.594C45.8819 47.5923 46.798 47.5523 47.709 47.4738L47.4867 44.8938ZM44.9562 45.0044C43.3864 45.0072 42.0261 44.9476 40.8701 44.829L40.606 47.4051C41.874 47.5351 43.3273 47.5969 44.9608 47.594L44.9562 45.0044ZM40.8915 44.8314C40.2953 44.7602 39.3331 44.5517 37.9639 44.1781L37.2822 46.6763C38.6752 47.0565 39.7896 47.3078 40.5845 47.4027L40.8915 44.8314ZM37.9596 44.1769C36.8747 43.885 36.0904 43.5943 35.5655 43.3202L34.3666 45.6155C35.1284 46.0134 36.1154 46.3624 37.2866 46.6775L37.9596 44.1769ZM36.2608 44.4655L36.2496 38.2223L33.66 38.227L33.6712 44.4702L36.2608 44.4655ZM34.9571 39.5194L39.7146 39.5109L39.71 36.9213L34.9525 36.9298L34.9571 39.5194ZM38.664 38.9761C39.3067 39.8626 40.0691 40.5692 40.9665 41.0366L42.1626 38.7398C41.6889 38.4931 41.2165 38.085 40.7606 37.4561L38.664 38.9761ZM40.9737 41.0403C41.839 41.4841 42.7528 41.7182 43.7016 41.7165L43.697 39.1269C43.1917 39.1278 42.6823 39.0063 42.1555 38.7361L40.9737 41.0403ZM43.7016 41.7165C43.9614 41.716 44.2317 41.694 44.5087 41.6558L44.1542 39.0906C43.9676 39.1163 43.8165 39.1267 43.697 39.1269L43.7016 41.7165ZM44.5087 41.6558C44.9686 41.5922 45.3861 41.4127 45.7489 41.1443L44.209 39.0623C44.172 39.0897 44.1577 39.0901 44.1542 39.0906L44.5087 41.6558ZM45.7234 41.1627C46.1855 40.838 46.4883 40.3834 46.6883 39.9196L44.3103 38.8942C44.2375 39.0632 44.1934 39.0728 44.2345 39.0439L45.7234 41.1627ZM46.6736 39.9524C46.9351 39.3894 47.0142 38.7295 47.013 38.0765L44.4234 38.0812C44.4243 38.5662 44.3574 38.7917 44.325 38.8615L46.6736 39.9524ZM45.8358 36.7894C44.9647 36.71 44.0986 36.595 43.2375 36.4447L42.7921 38.9957C43.7228 39.1582 44.6591 39.2824 45.6006 39.3683L45.8358 36.7894ZM43.2401 36.4451C42.4149 36.2993 41.6289 36.1003 40.8809 35.8492L40.0569 38.3042C40.9327 38.5982 41.8439 38.8281 42.7895 38.9952L43.2401 36.4451ZM40.8809 35.8492C40.1476 35.6031 39.4683 35.2972 38.8404 34.9333L37.5417 37.1736C38.3273 37.629 39.1665 38.0053 40.0569 38.3042L40.8809 35.8492ZM38.8602 34.9449C38.2734 34.5908 37.7701 34.1707 37.3436 33.685L35.3978 35.3937C36.006 36.0864 36.7163 36.6757 37.522 37.162L38.8602 34.9449ZM37.3523 33.695C36.9527 33.2305 36.6256 32.6756 36.378 32.016L33.9535 32.926C34.2989 33.8459 34.775 34.6699 35.3891 35.3838L37.3523 33.695ZM36.3851 32.0353C36.1587 31.4017 36.0305 30.6313 36.0288 29.7035L33.4392 29.7081C33.4413 30.8666 33.601 31.9397 33.9464 32.9066L36.3851 32.0353ZM36.0288 29.7035C36.027 28.6972 36.1588 27.8671 36.3942 27.1907L33.9484 26.3396C33.5968 27.3502 33.437 28.4805 33.4392 29.7081L36.0288 29.7035ZM36.3958 27.186C36.6458 26.4586 36.9743 25.8667 37.3676 25.3897L35.3696 23.7423C34.7536 24.4894 34.2838 25.3636 33.9468 26.3443L36.3958 27.186ZM37.3661 25.3915C37.787 24.8829 38.2715 24.4701 38.8232 24.1462L37.5122 21.913C36.6954 22.3925 35.9806 23.0039 35.371 23.7405L37.3661 25.3915ZM38.8284 24.1432C39.4333 23.7842 40.0817 23.4973 40.7763 23.2829L40.0127 20.8085C39.1276 21.0816 38.2915 21.4506 37.507 21.9161L38.8284 24.1432ZM40.7718 23.2843C41.4792 23.0688 42.2123 22.9317 42.9731 22.8739L42.7772 20.2918C41.8312 20.3635 40.9106 20.5349 40.0172 20.8071L40.7718 23.2843ZM42.972 22.874C43.8049 22.8116 44.6321 22.7797 45.4536 22.7782L45.449 20.1886C44.5635 20.1902 43.6732 20.2246 42.7784 20.2917L42.972 22.874ZM45.4536 22.7782C46.6655 22.776 47.7402 22.8204 48.6813 22.9087L48.9234 20.3305C47.8831 20.2328 46.7239 20.1863 45.449 20.1886L45.4536 22.7782ZM48.696 22.91C49.6467 22.9884 50.4828 23.1154 51.2097 23.2862L51.802 20.7652C50.9266 20.5596 49.9604 20.4159 48.9087 20.3292L48.696 22.91ZM51.2097 23.2862C51.9644 23.4635 52.6088 23.661 53.1498 23.8744L54.1001 21.4655C53.4179 21.1964 52.6496 20.9644 51.802 20.7652L51.2097 23.2862ZM53.1748 23.8839C53.7747 24.1064 54.2989 24.3204 54.7502 24.5254L55.8214 22.1678C55.3024 21.932 54.7195 21.6949 54.0752 21.4559L53.1748 23.8839ZM53.991 23.3489L54.0021 29.5131L56.5916 29.5085L56.5806 23.3443L53.991 23.3489ZM55.2945 28.216L50.537 28.2245L50.5417 30.8141L55.2992 30.8056L55.2945 28.216ZM51.5946 28.769C50.9667 27.886 50.2234 27.1774 49.3474 26.7066L48.1216 28.9877C48.5745 29.2311 49.0345 29.6373 49.4841 30.2696L51.5946 28.769ZM49.355 26.7108C48.5241 26.257 47.6366 26.017 46.7081 26.0186L46.7128 28.6082C47.1751 28.6074 47.637 28.7231 48.114 28.9836L49.355 26.7108ZM46.7081 26.0186C46.4027 26.0192 46.0919 26.0616 45.7852 26.1289L46.3399 28.6584C46.5177 28.6194 46.6388 28.6083 46.7128 28.6082L46.7081 26.0186ZM45.8384 26.1184C45.3412 26.2057 44.907 26.4313 44.5431 26.7417L46.2238 28.7118C46.2547 28.6855 46.2741 28.6748 46.2814 28.6713C46.2878 28.6681 46.2886 28.6685 46.2867 28.6689L45.8384 26.1184ZM44.5728 26.7171C44.1503 27.0564 43.8619 27.5063 43.6603 27.9695L46.0346 29.0032C46.1268 28.7915 46.1958 28.735 46.1942 28.7364L44.5728 26.7171ZM43.6665 27.9556C43.4129 28.5199 43.3326 29.1758 43.3338 29.8326L45.9234 29.8279C45.9225 29.3467 45.9882 29.1067 46.0285 29.0172L43.6665 27.9556ZM44.5866 31.1244C46.3664 31.1822 47.8997 31.3718 49.1972 31.6815L49.7984 29.1627C48.2919 28.8031 46.579 28.5981 44.6706 28.5361L44.5866 31.1244ZM49.1972 31.6815C50.4715 31.9857 51.4675 32.4335 52.2262 32.9919L53.761 30.9061C52.6628 30.098 51.3282 29.5279 49.7984 29.1627L49.1972 31.6815ZM52.2396 33.0016C52.9905 33.5395 53.5512 34.2262 53.9345 35.0822L56.298 34.024C55.7291 32.7533 54.8748 31.7039 53.7476 30.8964L52.2396 33.0016ZM53.9364 35.0866C54.3183 35.931 54.5371 37.0142 54.5396 38.3791L57.1292 38.3745C57.1262 36.7468 56.8663 35.2809 56.296 34.0197L53.9364 35.0866ZM58.6494 21.7126L58.6471 20.4178L57.3523 20.4201L57.3547 21.7149L58.6494 21.7126ZM77.0792 21.9324L76.9172 23.217L76.9273 23.2182L77.0792 21.9324ZM82.7093 23.7399L81.9253 24.7704L81.9343 24.7771L82.7093 23.7399ZM84.0871 25.2232L82.9761 25.8882L82.9808 25.896L82.9856 25.9037L84.0871 25.2232ZM84.7699 27.0238L83.4955 27.2523L83.4972 27.2622L83.4992 27.2721L84.7699 27.0238ZM84.7459 31.2439L83.4814 30.9653L83.4793 30.9749L83.4774 30.9845L84.7459 31.2439ZM83.9747 33.0788L85.0407 33.8139L85.0471 33.8044L83.9747 33.0788ZM82.3968 34.5673L81.6845 33.4861L81.6767 33.4913L82.3968 34.5673ZM79.8225 35.6942L80.1772 36.9395L80.1854 36.9371L79.8225 35.6942ZM76.0304 36.3964L76.1707 37.6836L76.1787 37.6827L76.0304 36.3964ZM70.815 36.6429L70.8127 35.3481L69.5179 35.3504L69.5202 36.6452L70.815 36.6429ZM70.8187 38.7134L69.5239 38.7157L69.5259 39.7821L70.5728 39.9846L70.8187 38.7134ZM72.8426 39.1049L74.1374 39.1026L74.1354 38.0362L73.0885 37.8337L72.8426 39.1049ZM72.8549 45.9646L72.8572 47.2594L74.152 47.257L74.1497 45.9622L72.8549 45.9646ZM58.6931 45.99L57.3983 45.9923L57.4006 47.2871L58.6954 47.2848L58.6931 45.99ZM58.6807 39.1304L58.4302 37.86L57.384 38.0663L57.3859 39.1327L58.6807 39.1304ZM60.7031 38.7316L60.9536 40.0019L61.9998 39.7956L61.9979 38.7293L60.7031 38.7316ZM60.6856 28.9637L61.9804 28.9614L61.9785 27.895L60.9315 27.6925L60.6856 28.9637ZM58.6618 28.5722L57.367 28.5745L57.3689 29.6409L58.4158 29.8434L58.6618 28.5722ZM70.8072 32.2963L69.5124 32.2987L69.5147 33.5935L70.8095 33.5911L70.8072 32.2963ZM72.4666 32.1985L72.3037 30.914L72.3004 30.9144L72.4666 32.1985ZM73.7462 31.8011L74.3943 32.9221L74.4047 32.9159L73.7462 31.8011ZM74.5609 27.785L73.3975 28.3535L73.4038 28.3661L74.5609 27.785ZM73.7374 26.9013L73.0933 28.0246L73.1005 28.0287L73.1078 28.0328L73.7374 26.9013ZM72.4564 26.5085L72.2947 27.7932L72.2981 27.7936L72.4564 26.5085ZM70.7966 26.4167L70.7943 25.1219L69.4995 25.1242L69.5018 26.419L70.7966 26.4167ZM58.6518 23.0074L72.4185 22.9826L72.4138 20.3931L58.6471 20.4178L58.6518 23.0074ZM72.4185 22.9826C74.1724 22.9795 75.6693 23.0595 76.9172 23.217L77.2413 20.6478C75.8543 20.4727 74.2425 20.3898 72.4138 20.3931L72.4185 22.9826ZM76.9273 23.2182C78.1875 23.3671 79.221 23.5826 80.044 23.8522L80.8501 21.3913C79.8176 21.0531 78.6058 20.809 77.2312 20.6465L76.9273 23.2182ZM80.044 23.8522C80.8782 24.1255 81.4915 24.4403 81.9253 24.7704L83.4933 22.7094C82.7665 22.1565 81.8716 21.7259 80.8501 21.3913L80.044 23.8522ZM81.9343 24.7771C82.4109 25.1332 82.7476 25.5064 82.9761 25.8882L85.198 24.5581C84.7713 23.8452 84.1895 23.2296 83.4843 22.7027L81.9343 24.7771ZM82.9856 25.9037C83.2355 26.3082 83.4062 26.7543 83.4955 27.2523L86.0444 26.7953C85.8995 25.9871 85.615 25.2327 85.1886 24.5426L82.9856 25.9037ZM83.4992 27.2721C83.6094 27.8359 83.6674 28.4483 83.6686 29.1121L86.2582 29.1075C86.2567 28.2961 86.1858 27.5178 86.0407 26.7755L83.4992 27.2721ZM83.6686 29.1121C83.6698 29.787 83.6053 30.4034 83.4814 30.9653L86.0104 31.5225C86.1792 30.7563 86.2597 29.9499 86.2582 29.1075L83.6686 29.1121ZM83.4774 30.9845C83.3755 31.4825 83.1849 31.9356 82.9023 32.3532L85.0471 33.8044C85.5212 33.1037 85.8447 32.3335 86.0145 31.5033L83.4774 30.9845ZM82.9088 32.3437C82.6426 32.7297 82.2476 33.1151 81.6845 33.4861L83.1092 35.6486C83.8933 35.132 84.5502 34.5251 85.0406 33.8139L82.9088 32.3437ZM81.6767 33.4913C81.156 33.8397 80.4299 34.168 79.4597 34.4513L80.1854 36.9371C81.3215 36.6054 82.3115 36.1824 83.117 35.6434L81.6767 33.4913ZM79.4679 34.4489C78.5127 34.7209 77.3219 34.9442 75.8821 35.1102L76.1787 37.6827C77.7098 37.5062 79.0471 37.2613 80.1772 36.9395L79.4679 34.4489ZM75.8902 35.1093C74.4737 35.2636 72.7834 35.3445 70.8127 35.3481L70.8173 37.9377C72.8507 37.934 74.6373 37.8507 76.1707 37.6836L75.8902 35.1093ZM69.5202 36.6452L69.5239 38.7157L72.1135 38.7111L72.1098 36.6406L69.5202 36.6452ZM70.5728 39.9846L72.5966 40.3762L73.0885 37.8337L71.0646 37.4422L70.5728 39.9846ZM71.5478 39.1072L71.5601 45.9669L74.1497 45.9622L74.1374 39.1026L71.5478 39.1072ZM72.8526 44.6698L58.6907 44.6952L58.6954 47.2848L72.8572 47.2594L72.8526 44.6698ZM59.9878 45.9877L59.9755 39.128L57.3859 39.1327L57.3983 45.9923L59.9878 45.9877ZM58.9312 40.4007L60.9536 40.0019L60.4527 37.4612L58.4302 37.86L58.9312 40.4007ZM61.9979 38.7293L61.9804 28.9614L59.3908 28.966L59.4083 38.7339L61.9979 38.7293ZM60.9315 27.6925L58.9077 27.301L58.4158 29.8434L60.4397 30.2349L60.9315 27.6925ZM59.9566 28.5699L59.9442 21.7102L57.3547 21.7149L57.367 28.5745L59.9566 28.5699ZM70.8095 33.5911C71.4639 33.59 72.073 33.5551 72.6329 33.4826L72.3004 30.9144C71.87 30.9702 71.3728 31.0005 70.8049 31.0015L70.8095 33.5911ZM72.6295 33.483C73.2617 33.4029 73.8632 33.229 74.3942 32.922L73.0981 30.6801C72.9344 30.7748 72.6828 30.8659 72.3037 30.914L72.6295 33.483ZM74.4047 32.9159C74.9918 32.5692 75.4368 32.0722 75.7318 31.463L73.4011 30.3344C73.3182 30.5056 73.2163 30.6102 73.0877 30.6862L74.4047 32.9159ZM75.7318 31.463C76.0397 30.8273 76.1443 30.0809 76.1429 29.3153L73.5533 29.3199C73.5543 29.882 73.4712 30.1897 73.4011 30.3344L75.7318 31.463ZM76.1429 29.3153C76.1416 28.566 76.033 27.8312 75.7179 27.2039L73.4038 28.3661C73.4694 28.4967 73.5523 28.7837 73.5533 29.3199L76.1429 29.3153ZM75.7242 27.2165C75.4245 26.6034 74.9703 26.1056 74.367 25.7699L73.1078 28.0328C73.2217 28.0962 73.3164 28.1875 73.3975 28.3535L75.7242 27.2165ZM74.3814 25.7781C73.8493 25.473 73.2472 25.3013 72.6147 25.2234L72.2981 27.7936C72.6774 27.8403 72.9293 27.9305 73.0933 28.0246L74.3814 25.7781ZM72.6181 25.2238C72.0579 25.1533 71.4487 25.1207 70.7943 25.1219L70.799 27.7114C71.3669 27.7104 71.8642 27.739 72.2947 27.7932L72.6181 25.2238ZM69.5018 26.419L69.5124 32.2987L72.102 32.294L72.0914 26.4143L69.5018 26.419ZM87.0047 21.6616L87.0024 20.3669L85.7076 20.3692L85.7099 21.664L87.0047 21.6616ZM101.167 21.6362L102.461 21.6339L102.459 20.3391L101.164 20.3414L101.167 21.6362ZM101.179 28.4958L101.429 29.7662L102.476 29.5599L102.474 28.4935L101.179 28.4958ZM99.1565 28.8946L98.906 27.6243L97.8597 27.8306L97.8617 28.8969L99.1565 28.8946ZM99.174 38.6625L97.8792 38.6648L97.8811 39.7312L98.9281 39.9337L99.174 38.6625ZM101.198 39.054L102.493 39.0517L102.491 37.9853L101.444 37.7828L101.198 39.054ZM101.21 45.9136L101.212 47.2084L102.507 47.2061L102.505 45.9113L101.21 45.9136ZM87.0483 45.9391L85.7535 45.9414L85.7559 47.2362L87.0506 47.2339L87.0483 45.9391ZM87.036 39.0794L86.7855 37.8091L85.7393 38.0154L85.7412 39.0818L87.036 39.0794ZM89.0584 38.6807L89.3089 39.951L90.3551 39.7447L90.3532 38.6783L89.0584 38.6807ZM89.0409 28.9128L90.3357 28.9105L90.3337 27.8441L89.2868 27.6416L89.0409 28.9128ZM87.017 28.5213L85.7222 28.5236L85.7242 29.59L86.7711 29.7925L87.017 28.5213ZM87.007 22.9564L101.169 22.931L101.164 20.3414L87.0024 20.3669L87.007 22.9564ZM99.8718 21.6385L99.8841 28.4982L102.474 28.4935L102.461 21.6339L99.8718 21.6385ZM100.928 27.2255L98.906 27.6243L99.4069 30.165L101.429 29.7662L100.928 27.2255ZM97.8617 28.8969L97.8792 38.6648L100.469 38.6602L100.451 28.8923L97.8617 28.8969ZM98.9281 39.9337L100.952 40.3252L101.444 37.7828L99.4199 37.3913L98.9281 39.9337ZM99.903 39.0563L99.9154 45.916L102.505 45.9113L102.493 39.0517L99.903 39.0563ZM101.208 44.6188L87.046 44.6443L87.0506 47.2339L101.212 47.2084L101.208 44.6188ZM88.3431 45.9367L88.3308 39.0771L85.7412 39.0818L85.7535 45.9414L88.3431 45.9367ZM87.2865 40.3498L89.3089 39.951L88.8079 37.4103L86.7855 37.8091L87.2865 40.3498ZM90.3532 38.6783L90.3357 28.9105L87.7461 28.9151L87.7636 38.683L90.3532 38.6783ZM89.2868 27.6416L87.263 27.2501L86.7711 29.7925L88.7949 30.184L89.2868 27.6416ZM88.3118 28.519L88.2995 21.6593L85.7099 21.664L85.7222 28.5236L88.3118 28.519ZM112.506 34.0549L113.574 33.3233L111.203 29.8619L111.211 34.0572L112.506 34.0549ZM112.514 38.6385L111.219 38.6409L111.221 39.7154L112.278 39.9116L112.514 38.6385ZM114.538 39.0142L115.833 39.0119L115.831 37.9373L114.774 37.7412L114.538 39.0142ZM114.55 45.8897L114.552 47.1845L115.847 47.1821L115.845 45.8873L114.55 45.8897ZM104.434 45.9078L103.14 45.9102L103.142 47.205L104.437 47.2026L104.434 45.9078ZM104.422 39.0482L104.172 37.7779L103.125 37.9842L103.127 39.0505L104.422 39.0482ZM106.445 38.6494L106.695 39.9198L107.741 39.7135L107.739 38.6471L106.445 38.6494ZM106.427 28.8816L107.722 28.8792L107.72 27.8129L106.673 27.6103L106.427 28.8816ZM104.403 28.4901L103.108 28.4924L103.11 29.5588L104.157 29.7613L104.403 28.4901ZM104.391 21.6304L104.389 20.3356L103.094 20.3379L103.096 21.6327L104.391 21.6304ZM116.53 21.6086L117.614 20.9006L117.23 20.3126L116.527 20.3138L116.53 21.6086ZM124.644 34.0331L123.56 34.7411L125.947 38.3954L125.939 34.0308L124.644 34.0331ZM124.635 28.8805L125.93 28.8781L125.928 27.828L124.9 27.6131L124.635 28.8805ZM122.611 28.4574L121.316 28.4597L121.318 29.5098L122.346 29.7248L122.611 28.4574ZM122.599 21.5977L122.597 20.3029L121.302 20.3052L121.304 21.6L122.599 21.5977ZM132.715 21.5795L134.009 21.5772L134.007 20.2824L132.712 20.2848L132.715 21.5795ZM132.727 28.4392L132.977 29.7095L134.024 29.5032L134.022 28.4369L132.727 28.4392ZM130.704 28.838L130.454 27.5676L129.408 27.7739L129.41 28.8403L130.704 28.838ZM130.722 38.6058L129.427 38.6082L129.429 39.6745L130.476 39.8771L130.722 38.6058ZM132.746 38.9973L134.041 38.995L134.039 37.9286L132.992 37.7261L132.746 38.9973ZM132.758 45.857L132.76 47.1518L134.055 47.1494L134.053 45.8546L132.758 45.857ZM120.604 45.8788L119.535 46.6104L119.922 47.1748L120.606 47.1736L120.604 45.8788ZM111.211 34.0572L111.219 38.6409L113.809 38.6362L113.801 34.0526L111.211 34.0572ZM112.278 39.9116L114.301 40.2873L114.774 37.7412L112.75 37.3655L112.278 39.9116ZM113.243 39.0166L113.255 45.892L115.845 45.8873L115.833 39.0119L113.243 39.0166ZM114.548 44.5949L104.432 44.613L104.437 47.2026L114.552 47.1845L114.548 44.5949ZM105.729 45.9055L105.717 39.0459L103.127 39.0505L103.14 45.9102L105.729 45.9055ZM104.673 40.3185L106.695 39.9198L106.194 37.3791L104.172 37.7779L104.673 40.3185ZM107.739 38.6471L107.722 28.8792L105.132 28.8839L105.15 38.6518L107.739 38.6471ZM106.673 27.6103L104.649 27.2188L104.157 29.7613L106.181 30.1528L106.673 27.6103ZM105.698 28.4877L105.686 21.6281L103.096 21.6327L103.108 28.4924L105.698 28.4877ZM104.393 22.9252L116.532 22.9034L116.527 20.3138L104.389 20.3356L104.393 22.9252ZM115.446 22.3167L123.56 34.7411L125.728 33.3251L117.614 20.9006L115.446 22.3167ZM125.939 34.0308L125.93 28.8781L123.34 28.8828L123.35 34.0354L125.939 34.0308ZM124.9 27.6131L122.876 27.19L122.346 29.7248L124.37 30.1479L124.9 27.6131ZM123.906 28.455L123.894 21.5954L121.304 21.6L121.316 28.4597L123.906 28.455ZM122.601 22.8925L132.717 22.8743L132.712 20.2848L122.597 20.3029L122.601 22.8925ZM131.42 21.5819L131.432 28.4415L134.022 28.4369L134.009 21.5772L131.42 21.5819ZM132.476 27.1688L130.454 27.5676L130.955 30.1083L132.977 29.7095L132.476 27.1688ZM129.41 28.8403L129.427 38.6082L132.017 38.6035L131.999 28.8356L129.41 28.8403ZM130.476 39.8771L132.5 40.2686L132.992 37.7261L130.968 37.3346L130.476 39.8771ZM131.451 38.9997L131.463 45.8593L134.053 45.8546L134.041 38.995L131.451 38.9997ZM132.756 44.5622L120.601 44.584L120.606 47.1736L132.76 47.1518L132.756 44.5622ZM121.672 45.1472L113.574 33.3233L111.437 34.7865L119.535 46.6104L121.672 45.1472ZM135.792 27.8805L134.497 27.8828L134.498 28.015L134.525 28.1445L135.792 27.8805ZM135.781 21.574L135.779 20.2792L134.484 20.2816L134.486 21.5764L135.781 21.574ZM147.935 21.5522L149.23 21.5499L149.228 20.2551L147.933 20.2574L147.935 21.5522ZM147.947 27.8587L149.216 28.1162L149.242 27.9876L149.241 27.8563L147.947 27.8587ZM145.941 37.7408L145.944 39.0356L147 39.0337L147.21 37.9983L145.941 37.7408ZM137.849 37.7553L136.581 38.0193L136.796 39.052L137.851 39.0501L137.849 37.7553ZM136.841 39.7803L136.839 38.4855L135.544 38.4878L135.546 39.7826L136.841 39.7803ZM146.956 39.7621L148.251 39.7598L148.249 38.465L146.954 38.4673L146.956 39.7621ZM146.967 45.8315L146.97 47.1262L148.265 47.1239L148.262 45.8291L146.967 45.8315ZM136.852 45.8496L135.557 45.8519L135.559 47.1467L136.854 47.1444L136.852 45.8496ZM137.087 27.8782L137.076 21.5717L134.486 21.5764L134.497 27.8828L137.087 27.8782ZM135.783 22.8688L147.938 22.847L147.933 20.2574L135.779 20.2792L135.783 22.8688ZM146.641 21.5545L146.652 27.861L149.241 27.8563L149.23 21.5499L146.641 21.5545ZM146.678 27.6011L144.672 37.4833L147.21 37.9983L149.216 28.1162L146.678 27.6011ZM145.939 36.446L137.847 36.4605L137.851 39.0501L145.944 39.0356L145.939 36.446ZM139.116 37.4913L137.06 27.6165L134.525 28.1445L136.581 38.0193L139.116 37.4913ZM136.843 41.0751L146.959 41.0569L146.954 38.4673L136.839 38.4855L136.843 41.0751ZM145.662 39.7644L145.673 45.8338L148.262 45.8291L148.251 39.7598L145.662 39.7644ZM146.965 44.5367L136.849 44.5548L136.854 47.1444L146.97 47.1262L146.965 44.5367ZM138.147 45.8473L138.136 39.7779L135.546 39.7826L135.557 45.8519L138.147 45.8473Z"
      fill="#467100"
      mask="url(#path-2-outside-1_2365_5729)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2365_5729"
        x1={91}
        y1={3}
        x2={91.1618}
        y2={60.4566}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#C8F170" />
        <Stop offset={1} stopColor="#55D349" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2365_5729"
        x1={93.5895}
        y1={18.4279}
        x2={91.5744}
        y2={118.784}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.0001} stopColor="#F1ED8A" />
        <Stop offset={0.113762} stopColor="#E1FF6A" />
        <Stop offset={0.852965} stopColor="#E69700" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);

const BarcodeTopSvg = props => (
  <Svg viewBox="0 0 2048 901" width={wp('100%')} height={wp('35%')} {...props}>
    <Path
      transform="translate(282,129)"
      d="m0 0h44l27 3 29 6 25 8 20 8 23 11 23 14 11 8 14 11 14 12 18 18 9 11 12 15 12 18 10 17 12 25 8 21 6 20 6 28 3 28v44l-3 27-6 28-8 26-10 24-8 16-9 16-5 8 1 3 12 5 5 1h21l16-4 15-6 16-9 5 5 7 11-2 4-20 11-19 7-14 3-9 1h-12l-17-3-12-5-8-4-7 9-12 13-7 8-8 7-12 11-20 15-19 12-24 13-26 11-22 7-25 6-28 4-14 1h-31l-23-2-29-5-26-7-19-7-18-8-16-8-17-10-16-11-14-11-14-12-20-20-9-11-13-17-11-17-9-16-8-16-7-16-9-27-5-20-5-32-1-12v-39l3-26 5-26 7-24 6-17 9-20 11-21 11-17 8-11 7-9 12-14 12-13 12-11 17-14 20-14 21-12 16-8 19-8 27-9 26-6 22-3z"
      fill="#F8D455"
    />
    <Path
      transform="translate(403,300)"
      d="m0 0h25l12 3 13 5 13 9 7 6 11 14 8 17 3 15v21l-3 14-7 16-8 11-5 6-14 11-15 7-14 4-9 1h-9l-13-2-16-5-12-7-11-9-8-9-6-9-5-11-4-15-1-7v-13l3-15 4-12 7-12 8-10 10-9 13-8 17-6z"
      fill="#074785"
    />
    <Path
      transform="translate(185,309)"
      d="m0 0h20l19 5 14 7 10 8 10 10 8 13 5 11 3 13v26l-4 15-8 16-8 10-9 9-13 8-14 6-17 3h-13l-17-3-18-8-13-10-8-8-7-11-6-12-4-15-1-16 2-14 5-16 6-11 8-10 9-9 11-7 13-6z"
      fill="#074785"
    />
    <Path
      transform="translate(176,280)"
      d="m0 0h20l18 3 17 6 16 9 10 8 9 8 8 10 8 13 8 18 4 18 1 9v13l-3 19-4 13-6 13-6 10-8 10-6 7-11 9-14 9-16 7-16 4-7 1h-24l-15-3-13-4-16-8-13-9-11-10-11-14-7-12-6-15-4-17-1-9v-15l2-14 4-15 7-16 8-12 12-14 12-10 13-8 11-5 16-5zm9 29-17 4-17 8-10 8-9 9-9 14-5 12-3 12-1 16 2 14 5 16 7 12 7 9 7 7 13 9 16 7 17 3h13l17-3 16-7 12-8 11-11 9-14 6-15 2-9v-26l-4-15-8-16-7-9-10-10-11-7-10-5-19-5z"
      fill="#FBFBFC"
    />
    <Path
      transform="translate(415,269)"
      d="m0 0h15l15 2 20 6 15 8 12 9 12 11 13 18 7 15 5 16 2 13v22l-3 17-6 17-9 16-9 11-12 12-14 10-17 8-18 5-7 1h-27l-15-3-15-5-15-8-13-10-13-13-9-13-8-16-5-16-2-12v-24l3-17 6-16 7-13 8-11 9-10 12-10 13-8 11-5 17-5zm-12 31-12 3-13 5-12 8-12 11-10 15-5 12-3 12-1 7v13l3 15 4 12 7 12 9 11 9 8 10 6 10 5 15 4 9 1h9l13-2 15-5 13-7 14-12 10-14 7-16 3-14v-21l-3-15-8-17-8-10-5-6-12-9-9-5-16-6-6-1z"
      fill="#FBFBFC"
    />
    <Path
      transform="translate(363,492)"
      d="m0 0h4l1 13v27l-2 23-3 15-1 2-13-3h-20l-13 3-11 5-10 7-8 9-7 13-5-5-8-16-4-15-3-19-1-13v-25l2-20 27 1h55z"
      fill="#074785"
    />
    <Path
      transform="translate(537,99)"
      d="m0 0h13l12 3 14 7 10 8 6 5 9 11 9 12 12 20 12 24 9 21v3l-18 7h-2l-11-25-8-17-10-17-10-14-9-10-10-9-13-6-10-1-12 3-11 7-8 7-13 17-12 22-19-8 1-5 9-17 12-17 12-13 12-9 12-6z"
      fill="#F9B26D"
    />
    <Path
      transform="translate(1253,739)"
      d="m0 0h4l11 27 8 16 9 17 12 17 11 12 10 7 10 4 10 1 9-2 11-6 10-9 7-7 12-18 7-13 9 3 10 5-3 9-11 18-10 13-14 14-14 9-11 4-11 2-14-1-12-4-11-6-13-11-9-10-10-14-9-15-10-19-11-26-3-8v-3z"
      fill="#F9B26D"
    />
    <Path
      transform="translate(1705,600)"
      d="m0 0 2 2 8 21 10 21 9 14 7 9 8 9 12 9 13 6 9 2h18l15-4 17-8 12-9 10-9 4 2 12 11-2 4-12 11-15 10-16 8-17 5-5 1h-24l-16-4-16-8-10-8-10-9-12-15-11-18-12-25-7-19 1-3z"
      fill="#B8A4EB"
    />
    <Path
      transform="translate(851,128)"
      d="m0 0 25 1 25 4 5 1-1 9-3 12-9-1-21-3h-31l-15 3-12 5-11 7-8 10-6 13-2 9-1 9v9l2 16 1 6-8 3-13 3-3-14-1-9v-19l3-17 5-13 7-12 11-12 14-9 14-6 20-4z"
      fill="#FC6085"
    />
    <Path
      transform="translate(418,662)"
      d="m0 0 8 1 6 4 3 5v9l-5 7-13 8-15 7-15 5-16 4-14 2h-38l-19-3-9-4-3-6v-8l5-8 6-3 10 1 12 2h32l17-3 15-4 17-7 13-8z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(1321,117)"
      d="m0 0 20 6-3 10-8 21-9 19-11 18-12 16-11 12-9 9-13 10-17 10-18 7-14 3h-16l1-21 17-2 16-5 15-8 12-9 10-9 8-8 12-16 11-19 10-21 8-22z"
      fill="#B7A5EB"
    />
    <Path
      transform="translate(301,141)"
      d="m0 0 20 1 18 3 18 6 5 4 2 4v8l-4 6-4 3-7 1-16-5-21-3h-22l-17 2-23 6-25 10-9-1-6-7-1-2v-9l5-6 15-7 21-7 17-4 15-2z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(1729,354)"
      d="m0 0 8 1 27 9 24 11 17 10 14 10 13 12 11 11 12 17 8 16 5 15 2 11v9h-21l-3-17-5-13-7-13-10-13-8-9-11-9-14-10-20-11-25-10-22-7 2-10z"
      fill="#B8A5EC"
    />
    <Path
      transform="translate(1900,653)"
      d="m0 0 10 3 18 8 19 11 17 12 13 12 10 10 11 15 9 17 6 18 2 13v12l-1 1-16-1-5-1-1-15-4-14-8-17-8-11-9-10-8-8-16-12-21-12-20-9-5-2 3-10z"
      fill="#B7A5EB"
    />
    <Path
      transform="translate(2e3 206)"
      d="m0 0h23l14 1v14l-1 8h-43l-18 3-11 4-9 6-4 7v14l5 14 9 14 4 6-10 9-5 4-4-2-10-14-9-19-3-14v-11l3-11 6-10 7-7 10-6 13-5 13-3z"
      fill="#F9B16D"
    />
    <Path
      transform="translate(665,353)"
      d="m0 0 4 2 13 10v3l-6 12-4 18v21l3 17 7 21 8 16 9 15 10 14 1 4-14 11-3 1-13-18-9-15-8-16-6-15-4-13-3-16-1-21 2-17 4-15 8-16z"
      fill="#0C4A88"
    />
    <Path
      transform="translate(1045,46)"
      d="m0 0h16l15 3 10 4 10 7 5 4 9 12 5 11 4 14 2 13v27l-2 17-21-3 1-18v-19l-2-14-4-12-6-10-9-8-9-4-12-2-17 1-12 3-4-10-3-8v-3l16-4z"
      fill="#B7A4EB"
    />
    <Path
      transform="translate(1131,550)"
      d="m0 0h13l19 2 15 3 2 1-4 19-2 2-23-4h-25l-16 4-11 7-6 8-4 9-2 11v13l1 12-9 3-11 2-2-5-1-6v-25l4-16 7-13 9-10 9-7 11-5 16-4z"
      fill="#0D4A88"
    />
    <Path
      transform="translate(1618,765)"
      d="m0 0 3 1 1 21-28 4-16 4-16 8-6 7-1 7 3 10 7 11 8 9 3 3-12 14-3 2-12-12-9-13-5-11-2-7v-14l4-11 8-10 10-7 15-7 19-5 19-3z"
      fill="#F9B16D"
    />
    <Path
      transform="translate(329,568)"
      d="m0 0h20l11 3 2 1 1-2v5h-2l-2 10-8 16-9 10-8 6-10 4-5 1h-13l-13-4-9-6-6-5 1-2 8-13 9-10 10-7 17-6z"
      fill="#FC6086"
    />
    <Path
      transform="translate(583,684)"
      d="m0 0 2 1 1 8v38l-3 18-5 17-6 14-7 11-9 11-10 9-12 7h-3l-7-18v-2l9-5 9-8 9-13 6-13 5-17 2-14v-41z"
      fill="#B8A5EC"
    />
    <Path
      transform="translate(1706,178)"
      d="m0 0 5 1 14 9 10 9 6 7 5 10 1 3v17l-4 10-7 9-8 8-15 10-25 12-9 3-5-12-2-5 1-4 23-10 15-9 10-9 4-7v-9l-6-9-8-7-13-8 1-5z"
      fill="#F9B16D"
    />
    <Path
      transform="translate(780,762)"
      d="m0 0 3 1 9 14 9 11 9 8 12 6 3 1h12l10-4 6-4 8-7 6-8 12 7 6 4-4 7-10 11-11 8-12 6-8 2h-18l-15-5-12-8-12-11-11-14-8-13v-3z"
      fill="#B8A4EB"
    />
    <Path
      transform="translate(571,405)"
      d="m0 0h8l8 5 2 5v37l-2 20-5 19-5 12-5 5-2 1h-11l-7-6-1-2v-11l5-13 3-12 1-10 1-41 4-6z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(172,230)"
      d="m0 0h22l5 3 4 5 1 3v10l-3 6-5 4-3 1-24 2-16 3-17 6-4 2h-9l-6-4-3-6-1-9 3-7 5-5 17-7 19-5z"
      fill="#074785"
    />
    <Path
      transform="translate(416,222)"
      d="m0 0h14l23 4 20 7 15 7 5 4 2 6-1 9-3 6-6 5-7 1-10-4-17-7-23-5-16-2-6-5-2-4v-8l5-10z"
      fill="#074785"
    />
    <Path
      transform="translate(1129,304)"
      d="m0 0h20l18 4 16 6 9 4-2 6-7 13-5-1-15-6-17-4h-13l-10 3-8 6-5 7-4 12-2 15h-21v-12l4-17 7-14 11-12 11-6z"
      fill="#B4A2E9"
    />
    <Path
      transform="translate(397,748)"
      d="m0 0 22 1 2 1-2 21h-37l-16 4-7 5-1 2v12l5 12 7 11-16 13-5-5-8-14-4-10-2-11 1-11 4-10 7-8 12-7 14-4 7-1z"
      fill="#F9B26D"
    />
    <Path
      transform="translate(120,498)"
      d="m0 0h18l11 4 9 6 6 9v11l-4 7-7 6-12 5-14 1-10-2-10-4-8-7-4-8v-9l4-7 8-7 9-4z"
      fill="#FD6085"
    />
    <Path
      transform="translate(1713,807)"
      d="m0 0h18l12 4 12 7 10 9 10 10 10 14v2l-15 10-4-1-9-12-7-8-12-9-10-4h-13l-12 6-9 9-5 8-16-8-3-3 9-13 9-9 11-7 10-4z"
      fill="#B8A4EB"
    />
    <Path
      transform="translate(476,491)"
      d="m0 0h17l10 3 8 5 6 7 2 5v8l-4 8-9 7-9 3-6 1h-10l-13-3-10-7-4-5-2-5v-9l3-6 8-7 9-4z"
      fill="#FD6085"
    />
    <Path
      transform="translate(1212,421)"
      d="m0 0 11 2 9 2 1 1 1 14 5 15 7 11 9 10 7 7 16 11 11 6-1 5-8 15-14-7-17-12-13-12-10-12-8-14-6-18-1-7v-11z"
      fill="#0D4A88"
    />
    <Path
      transform="translate(645,590)"
      d="m0 0 5 5 7 11-2 4-20 11-19 7-14 3-9 1h-12l-17-3-12-5-6-4 1-4 4-5 4-7 4-2 10 5 8 2h21l16-4 15-6z"
      fill="#B8A5EC"
    />
    <Path
      transform="translate(1705,600)"
      d="m0 0 2 2 8 21 10 21 9 14 7 9 8 9 5 5-5 11-3 7h-3l-11-9-10-11-12-17-14-27-10-26 1-3z"
      fill="#FC6085"
    />
    <Path
      transform="translate(1394,785)"
      d="m0 0 9 3 10 5-3 9-11 18-10 13-14 14-14 9-11 4-4 1h-12l-2-9-4-10v-2h10l9-2 11-6 10-9 7-7 12-18z"
      fill="#FC6084"
    />
    <Path
      transform="translate(537,99)"
      d="m0 0h10l-3 2 2 8 4 11-4 1-10 1-10 4-13 10-10 12-9 14-8 15-19-8 1-5 9-17 12-17 12-13 12-9 12-6z"
      fill="#FC6084"
    />
    <Path
      transform="translate(794,145)"
      d="m0 0 5 3 8 11 2 3-9 7-6 9-5 11-2 9-1 9v9l2 16 1 6-8 3-13 3-3-14-1-9v-19l3-17 5-13 7-12 11-12z"
      fill="#B8A5EC"
    />
    <Path
      transform="translate(1106,73)"
      d="m0 0h2l7 14 4 14 2 13v27l-2 17-21-3 1-18v-19l-2-14-6-18 14-12z"
      fill="#FC6085"
    />
    <Path
      transform="translate(1131,550)"
      d="m0 0h13l19 2 15 3 2 1-4 19-2 2-23-4h-25l-15 3-2-5-9-12v-2l15-5z"
      fill="#FC6085"
    />
    <Path
      transform="translate(1936,239)"
      d="m0 0 18 1 5 2-3 7v14l5 14 9 14 4 6-10 9-5 4-4-2-10-14-9-19-3-14v-11z"
      fill="#FC6084"
    />
    <Path
      transform="translate(671,419)"
      d="m0 0h1l3 17 7 21 8 16 9 15 10 14 1 4-14 11-3 1-13-18-9-15-4-7v-2h2v-14z"
      fill="#B8A5EC"
    />
    <Path
      transform="translate(1960,686)"
      d="m0 0 4 1 13 12 10 10 11 15 9 17 6 18 2 13v12h-4l-8-16-13-24-14-26-8-14-8-16z"
      fill="#0D4A88"
    />
    <Path
      transform="translate(780,762)"
      d="m0 0 3 1 9 14 9 11 9 8 5 3-1 9-2 12-2 1-11-6-11-9-10-11-10-14-4-7v-3z"
      fill="#FC6085"
    />
    <Path
      transform="translate(1551,808)"
      d="m0 0 5 1-1 8 3 10 7 11 8 9 3 3-12 14-3 2-12-12-9-13-5-11-2-7v-12l7-2z"
      fill="#FC6084"
    />
    <Path
      transform="translate(1129,304)"
      d="m0 0h20l18 4 16 6 9 4-2 6-7 13-5-1-15-6-17-4-10-1-7-15-1-5z"
      fill="#FC6085"
    />
    <Path
      transform="translate(1223,424)"
      d="m0 0 9 1 1 1 1 14 5 15 7 11 9 10 7 7 16 11 11 6-1 5-8 15-14-7-12-8-1-6-30-72z"
      fill="#B8A5EC"
    />
    <Path
      transform="translate(1737,809)"
      d="m0 0 10 4 11 7 17 17 10 14v2l-15 10-4-1-9-12-7-8-16-12z"
      fill="#FC6085"
    />
    <Path
      transform="translate(1706,178)"
      d="m0 0 5 1 14 9 10 9 6 7 5 10 1 3v8l-8 1-11 4h-2l-1-9-6-9-8-7-13-8 1-5z"
      fill="#FC6084"
    />
    <Path
      transform="translate(339,772)"
      d="m0 0 21 2 2 1-2 4-2 3v12l5 12 7 11-16 13-5-5-8-14-4-10-2-11 1-11z"
      fill="#FC6084"
    />
    <Path
      transform="translate(552,610)"
      d="m0 0 77 10h3v2l-16 6-14 3-9 1h-12l-17-3-12-5-6-4 1-4z"
      fill="#0C4988"
    />
    <Path
      transform="translate(768,184)"
      d="m0 0 4 2 9 12 2 4h2l2 24 2 12-8 3-13 3-3-14-1-9v-19l3-17z"
      fill="#104B8A"
    />
    <Path
      transform="translate(1300,201)"
      d="m0 0 1 2-9 11-14 14-13 10-17 10-18 7-14 3h-11v-1l7-2 14-9 12-7 16-10 12-7 9-6 7-4 15-9z"
      fill="#0D4A88"
    />
    <Path
      transform="translate(1729,354)"
      d="m0 0 8 1 21 7 2 6 13 19 1 5-20-8-30-10 2-10z"
      fill="#D1C9F3"
    />
    <Path
      transform="translate(583,739)"
      d="m0 0h1l-1 10-5 17-6 14-7 11-9 11-10 9-12 7h-2l2-4 6-11 2-1 3-5 9-14 26-39z"
      fill="#0F4B8A"
    />
    <Path
      transform="translate(1321,117)"
      d="m0 0 20 6-3 10-6 16-5 1-10 6-12 7h-3l2-6 8-17 8-22z"
      fill="#D1C9F3"
    />
    <Path
      transform="translate(1045,46)"
      d="m0 0h16l4 1-2 4-13 12-1 2 2 2-2 1-13 2-8 2-4-10-3-8v-3l16-4z"
      fill="#124D8B"
    />
    <Path
      transform="translate(1900,653)"
      d="m0 0 10 3 7 3 6 12 9 16-1 4-19-10-19-8 3-10z"
      fill="#D1C9F3"
    />
    <Path
      transform="translate(252,668)"
      d="m0 0 8 2 5 5 1 2v11l-4 6-7 3-8-1-6-5-2-5v-7l3-6 5-4z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(455,637)"
      d="m0 0h7l5 3 4 5 1 2v9l-4 6-5 3h-10l-6-5-2-5v-8l3-6z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(443,318)"
      d="m0 0 7 1 12 7 12 11 9 12-1 5-5 3-5-2-9-11-10-9-11-6-2-2v-6z"
      fill="#F0EDF9"
    />
    <Path
      transform="translate(223,327)"
      d="m0 0 9 3 11 7 8 7 8 10 3 4v5l-5 3-5-1-11-13-8-7-12-7-2-2 1-7z"
      fill="#F1EEFA"
    />
    <Path
      transform="translate(583,684)"
      d="m0 0 2 1 1 14-6 8h-2l-1 4-8 12-4 3-1-39z"
      fill="#D1C9F3"
    />
    <Path
      transform="translate(177,179)"
      d="m0 0 9 1 5 4 2 5-1 9-3 5-6 3-9-1-5-4-2-5v-7l3-6 4-3z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(429,560)"
      d="m0 0h2l4 13 2 5 15 4-1 3-14 4-2 6-3 12-2 1-5-18-5-2-11-3v-2l15-5 2-4z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(391,172)"
      d="m0 0 8 1 6 5 1 2v10l-3 5-5 4h-8l-5-3-4-5v-10l4-6z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(40,436)"
      d="m0 0h2l3 10 2 8 15 4v3l-15 5-4 18h-2l-3-9-2-9-16-5v-2l16-5z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(687,469)"
      d="m0 0 3 4 9 15 10 14 1 4-14 11-3 1-8-11 2-2 1-18v-13z"
      fill="#D1C9F3"
    />
    <Path
      transform="translate(294,222)"
      d="m0 0 2 1 4 17 5 2 11 3v2l-13 4h-3l-3 16-2 3-3-7-3-11-16-5 1-2 14-4 3-9z"
      fill="#074785"
    />
    <Path
      transform="translate(164,579)"
      d="m0 0 2 3 4 15 16 5-3 3-13 4-4 17-2 1-5-18-15-4v-3l15-5 4-17z"
      fill="#074785"
    />
    <Path
      transform="translate(645,590)"
      d="m0 0 5 5 7 11-2 4-3 1-7-2-28-4 3-2 16-8z"
      fill="#D0C8F2"
    />
    <Path
      transform="translate(1263,484)"
      d="m0 0 9 6 13 8 4 2-1 5-8 15-5-2-3-9-9-23z"
      fill="#D1C9F3"
    />
    <Path
      transform="translate(1729,355)"
      d="m0 0 4 5 10 14 3 6-9-2-13-4 2-10z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(1321,117)"
      d="m0 0 17 5v2l-18 11-6 2 3-11z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(1898,657)"
      d="m0 0h2l5 9 6 11v3l-6-2-12-5 3-10z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(421,309)"
      d="m0 0 8 1 5 4v5l-3 3h-7l-5-2-2-3 1-6z"
      fill="#EBE7F8"
    />
    <Path
      transform="translate(199,319)"
      d="m0 0h7l6 3 1 1v6l-4 3-8-1-5-5 1-5z"
      fill="#EBE7F8"
    />
    <Path
      transform="translate(697,486)"
      d="m0 0 4 5 9 12-1 4-13 10v-3l1-1 1-12v-10z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(576,685)"
      d="m0 0 4 1-14 21h-1l-1-10v-10z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(260,374)"
      d="m0 0h6l3 4v8l-2 2h-7l-3-6 1-6z"
      fill="#EBE7F8"
    />
    <Path
      transform="translate(480,365)"
      d="m0 0h7l3 4v7l-4 3-5-1-3-4v-6z"
      fill="#ECE8F8"
    />
    <Path
      transform="translate(1274,492)"
      d="m0 0 15 8-1 5-4 8h-2l-8-19z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(645,590)"
      d="m0 0 5 5 4 7-23-3 5-4z"
      fill="#FEFEFD"
    />
    <Path
      transform="translate(673,359)"
      d="m0 0 4 2 6 5-7 14-3 12h-1v-7l1-5z"
      fill="#B8A5EC"
    />
  </Svg>
);

const BadLuckSvg = props => (
  <Svg viewBox="0 0 2048 809" width={wp('100%')} height={wp('32%')} {...props}>
    <Path
      transform="translate(263,106)"
      d="m0 0h28l22 2 23 4 26 7 22 8 21 10 17 10 17 12 10 8 12 11 15 15 11 14 11 16 9 16 6 12v2l5-2 6-1h16l10 3 9 5 9 8 9 14 7 19 4 22 1 9 1 30-1 15h-13l-7-1-1-37-2-19-5-21-8-16-8-7-10-3-13 1 4 16 5 24 2 19v31l-3 25-6 26-9 25-9 20-11 19-14 20-11 13-11 12-5 6-11 9-12 11-8 10-5 8-3 10 1 7 4 6 10 6 13 4 9 2-2 17-1 3-16-3-16-6-10-7-8-9-4-9-1-13v-3l-16 8-18 8-24 8-25 6-28 4-14 1h-26l-22-2-24-4-26-7-19-7-25-12-14-8-12-8-13-10-13-11-16-16-9-11-11-15-12-20-9-19-9-25-6-26-3-25v-29l3-25 4-18 6-20 6-16 12-25 11-18 12-16 9-11 12-13 9-9 11-9 15-12 17-11 16-9 25-12 20-7 21-6 25-5 15-2z"
      fill="#FEE106"
    />
    <Path
      transform="translate(150,268)"
      d="m0 0h9l13 3 11 6 10 8 9 10 10 15 7 15 6 18 4 19 2 21v12l-2 21-4 17-5 14 1 4 5 6 1 10-4 8-8 7-11 4-21 1-12 4h-12l-9-3h-8l-6 3h-10l-8-5-4-8 1-9 6-8-1-4-7-11-8-16-6-18-4-19-2-22v-10l2-21 4-18 6-16 8-14 12-13 11-7 9-3z"
    />
    <Path
      transform="translate(363,249)"
      d="m0 0h14l13 4 12 7 9 8 11 14 9 16 8 21 5 21 2 15v29l-3 19-5 18-4 11 5 2 5 6 1 3v8l-3 6-6 5-3 1h-10l-7-1-16 8h-27l-6 2h-16l-9-3-8-7-2-5v-9l4-7-2-5-9-15-8-20-5-18-3-19v-34l3-18 5-17 8-17 9-12 7-7 10-6 7-3z"
    />
    <Path
      transform="translate(263,106)"
      d="m0 0h28l22 2 23 4 26 7 22 8 21 10 17 10 17 12 10 8 12 11 15 15 11 14 11 16 9 16 6 12v2l5-2 6-1h16l10 3 9 5 9 8 9 14 7 19 4 22 1 9 1 30-1 15h-13l-7-1-1-37-2-19-5-21-8-16-8-7-10-3-13 1 4 16 5 24 2 19v31l-3 25-6 26-9 25-9 20-11 19-14 20-11 13-11 12-5 6-11 9-12 11-8 10-5 8-3 10 1 7 4 6 10 6 13 4 9 2-2 17-1 3-16-3-16-6-10-7-8-9-4-9-1-13v-3l-16 8-18 8-24 8-25 6-28 4-14 1h-26l-22-2-24-4-26-7-19-7-25-12-14-8-12-8-13-10-13-11-16-16-9-11-11-15-12-20-9-19-9-25-6-26-3-25v-29l3-25 4-18 6-20 6-16 12-25 11-18 12-16 9-11 12-13 9-9 11-9 15-12 17-11 16-9 25-12 20-7 21-6 25-5 15-2zm-9 3-24 3-28 6-30 10-20 9-21 11-18 12-16 12-13 12-10 9-7 8-8 9-10 13-11 17-9 16-8 17-9 25-6 25-3 21-1 16v11l2 25 5 26 11 33 10 21 12 19 12 16 9 10 7 8 7 7 11 9 14 11 14 9 18 10 19 9 33 11 24 5 24 3h45l24-3 28-6 33-11 29-14 17-10 17-12 11-9 10-9 8-7 15-16 13-17 10-15 9-16 10-21 7-19 6-23 4-25 1-14v-19l-2-22-5-26-10-30-12-25-10-16-12-16-12-14-15-15-14-11-15-11-19-11-27-13-24-8-25-6-19-3-10-1z"
      fill="#0E0A08"
    />
    <Path
      transform="translate(364,251)"
      d="m0 0h12l13 4 9 5 10 9 7 7 10 15 8 17 7 23 3 17 1 10v24l-3 20-4 15-5 12-4 1-9-2 2-6 5-10 4-16 1-10v-10l-29-17 1-2 29 2-4-25-6-20-8-17-4 12-7 9-9 5-7 2h-10l-10-3-9-7-6-9-2-7v-9l4-11 8-8 8-4 3-1-11 1-9 4-8 6-8 10-8 17-5 21-1 9v24l3 21 6 21 8 17 10 14 6 7-9-1-8 2-7-10-8-16-7-19-4-17-2-15v-30l3-19 6-20 9-17 8-10 9-8 13-6z"
      fill="#F6F5FA"
    />
    <Path
      transform="translate(153,270)"
      d="m0 0 11 1 11 4 10 6 11 10 11 15 8 15 7 19 5 23 1 8v36l-4 22-6 17-3 3h-10l-5 2 2-5 7-14 5-17 2-12v-32l-4-22-6-18-8-16-7-10-8-9-11-7-8-3-11-1-6 1 12 3 9 6 6 9 2 7v10l-4 10-7 8-8 5-5 2-11 1-9-2-8-5-7-8-3-7-4 14-2 14v25l1 12 16-5 13-3-6 7-15 14-3 3 2 11 5 14 6 11 9 11v2l-10 4-3-1-11-18-7-16-6-21-3-20v-34l3-19 7-21 9-16 11-12 11-7 9-3z"
      fill="#F6F5FA"
    />
    <Path
      transform="translate(611,94)"
      d="m0 0h16l13 4 10 5 11 9 9 9 10 13 13 21 12 24 8 19v4l-18 7-6-13-9-20-9-17-10-15-8-10-10-10-10-6-9-3h-10l-11 4-12 9-8 9-10 15-8 15-5-1-14-6 2-6 8-15 10-14 9-10 8-8 13-8 10-4z"
      fill="#F8B16C"
    />
    <Path
      transform="translate(1294,701)"
      d="m0 0 3 1 11 27 11 22 11 17 8 10 10 10 10 6 5 2 11 1 13-4 10-7 11-11 9-13 10-17 9 3 9 5-8 16-7 11-8 10-9 10-12 9-12 6-16 3-16-2-12-5-11-8-10-9-12-15-11-18-11-21-13-31 3-3z"
      fill="#F9B26C"
    />
    <Path
      transform="translate(1720,570)"
      d="m0 0 4 1 8 21 9 19 7 11 9 12 10 10 14 9 12 4 7 1h9l15-3 16-7 12-8 13-11 4 2 11 11-6 7-12 10-15 9-14 6-15 4-8 1h-11l-16-3-15-6-13-9-11-10-11-14-9-14-9-17-11-28 1-3z"
      fill="#8C67DE"
    />
    <Path
      transform="translate(900,122)"
      d="m0 0h33l26 4 4 1-1 10-2 10-9-1-21-3h-28l-18 4-14 7-9 8-7 12-4 16v23l2 13-16 5h-4l-3-16v-28l4-17 8-16 10-12 13-9 10-5 14-4z"
      fill="#8C67DE"
    />
    <Path
      transform="translate(1357,111)"
      d="m0 0 12 3 7 3-3 11-8 20-8 16-8 14-10 14-11 13-10 10-13 10-15 9-14 6-14 4-7 1h-13l1-16 1-4 19-3 16-6 14-8 11-9 15-15 12-17 8-14 10-21z"
      fill="#8C67DE"
    />
    <Path
      transform="translate(1745,335)"
      d="m0 0 21 6 16 6 25 12 16 10 11 9 10 9 7 7 12 16 8 15 6 18 2 12v6h-20l-4-19-7-16-8-12-12-14-13-11-15-10-15-8-25-10-20-6 4-18z"
      fill="#8C67DE"
    />
    <Path
      transform="translate(1907,619)"
      d="m0 0 16 6 22 11 18 12 11 9 8 7 7 8 8 10 9 15 6 14 4 17v17l-15-1-5-1-2-17-5-15-8-15-11-14-9-9-13-10-18-11-21-10-8-3 1-7z"
      fill="#8C67DE"
    />
    <Path
      transform="translate(2e3 196)"
      d="m0 0h45l1 2-2 19h-40l-18 3-13 5-7 6-3 7v9l4 13 8 14 5 6-2 4-12 10-3-1-10-14-8-17-3-11v-17l4-11 6-8 8-7 15-7 17-4z"
      fill="#F8B16C"
    />
    <Path
      transform="translate(735,335)"
      d="m0 0 4 2 12 9-2 6-4 8-3 12-1 7v18l3 17 6 18 8 17 12 19 8 10-5 5-10 8-3-1-13-18-10-18-8-17-6-19-3-16v-29l4-17 5-12z"
      fill="#8C67DE"
    />
    <Path
      transform="translate(524,250)"
      d="m0 0h16l10 3 9 5 9 8 9 14 7 19 4 22 1 9 1 30-1 15h-13l-7-1-1-37-2-19-5-21-8-16-8-7-10-3-14 1-7-17 1-3z"
      fill="#F8B16C"
    />
    <Path
      transform="translate(1090,44)"
      d="m0 0h25l12 3 12 6 10 9 6 7 7 14 4 14 1 7v35l-2 11-20-3 1-10v-31l-4-16-5-10-6-7-8-5-11-3h-19l-14 3-6-16v-4z"
      fill="#8C67DE"
    />
    <Path
      transform="translate(1173,522)"
      d="m0 0h21l26 4 3 1-1 9-3 11-14-2-19-2-16 1-11 3-10 5-8 9-4 10-2 12 1 22-15 4-5-1-2-12v-19l3-14 4-10 8-11 10-9 12-6 15-4z"
      fill="#8C67DE"
    />
    <Path
      transform="translate(206,450)"
      d="m0 0h8l6 3 4 6v10l-4 6-8 6-10 3h-17l-16 5h-8l-13-4-7 1-7 3-9-1-7-6-1-2v-9l5-8 12-6 5-1h12l12 3 11-2 12-2 13-1z"
      fill="#65BCEB"
    />
    <Path
      transform="translate(410,431)"
      d="m0 0h17l8 3 5 5 3 6-1 7-4 6-6 3h-7l-10-1-16 8h-13l-9-1-12 3h-12l-9-3-6-4-4-8 1-8 6-7 3-1h9l2 1h9l5-1 25-1 12-6z"
      fill="#65BCEB"
    />
    <Path
      transform="translate(1637,726)"
      d="m0 0h5l1 10v11l-24 3-19 5-14 7-5 6-1 3v7l4 10 10 13 5 4-2 5-10 11-4-2-5-4-11-14-6-12-2-7v-16l4-9 6-8 9-7 14-7 18-5z"
      fill="#F9B26C"
    />
    <Path
      transform="translate(656,649)"
      d="m0 0h2l2 16v22l-3 22-5 18-8 17-8 11-9 10-11 8-6 3h-3l-6-16v-3l10-6 9-9 8-13 6-15 3-12 2-18v-15l-1-17 11-2z"
      fill="#8C67DE"
    />
    <Path
      transform="translate(1723,168)"
      d="m0 0 14 7 11 9 8 9 5 10 1 3v15l-4 10-8 11-11 9-15 9-17 8-10 3-7-18 2-2 21-9 15-9 9-8 4-7v-8l-4-7-7-7-13-8-2-1 3-9z"
      fill="#F8B16C"
    />
    <Path
      transform="translate(844,723)"
      d="m0 0h2l10 16 12 13 10 7 9 3h10l11-4 9-7 7-8 3-3 15 10 1 2-7 9-10 10-13 8-9 3-5 1h-14l-13-4-11-6-12-11-10-11-11-17v-2z"
      fill="#8C67DE"
    />
    <Path
      transform="translate(1178,288)"
      d="m0 0h13l20 4 20 8 4 3-9 17-6-2-19-7-11-2h-10l-13 4-5 4-6 10-3 10-2 13h-20v-8l3-16 5-12 7-10 9-8 10-5z"
      fill="#8C67DE"
    />
    <Path
      transform="translate(470,710)"
      d="m0 0h22l10 1v10l-1 10h-30l-13 2-9 3-5 4-2 8 2 9 7 13 3 5-9 8-5 4-4-2-8-13-5-12-2-11 1-10 3-8 9-10 14-7 13-3z"
      fill="#F9B26C"
    />
    <Path
      transform="translate(1734,765)"
      d="m0 0h8l13 3 13 7 11 9 11 12 8 11-1 3-14 9-3-1-9-12-5-6-10-8-11-5-10-1-11 4-9 7-8 11-5-2-13-7 4-8 11-12 11-8 9-4z"
      fill="#8C67DE"
    />
    <Path
      transform="translate(22,366)"
      d="m0 0h7l4 4v31l3 15 7 21 7 16 7 14 10 15 10 13 1 6-4 5-4 1-5-2-12-15-11-18-8-15-10-25-5-18-2-14v-27l3-6z"
      fill="#FFF187"
    />
    <Path
      transform="translate(504,325)"
      d="m0 0 7 1 3 3 1 5 1 14v12l-2 20-5 21-10 25-10 19-8 11-7 8-5 3-5-1-4-5 1-6 8-9 11-18 10-21 6-19 3-16 1-9v-20l-1-12 3-5z"
      fill="#FFF187"
    />
    <Path
      transform="translate(1254,400)"
      d="m0 0 10 1 10 3 1 14 4 12 6 11 11 12 9 8 16 10 6 3-1 5-7 14-6-2-15-9-14-11-11-11-10-14-7-16-3-14v-12z"
      fill="#8C67DE"
    />
    <Path
      transform="translate(715,560)"
      d="m0 0 3 1 9 14-1 3-16 9-14 6-17 5-6 1h-24l-16-4-13-7-3-4 8-8 5-6 5 2 9 4 9 2h16l17-4 12-5 12-6z"
      fill="#8C67DE"
    />
    <Path
      transform="translate(428,548)"
      d="m0 0h2l-2 4-7 9-5 10-1 9 4 8 9 6 15 5 9 2-2 17-1 3-16-3-16-6-10-7-8-9-4-9-1-13 2-5 17-10 14-10z"
      fill="#F9B26C"
    />
    <Path
      transform="translate(53,216)"
      d="m0 0v3l-14 21-9 16-8 17-9 25-6 25-3 21-1 16v11l2 25 5 26 11 33 10 21 12 19 12 16 9 10 7 8 14 13 17 13 14 9 18 10 19 9 33 11 24 5 24 3h45l24-3 24-5 5 1-4 2-23 5-22 3-14 1h-26l-22-2-24-4-26-7-19-7-25-12-14-8-12-8-13-10-13-11-16-16-9-11-11-15-12-20-9-19-9-25-6-26-3-25v-29l3-25 4-18 6-20 6-16 12-25 11-18 7-10z"
      fill="#100C0A"
    />
    <Path
      transform="translate(270,395)"
      d="m0 0h9l10 5 5 7 1 9-3 8-7 6-9 3-9-1-6-3-6-7-1-2v-11l4-7 6-5z"
      fill="#FEE106"
    />
    <Path
      transform="translate(1427,745)"
      d="m0 0 9 3 9 5-8 16-7 11-8 10-9 10-4 3-4-1-6-15 1-4 8-8 9-13z"
      fill="#8D68DC"
    />
    <Path
      transform="translate(347,339)"
      d="m0 0h8l10 5 4 5 2 6-1 9-4 6-5 4-5 2h-8l-7-3-6-5-3-6v-10l5-8 7-4z"
      fill="#F7F6FA"
    />
    <Path
      transform="translate(184,353)"
      d="m0 0h8l7 3 5 5 2 3 1 9-3 8-8 7-6 2-10-1-8-5-3-5-1-10 4-9 5-4z"
      fill="#F9F7F9"
    />
    <Path
      transform="translate(278,474)"
      d="m0 0h26l16 4 12 5 6 4v3l-9-1-19-3h-27l-21 4-20 7-9 4-3-1 2-4 8-7 17-9 16-5z"
    />
    <Path
      transform="translate(574,116)"
      d="m0 0 4 1 5 14 2 4-9 12-9 16-2 4-5-1-14-6 2-6 8-15 10-14z"
      fill="#8C67DD"
    />
    <Path
      transform="translate(177,184)"
      d="m0 0h1v11l-4 16-8 16-6 8-7 8-12 9-15 7-11 3-6 1h-21l-14-3-10-4 4-1 12 2h21l15-3 13-5 11-6 11-9 8-9 7-11 7-15z"
    />
    <Path
      transform="translate(319,174)"
      d="m0 0 2 3 8 15 8 10 6 7 13 10 17 8 11 3 7 1h21l15-3 14-5 3 1-10 6-12 5-12 3-17 1-14-2-15-5-11-6-9-7-10-10-8-13-6-14z"
    />
    <Path
      transform="translate(1745,335)"
      d="m0 0 21 6 10 15 7 10 1 4-6-2-21-8-17-5 4-18z"
      fill="#FEFEFE"
    />
    <Path
      transform="translate(426,594)"
      d="m0 0 10 3 16 4-2 17-1 3-16-3-16-6-6-4 5-5 9-7z"
      fill="#8D67DC"
    />
    <Path
      transform="translate(1942,261)"
      d="m0 0h12l11 1 8 13 4 5-2 4-12 10-3-1-10-14-8-17z"
      fill="#8C67DD"
    />
    <Path
      transform="translate(1357,111)"
      d="m0 0 12 3 7 3-3 11-3 8-7 3-18 11-4 1 2-6 8-18z"
      fill="#FEFEFE"
    />
    <Path
      transform="translate(513,437)"
      d="m0 0 1 3-8 18-11 19-14 20-11 13-11 12-5 6-11 9-12 11-7 4-11 8-19 11-16 8-18 8-24 8h-5l3-3 30-10 29-14 17-10 17-12 11-9 10-9 8-7 14-15 13-17 10-15 9-16 9-19z"
      fill="#090707"
    />
    <Path
      transform="translate(423,755)"
      d="m0 0h12l8 1 8 14 3 5-9 8-5 4-4-2-8-13-5-12z"
      fill="#8C67DD"
    />
    <Path
      transform="translate(1723,168)"
      d="m0 0 14 7 11 9 3 4-11 5-9 4-10-7-6-3 3-9z"
      fill="#8C67DD"
    />
    <Path
      transform="translate(1585,793)"
      d="m0 0 4 2 8 9 2 1-2 5-10 11-4-2-5-4-11-14-2-5z"
      fill="#8C67DE"
    />
    <Path
      transform="translate(1907,619)"
      d="m0 0 14 5 2 6 11 21-2 2-23-11-8-3 1-7z"
      fill="#FEFEFE"
    />
    <Path
      transform="translate(656,649)"
      d="m0 0h2l1 11-9 13-8 12h-2l-1 4v-20l-1-17 11-2z"
      fill="#FEFEFE"
    />
    <Path
      transform="translate(201,116)"
      d="m0 0 2 1-1 2-30 10-20 9-21 11-18 12-16 12-13 12-9 8-7 8-8 9-5 6-3 1 2-4 9-11 12-13 9-9 11-9 15-12 17-11 16-9 25-12 20-7z"
      fill="#0C0807"
    />
    <Path
      transform="translate(757,449)"
      d="m0 0 3 3 10 16 8 10-5 5-10 8-3-1-5-7 2-2 1-28z"
      fill="#FEFEFE"
    />
    <Path
      transform="translate(268,393)"
      d="m0 0h13l8 4 6 7 2 5v9l-4 8-8 7-6 2h-10l-8-3-5-4-4-7-1-10 3-8 9-8zm2 2-9 4-6 7-1 3v11l4 6 6 5 7 2 10-1 8-5 4-5 2-6-1-9-6-8-9-4z"
    />
    <Path
      transform="translate(715,560)"
      d="m0 0 3 1 9 14-1 3-34-5 4-3 14-7z"
      fill="#FEFEFE"
    />
    <Path
      transform="translate(1305,462)"
      d="m0 0 5 2 11 7 6 3-1 5-7 14-4-2-3-9-7-17z"
      fill="#FEFEFE"
    />
    <Path
      transform="translate(503,301)"
      d="m0 0h7l4 5-1 6-5 4-7-1-3-4 1-6z"
      fill="#FFF187"
    />
    <Path
      transform="translate(201,116)"
      d="m0 0 2 1-1 2-30 10-20 9-12 6-2-1 5-4 25-12 20-7z"
      fill="#080604"
    />
    <Path
      transform="translate(279,401)"
      d="m0 0h5l4 5-1 5-4 3-5-1-3-4 1-6z"
      fill="#FFF187"
    />
    <Path
      transform="translate(431,437)"
      d="m0 0 5 1 2 3v10l-5 6-5-1 1-4 3-4-1-6-1-4z"
      fill="#FEFEFE"
    />
    <Path
      transform="translate(123,466)"
      d="m0 0h4l1 3-1 7 5 5v4l-3 1-6-4-2-4v-9z"
      fill="#FEFEFE"
    />
    <Path
      transform="translate(209,452)"
      d="m0 0 6 1 5 4 1 9-1 2-5-1-1-7-6-3v-4z"
      fill="#FEFEFE"
    />
    <Path
      transform="translate(345,441)"
      d="m0 0 4 1-1 5-3 1-1 4v6l-4 1-2-3v-9l5-5z"
      fill="#FEFEFE"
    />
    <Path
      transform="translate(53,216)"
      d="m0 0v3l-14 21-5 8-3 1 2-5 9-15 7-10z"
      fill="#130E0F"
    />
    <Path
      transform="translate(139,141)"
      d="m0 0m-2 1 2 1-4 4-15 9-11 8-2-1 5-5 10-7z"
      fill="#110C0A"
    />
    <Path
      transform="translate(359,584)"
      d="m0 0m-3 1h3v2l-17 6-6 2h-5l3-3z"
      fill="#050405"
    />
    <Path
      transform="translate(32,248)"
      d="m0 0 1 2-9 18-3 1 2-6 7-13z"
      fill="#050302"
    />
    <Path
      transform="translate(520,418)"
      d="m0 0 1 4-6 16-2-1 1-5 5-13z"
      fill="#120D0B"
    />
    <Path
      transform="translate(16,283)"
      d="m0 0 1 3-4 12-3 1 3-11z"
      fill="#0A0709"
    />
    <Path
      transform="translate(139,141)"
      d="m0 0m-2 1 2 1-4 4-7 4-2-1 6-5z"
      fill="#0F0B06"
    />
    <Path
      transform="translate(371,579)"
      d="m0 0m-3 1h3l-1 3-11 4 2-4z"
      fill="#150F0E"
    />
  </Svg>
);

const BadLuckMidSvg = props => (
  <Svg
    width={wp('30%')}
    height={wp('30%')}
    viewBox="0 0 388 384"
    fill="none"
    {...props}>
    <G>
      <Path
        d="M23.2149 175.741L0.884323 217.442C-0.234666 219.531 0.146146 222.107 1.82191 223.784L36.3332 258.309C37.2809 259.257 37.8404 260.525 37.9022 261.864L40.1568 310.734C40.2643 313.063 41.8592 315.057 44.1071 315.674L90.7656 328.472C91.9775 328.805 93.0347 329.551 93.7538 330.582L121.641 370.545C122.964 372.44 125.349 373.278 127.566 372.628L170.797 359.952C172.076 359.577 173.449 359.69 174.649 360.27L218.312 381.357C220.353 382.343 222.793 381.943 224.413 380.358L259.158 346.355C260.039 345.493 261.19 344.959 262.418 344.844L310.619 340.323C312.94 340.106 314.856 338.418 315.366 336.144L325.026 293.025C325.317 291.727 326.078 290.583 327.163 289.814L368.815 260.266C370.654 258.962 371.485 256.648 370.895 254.472L358.915 210.28C358.57 209.005 358.705 207.648 359.295 206.468L380.247 164.546C381.292 162.457 380.868 159.932 379.198 158.297L344.675 124.511C343.722 123.578 343.149 122.324 343.068 120.992L340.061 71.3463C339.917 68.9795 338.241 66.9858 335.934 66.4381L292.03 56.016C290.752 55.7126 289.629 54.9518 288.873 53.8772L260.205 13.1223C258.88 11.2384 256.503 10.4073 254.292 11.0554L211.129 23.7118C209.801 24.1013 208.373 23.9636 207.144 23.3274L163.624 0.808258C161.543 -0.268572 159.005 0.125624 157.348 1.7828L121.105 38.0404C120.16 38.986 118.897 39.5457 117.561 39.6103L71.3885 41.8454C68.9882 41.9616 66.9561 43.6559 66.4103 45.9963L55.9911 90.668C55.6891 91.9627 54.9184 93.0997 53.8276 93.8596L11.5791 123.295C9.62266 124.658 8.79712 127.146 9.55088 129.408L23.5761 171.501C24.0435 172.904 23.9129 174.437 23.2149 175.741Z"
        fill="url(#paint0_linear_2405_1110)"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_2405_1110"
        x1={190.5}
        y1={-1}
        x2={190.5}
        y2={383}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F9A738" />
        <Stop offset={1} stopColor="#FEE35D" />
      </LinearGradient>
    </Defs>
    {props.children}
  </Svg>
);

export {
  SpinFortune,
  SpinCard,
  SpinCongrats,
  SpinDiscount,
  SpinButton,
  BarcodeTopSvg,
  BadLuckSvg,
  BadLuckMidSvg,
};
