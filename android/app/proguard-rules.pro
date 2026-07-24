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

# react-native-paper
-keep class com.facebook.react.views.view.** { *; }
-keep class com.facebook.react.views.text.** { *; }
-keep class com.facebook.react.views.image.** { *; }

# vector icons and font assets
-keep class **.R$** { *; }
-keep class com.tonyodev.fetch2.** { *; }
-keepattributes *Annotation*
-dontwarn com.facebook.react.**
-dontwarn com.swmansion.reanimated.**
-dontwarn com.brentvatne.react.**
-dontwarn com.oblador.vectoricons.**
-keep class com.oblador.vectoricons.** { *; }

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Add any project specific keep options here:
