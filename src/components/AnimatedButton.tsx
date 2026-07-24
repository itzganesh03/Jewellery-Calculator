import { PropsWithChildren, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';
export function AnimatedButton({ children, ...props }: PropsWithChildren<ButtonProps>) { const scale = useRef(new Animated.Value(1)).current; const pressIn = () => Animated.spring(scale, { toValue: .97, useNativeDriver: true }).start(); const pressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start(); return <Animated.View style={[styles.wrap, { transform: [{ scale }] }]}><Button {...props} onPressIn={pressIn} onPressOut={pressOut}>{children}</Button></Animated.View>; }
const styles = StyleSheet.create({ wrap: { overflow: 'hidden', borderRadius: 28 } });
