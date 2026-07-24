import { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { Card } from 'react-native-paper';
export function FadeInCard({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) { const opacity = useRef(new Animated.Value(0)).current; const translate = useRef(new Animated.Value(10)).current; useEffect(() => { Animated.parallel([Animated.timing(opacity, { toValue: 1, duration: 360, useNativeDriver: true }), Animated.timing(translate, { toValue: 0, duration: 360, useNativeDriver: true })]).start(); }, [opacity, translate]); return <Animated.View style={{ opacity, transform: [{ translateY: translate }] }}><Card mode="elevated" style={style}>{children}</Card></Animated.View>; }
