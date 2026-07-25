# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# React Native's bridge dispatches @ReactMethod calls by reflection, so any native
# module without an explicit keep rule can get its methods stripped/renamed by R8
# and silently fail (or throw) only in minified release builds. Keep native modules
# and their annotated members generically instead of allow-listing packages one by one.
-keep,allowobfuscation @interface com.facebook.react.bridge.ReactModule
-keep,allowobfuscation @interface com.facebook.react.uimanager.annotations.ReactProp
-keep,allowobfuscation @interface com.facebook.react.uimanager.annotations.ReactPropGroup
-keep class * extends com.facebook.react.bridge.NativeModule { *; }
-keepclassmembers,includedescriptorclasses class * { native <methods>; }
-keepclassmembers class * { @com.facebook.react.bridge.ReactMethod <methods>; }
-keepclassmembers class * { @com.facebook.react.uimanager.annotations.ReactProp <methods>; }
-keepclassmembers class * { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }

# react-native-view-shot (share as image)
-keep class fr.greweb.reactnativeviewshot.** { *; }
-dontwarn fr.greweb.reactnativeviewshot.**

# async-storage (settings, rates, history persistence)
-keep class com.reactnativecommunity.asyncstorage.** { *; }
-dontwarn com.reactnativecommunity.asyncstorage.**

# expo modules (sharing, print, asset, font)
-keep class expo.modules.** { *; }
-dontwarn expo.modules.**

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
