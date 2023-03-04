import * as React from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
import {useTheme} from '@ui-kitten/components';

const Content = ({
  style,
  contentContainerStyle,
  children,
  isPadding,
  level,
  ...props
}) => {
  const theme = useTheme();
  return (
    <ScrollView
      {...props}
      style={[
        {backgroundColor: level && theme[`background-basic-color-${level}`]},
        style,
      ]}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        contentContainerStyle,
        isPadding && {paddingHorizontal: 24},
      ]}>
      {children}
    </ScrollView>
  );
};

export default Content;
