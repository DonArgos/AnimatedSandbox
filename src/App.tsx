import React, {useCallback} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

export function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const scroll = useSharedValue(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onScroll = useCallback(
    ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) =>
      (scroll.value = nativeEvent.contentOffset.y),
    [scroll],
  );

  const imageStyle = useAnimatedStyle(() => ({
    top: interpolate(scroll.value, [0, 5], [-65, -66]),
  }));

  const smallGearStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(scroll.value, [0, -360], [0, 170])}deg`,
      },
    ],
  }));

  const largeGearStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(scroll.value, [0, -360], [1, -126])}deg`,
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.leftContainer}>
        <SafeAreaView>
          <Animated.Image
            source={require('./assets/gear-large.png')}
            style={[styles.largeGear, largeGearStyle]}
          />
          <Animated.Image
            source={require('./assets/gear-small.png')}
            style={[styles.smallGear, smallGearStyle]}
          />
        </SafeAreaView>
        <Animated.Image
          resizeMode="repeat"
          source={require('./assets/dent.png')}
          style={[styles.dent, imageStyle]}
        />
      </View>
      <SafeAreaView style={[backgroundStyle, styles.shadow]}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={onScroll}
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Step One">
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="See Your Changes">
              <ReloadInstructions />
            </Section>
            <Section title="Debug">
              <DebugInstructions />
            </Section>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  dent: {
    height: Dimensions.get('window').height * 2,
    position: 'absolute',
    right: 0,
  },
  leftContainer: {
    flexDirection: 'row',
    zIndex: 1,
  },
  largeGear: {
    marginLeft: -15,
  },
  smallGear: {
    marginLeft: 30,
    marginTop: -18,
    marginEnd: 10,
  },
});
