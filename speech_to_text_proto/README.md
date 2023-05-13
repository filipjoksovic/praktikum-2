# React Native Speech-to-Text implementation

Speech listener prototype which converts heard sound into text output, made possible by 
React native and **@react-community/voice** package

This prototype is NOT to be used in further development, but is rather a proof of concept for a potential solution of the problem.

## Environment setup:

For setting up the environment, Android Studio is needed, since we are running an Android application.
Download link: https://developer.android.com/studio

Also, Java Home system variable should be set up in Path variables so the application can compile.
Java version 17 works best in combination with Gradle version 7.3.1. If using Android Studio, 
the Android app can be compiled one time by opening **./android** folder of the project.

For actually running the application, it can be either run in Android emulator Android Studio provides, or on native devices using adb.

ADB docs: https://developer.android.com/tools/adb


### Install dependencies: npm install

### Run application: npx react-native start (choose Android)