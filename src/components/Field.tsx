import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { StyleProp, View, ViewStyle } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

export function NumberField<T extends FieldValues>({
  control,
  name,
  label,
  suffix,
  onSuffixPress,
  style,
  containerStyle,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
  suffix?: string;
  onSuffixPress?: () => void;
  style?: object;
  containerStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={containerStyle}>
      <Controller
        control={control}
        name={name}
        rules={{
          required: name === 'weight' ? 'Weight is required' : false,
          min: { value: 0, message: 'Cannot be negative' },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              label={label}
              value={value}
              onChangeText={onChange}
              keyboardType="decimal-pad"
              mode="outlined"
              dense
              error={!!error}
              style={style}
              right={
                suffix ? (
                  <TextInput.Affix
                    text={suffix}
                    onPress={onSuffixPress}
                  />
                ) : undefined
              }
            />
            {error && (
              <HelperText type="error" visible>
                {error.message}
              </HelperText>
            )}
          </>
        )}
      />
    </View>
  );
}
