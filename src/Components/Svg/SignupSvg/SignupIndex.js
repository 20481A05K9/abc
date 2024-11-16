import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

function SignupIndex(props) {
  return (
    <Svg viewBox="0 0 1576 980" width={wp('101%')} height={wp('100%')}>
      <Path
        d="M0 0h1569l1 30 1 110 2 95 1 78 1 108 1 26v236l-4 46-4 26-6 29-9 29-9 22-11 20-9 13-7 9-2 3h-2l-2 4-14 14-17 13-21 12-19 8-20 6-27 5-31 3h-28l-42-4-37-6-40-9-44-12-41-13-43-15-39-15-37-15-33-14-32-14-27-12-33-15-35-16-41-19-60-28-39-18-40-18-42-18-32-13-34-13-36-12-25-7-23-5-22-3h-24l-16 3-14 6-12 9-12 11-12 12-9 11-11 13-9 12-14 18-10 13-9 11-13 15-25 25-14 11-14 10-21 12-17 8-20 7-21 6-27 5-25 3H89l-17-3-16-6-12-7-13-12-8-10-7-11-8-19-6-19-2-7z"
        fill="#FCA83C"
      />
    </Svg>
  );
}
export default SignupIndex;
