# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# react-native-paper and react-native views
-keep class com.facebook.react.views.view.** { *; }
-keep class com.facebook.react.views.text.** { *; }
-keep class com.facebook.react.views.image.** { *; }
-keep class com.facebook.react.views.** { *; }

# vector icons and font assets preservation
-keep class **.R$** { *; }
-keep class com.tonyodev.fetch2.** { *; }
-keepattributes *Annotation*
-dontwarn com.facebook.react.**
-dontwarn com.swmansion.reanimated.**
-dontwarn com.brentvatne.react.**
-dontwarn com.oblador.vectoricons.**
-keep class com.oblador.vectoricons.** { *; }
-keep class com.horcrux.svg.** { *; }

# expo-font and font loading
-keep class expo.modules.font.** { *; }
-keep class expo.modules.font.enums.** { *; }
-keep class expo.font.** { *; }
-keep class host.exp.exponent.font.** { *; }
-keep class host.exp.exponent.modules.api.** { *; }

# Keep all font files and font-related classes
-keep class * extends android.graphics.Typeface
-keepclassmembers class * extends android.graphics.Typeface {
    public static <fields>;
}
-keepattributes *Font*

# React Native font asset handling
-keepclassmembers class * {
    public static final ** font;
}
-keep class **.R$** { *; }
-keep class com.tonyodev.fetch2.** { *; }
-keepattributes *Annotation*
-dontwarn com.facebook.react.**
-dontwarn com.swmansion.reanimated.**
-dontwarn com.brentvatne.react.**
-dontwarn com.oblador.vectoricons.**
-keep class com.oblador.vectoricons.** { *; }
-keep class com.horcrux.svg.** { *; }
