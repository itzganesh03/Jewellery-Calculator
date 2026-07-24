import { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

interface SplashScreenProps { onDone: () => void; }

const GOLD = '#D8AB5F';
const GOLD_LIGHT = '#F2D29B';
const IVORY = '#F3E6D6';
const BG_DEEP = '#3A0D1C';
const BG_MID = '#5C1830';
const VIGNETTE = '#20060F';
const ARCH_WIDTH = Math.min(Dimensions.get('window').width - 40, 340);
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SPARKLES = [
  [8, 9, 3, 400], [89, 11, 2, 1200], [13, 24, 4, 2000], [81, 27, 2, 700], [5, 42, 3, 1600], [94, 45, 4, 100],
  [16, 58, 2, 2300], [86, 62, 3, 500], [7, 76, 4, 1900], [92, 83, 2, 900], [27, 88, 2, 1400], [74, 91, 3, 300],
] as const;

function LoaderDot({ delay }: { delay: number }) {
  const pulse = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 550, delay, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0.3, duration: 550, useNativeDriver: true }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [delay, pulse]);
  return <Animated.View style={[styles.dot, { opacity: pulse, transform: [{ scale: pulse }] }]} />;
}

function Sparkle({ item }: { item: typeof SPARKLES[number] }) {
  const [left, top, size, delay] = item;
  const twinkle = useRef(new Animated.Value(0.15)).current;
  useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(twinkle, { toValue: 0.95, duration: 1300, delay, useNativeDriver: true }),
      Animated.timing(twinkle, { toValue: 0.15, duration: 1300, useNativeDriver: true }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [delay, twinkle]);
  return <Animated.View style={[styles.sparkle, { left: `${left}%`, top: `${top}%`, width: size, height: size, borderRadius: size, opacity: twinkle, transform: [{ scale: twinkle }] }]} />;
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  const background = useRef(new Animated.Value(0)).current;
  const archOpacity = useRef(new Animated.Value(0)).current;
  const guOpacity = useRef(new Animated.Value(0)).current;
  const guTranslate = useRef(new Animated.Value(14)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const contactOpacity = useRef(new Animated.Value(0)).current;
  const contactTranslate = useRef(new Animated.Value(8)).current;
  const loaderOpacity = useRef(new Animated.Value(0)).current;
  const sparkles = useMemo(() => SPARKLES, []);

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(background, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(archOpacity, { toValue: 1, duration: 1600, delay: 200, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(guOpacity, { toValue: 1, duration: 900, delay: 700, useNativeDriver: true }),
        Animated.timing(guTranslate, { toValue: 0, duration: 900, delay: 700, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 750, delay: 1250, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, delay: 1250, friction: 5, tension: 60, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(contactOpacity, { toValue: 1, duration: 700, delay: 2000, useNativeDriver: true }),
        Animated.timing(contactTranslate, { toValue: 0, duration: 700, delay: 2000, useNativeDriver: true }),
      ]),
      Animated.timing(loaderOpacity, { toValue: 1, duration: 500, delay: 2500, useNativeDriver: true }),
    ]);
    animation.start();
    const finishTimer = setTimeout(onDone, 3500);
    return () => { animation.stop(); clearTimeout(finishTimer); };
  }, [archOpacity, background, contactOpacity, contactTranslate, guOpacity, guTranslate, loaderOpacity, logoOpacity, logoScale, onDone]);

  return <Animated.View style={[styles.container, { opacity: background }]}>
    <StatusBar style="light" />
    <LinearGradient colors={[BG_MID, BG_DEEP, VIGNETTE]} locations={[0, 0.55, 1]} style={StyleSheet.absoluteFill} />
    <View style={styles.centerGlow} />
    {sparkles.map((item, index) => <Sparkle item={item} key={index} />)}

    <Animated.View style={[styles.arch, { opacity: archOpacity }]}>
      <Svg width={ARCH_WIDTH} height={SCREEN_HEIGHT} viewBox="0 0 340 600" preserveAspectRatio="none"><Path d="M20,600 L20,220 Q20,40 170,40 Q320,40 320,220 L320,600" fill="none" stroke={GOLD} strokeWidth={1.2} opacity={0.45} /></Svg>
    </Animated.View>

    <Animated.View style={[styles.guTitleWrap, { opacity: guOpacity, transform: [{ translateY: guTranslate }] }]}><Text style={styles.guTitle}>શ્રદ્ધા જવેલર્સ</Text></Animated.View>

    <Animated.View style={[styles.lockup, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
      <View style={styles.monogram}><Text style={styles.monogramText}>S</Text></View>
      <Text style={styles.wordmark}>Shraddha</Text>
      <Text style={styles.subword}>Jewellers</Text>
      <Text style={styles.tagline}>THE BOND OF TRUST SINCE-1992</Text>
    </Animated.View>

    <Animated.View style={[styles.contact, { opacity: contactOpacity, transform: [{ translateY: contactTranslate }] }]}>
      <Text style={styles.phoneNo}>+91 9409495724</Text>
      <Text style={styles.addr}>Hinglachachar Chowk, Patan (N.G.)</Text>
    </Animated.View>

    <Animated.View style={[styles.loader, { opacity: loaderOpacity }]}><LoaderDot delay={0} /><LoaderDot delay={150} /><LoaderDot delay={300} /></Animated.View>
  </Animated.View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden', backgroundColor: BG_DEEP },
  centerGlow: { position: 'absolute', top: -130, left: '50%', marginLeft: -240, width: 480, height: 480, borderRadius: 240, backgroundColor: '#7A3049', opacity: 0.36 },
  arch: { position: 'absolute', top: '6%', left: '50%', marginLeft: -ARCH_WIDTH / 2, width: ARCH_WIDTH, height: SCREEN_HEIGHT },
  sparkle: { position: 'absolute', backgroundColor: GOLD_LIGHT, shadowColor: GOLD_LIGHT, shadowOpacity: 0.9, shadowRadius: 7, elevation: 5 },
  guTitleWrap: { position: 'absolute', top: '17%', left: 0, right: 0 },
  guTitle: { color: IVORY, fontSize: 34, fontWeight: '700', letterSpacing: 1, textAlign: 'center', textShadowColor: 'rgba(216,171,95,0.28)', textShadowRadius: 8 },
  lockup: { position: 'absolute', top: '47%', left: 0, right: 0, alignItems: 'center' },
  monogram: { width: 76, height: 76, marginBottom: 6, borderWidth: 2, borderColor: GOLD, borderRadius: 38, alignItems: 'center', justifyContent: 'center', shadowColor: GOLD, shadowOpacity: 0.5, shadowRadius: 12, shadowOffset: { width: 0, height: 0 }, elevation: 8 },
  monogramText: { color: GOLD_LIGHT, fontFamily: 'Georgia', fontSize: 40, fontStyle: 'italic', fontWeight: '600' },
  wordmark: { color: '#FFFFFF', fontFamily: 'Georgia', fontSize: 34, fontStyle: 'italic', fontWeight: '600', letterSpacing: 0.5, lineHeight: 40 },
  subword: { color: GOLD_LIGHT, fontSize: 14, letterSpacing: 0.5, marginTop: -2 },
  tagline: { color: IVORY, fontSize: 10, letterSpacing: 1.5, marginTop: 6, opacity: 0.85, textDecorationLine: 'underline', textDecorationStyle: 'solid' },
  contact: { position: 'absolute', top: '63%', left: 0, right: 0, alignItems: 'center' },
  phoneNo: { color: '#FFFFFF', fontSize: 15, fontWeight: '500', letterSpacing: 0.5 },
  addr: { color: GOLD_LIGHT, fontSize: 13, fontWeight: '600', letterSpacing: 0.3, marginTop: 6 },
  loader: { position: 'absolute', bottom: '8%', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: GOLD },
});
