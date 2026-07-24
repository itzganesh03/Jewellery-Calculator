import { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Image, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface SplashScreenProps { onDone: () => void; }

const BG = '#f3e9d4';
const SPARKLE_COUNT = 45;

function Sparkle({ left, top, size, duration, delay }: { left: number; top: number; size: number; duration: number; delay: number }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: duration / 2, delay, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: duration / 2, delay, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: duration / 2, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 0.3, duration: duration / 2, useNativeDriver: true }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [delay, duration, opacity, scale]);

  return (
    <Animated.View
      style={[
        styles.sparkle,
        {
          left: `${left}%`,
          top: `${top}%`,
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity,
          transform: [{ scale }],
        },
      ]}
    />
  );
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
    const timer = setTimeout(onDone, 3500);
    return () => clearTimeout(timer);
  }, [fadeAnim, onDone]);

  const sparkles = useMemo(() => {
    const items: { left: number; top: number; size: number; duration: number; delay: number }[] = [];
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      items.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 3 + Math.random() * 6,
        duration: 1600 + Math.random() * 2400,
        delay: Math.random() * 3000,
      });
    }
    return items;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Animated.Image
        source={require('../../assets/splash_art.jpg')}
        style={[styles.art, { opacity: fadeAnim }]}
        resizeMode="cover"
      />
      {sparkles.map((item, index) => (
        <Sparkle key={index} {...item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    overflow: 'hidden',
  },
  art: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  sparkle: {
    position: 'absolute',
    backgroundColor: '#fff8dc',
    shadowColor: '#ffd77a',
    shadowOpacity: 0.9,
    shadowRadius: 7,
    elevation: 5,
  },
});
