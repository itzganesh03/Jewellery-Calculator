import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

export function CalculatorIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="3" width="16" height="18" rx="3" stroke={color} strokeWidth={strokeWidth} />
      <Line x1="8" y1="7" x2="16" y2="7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Rect x="7" y="10" width="3" height="3" rx="0.75" fill={color} />
      <Rect x="11" y="10" width="3" height="3" rx="0.75" fill={color} />
      <Rect x="15" y="10" width="2" height="3" rx="0.75" fill={color} />
      <Rect x="7" y="14" width="3" height="3" rx="0.75" fill={color} />
      <Rect x="11" y="14" width="3" height="3" rx="0.75" fill={color} />
      <Rect x="15" y="14" width="2" height="3" rx="0.75" fill={color} />
    </Svg>
  );
}

export function HistoryIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth={strokeWidth} />
      <Line x1="12" y1="8" x2="12" y2="12.2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Line x1="12" y1="12" x2="15" y2="14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M8 4.5V2.8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M16 4.5V2.8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function SettingsIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="3.2" stroke={color} strokeWidth={strokeWidth} />
      <Path
        d="M12 4.4V2.8M12 21.2v-1.6M4.4 12H2.8M21.2 12h-1.6M17.3 6.7l1.1-1.1M5.6 18.4l1.1-1.1M17.3 17.3l1.1 1.1M5.6 5.6l1.1 1.1"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Path
        d="M9.2 5.2c.8-.4 1.8-.7 2.8-.7s2 .2 2.8.7l1.2-1.2 1.4 1.4-1.2 1.2c.4.8.7 1.8.7 2.8s-.2 2-.7 2.8l1.2 1.2-1.4 1.4-1.2-1.2c-.8.4-1.8.7-2.8.7s-2-.2-2.8-.7l-1.2 1.2-1.4-1.4 1.2-1.2c-.4-.8-.7-1.8-.7-2.8s.2-2 .7-2.8L6.6 5.4 8 4z"
        stroke={color}
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.75}
      />
    </Svg>
  );
}

export function DiamondIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6.2 5h11.6l3.2 4.6L12 20 2.9 9.6 6.2 5Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Path d="M6.2 5l2.9 4.6L12 20l2.9-10.4L17.8 5" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Line x1="4.1" y1="9.6" x2="19.9" y2="9.6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Line x1="9.1" y1="5" x2="12" y2="9.6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Line x1="14.9" y1="5" x2="12" y2="9.6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function GoldIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3.5 18.5h17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M5 18.5 8.8 6.7h6.4L19 18.5" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Path d="M8 10h8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M9.5 6.7 12 3.8l2.5 2.9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10.2 10.5 12 18.2l1.8-7.7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function SilverIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="7" width="16" height="10" rx="1.5" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Path d="M8 7V5.5a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 16 5.5V7" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Line x1="8" y1="11" x2="16" y2="11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Line x1="8" y1="14" x2="16" y2="14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function CircleOutlineIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="7.5" stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
}

export function PencilIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 19h3l9.8-9.8a1.7 1.7 0 0 0 0-2.4l-1.6-1.6a1.7 1.7 0 0 0-2.4 0L4 15v4Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Path d="M13.4 6.6 17.4 10.6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function CloseIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 6l12 12M18 6 6 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function DeleteOutlineIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5.5 7h13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M9 7V5.4c0-.5.4-.9.9-.9h4.2c.5 0 .9.4.9.9V7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8.2 7.2 8.9 19c0 .6.5 1 1.1 1h3.9c.6 0 1.1-.4 1.1-1l.7-11.8" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </Svg>
  );
}

export function DeleteSweepIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 7h12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M10 7V5.4c0-.5.4-.9.9-.9h2.2c.5 0 .9.4.9.9V7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M11.2 9.2 11.8 18.8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M14.2 9.2 13.6 18.8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M6 10.5c0-.8.6-1.5 1.5-1.5h4.8c.6 0 1 .4 1.1 1l.7 9.6c.1.6-.4 1.1-1 1.1H9.1c-.7 0-1.3-.5-1.4-1.2L6 10.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </Svg>
  );
}

export function FilePdfIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M7 3.8h6l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.8a1 1 0 0 1 1-1Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Path d="M13 3.8V8h4" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Path d="M8.2 16.4V12.2H10c.8 0 1.4.5 1.4 1.2s-.6 1.2-1.4 1.2H8.2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12.4 16.4v-4.2h1.3c1.3 0 2.2.8 2.2 2.1s-.9 2.1-2.2 2.1h-1.3Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Path d="M17.3 16.4v-4.2h2.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ThemeLightDarkIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 4.5a7.5 7.5 0 1 0 0 15c-2.1 0-3.8-1.7-3.8-3.8S9.9 12 12 12s3.8-1.7 3.8-3.8S14.1 4.5 12 4.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Circle cx="15.7" cy="8.6" r="0.9" fill={color} />
      <Circle cx="17.8" cy="11.4" r="0.7" fill={color} />
    </Svg>
  );
}

export function CurrencyInrIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 6h12M6 9h12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M6 6c3.5 0 6 1.4 7.2 3.6H6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 9c3.5 0 6 1.4 7.2 3.6H6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10 12.6 16.2 19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M6 12h12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function InfoOutlineIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M12 10.3v6.2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Circle cx="12" cy="7.8" r="0.8" fill={color} />
    </Svg>
  );
}

export function ShieldCheckOutlineIcon({ size = 24, color = '#000' }: IconProps) {
  const strokeWidth = size / 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 3.8 18.2 6v5.1c0 4.1-2.7 7.8-6.2 9.3-3.5-1.5-6.2-5.2-6.2-9.3V6L12 3.8Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Path d="m9.2 12 2.1 2.1 3.7-4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CheckboxIcon({ checked, size = 24, color = '#000' }: IconProps & { checked: boolean }) {
  const strokeWidth = size / 11;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4"
        fill={checked ? color : 'none'}
        stroke={color}
        strokeWidth={strokeWidth}
      />
      {checked ? <Path d="M7.2 12.1 10.3 15.2 16.8 8.7" stroke="#fff" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" /> : null}
    </Svg>
  );
}