import { PropsWithChildren, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';
export function AnimatedButton({ children, style, ...props }: PropsWithChildren<ButtonProps>) {
	const scale = useRef(new Animated.Value(1)).current;
	const pressIn = () => Animated.spring(scale, { toValue: .97, useNativeDriver: true }).start();
	const pressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
	return <Animated.View style={[styles.wrap, style, { transform: [{ scale }] }]}><Button {...props} onPressIn={pressIn} onPressOut={pressOut} style={styles.button}>{children}</Button></Animated.View>;
}
const styles = StyleSheet.create({ wrap: { overflow: 'hidden', borderRadius: 28 }, button: { width: '100%' } });
