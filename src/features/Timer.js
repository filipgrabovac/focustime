import { useState } from 'react';
import { View, Text, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Countdown } from '../components/CountdownComponent';
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

const PATTERN = [1 * 1000, 1 * 1000, 1 * 1000, 1 * 1000, 1 * 1000];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject)
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          onProgress={setProgress}
          isPaused={!isStarted}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>

      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          color={colors.progressBar}
          style={{ height: 10 }}
          progress={progress}
        />
      </View>

      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>

      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title={'pause'}
            onPress={() => {
              setIsStarted(false);
            }}
          />
        ) : (
          <RoundedButton
            title={'start'}
            onPress={() => {
              setIsStarted(true);
            }}
          />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={70} title={'-'} onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: spacing.xxl,
  },
  clearSubjectWrapper: {
    alignItems: 'center',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
};
