# Dependencies

1. An Ionic project
2. iOS and Android platforms added to your project
3. Crosswalk plugin added to your project 

# Installation

1. Copy the contents from the `gulp-commands.js` file provided in this repo into your project's `gulpfile.js`.
2. Install the required npm modules from the root of your project.

		$ npm install --save-dev gulp run-sequence shelljs async
	
3. Require the modules at the top of your `gulpfile.js`.

		var gulp = require('gulp');
		var sh = require('shelljs');
		var async = require('async');
		var path = require('path')
		var spawn = require('child_process').spawn;
		var runSequence = require('run-sequence');

# Getting Started

These gulp commands make it very simple to build release candidates for your iOS and Android versions of your Ionic app. 

1. Create a `keystore` file. 
	* The `keytool` command is required for this step.
	* Replace `YOUR_APP.keystore` with something like `my-cool-app.keystore` and `YOUR_ALIAS` with something like `MY_COOL_ALIAS`. 

			$ cd ~/path/to/your/ionic/app
			$ keytool -genkey -v -keystore YOUR_APP.keystore -alias YOUR_ALIAS -keyalg RSA -keysize 2048 -validity 10000

	* This process will require a password. **Make sure you remember this password.** 
	* After following the prompts, this will generate a `YOUR_APP.keystore` file at the root of your Ionic app's directory that we'll use later.

2. Open your `gulpfile.js` file.
3. Replace `YOUR_APP.keystore` with the name of your `.keystore` file and `YOUR_ALIAS` with the alias name you used previously. 
3. Replace `YOUR_PASSWORD` with the password you used to create your `.keystore` file.

# Usage

To use these gulp commands, `zipalign` and `jarsigner` must be available from the command line. If they are not, search the web to install them on your machine.

## iOS

	$ gulp ios-release
	
After the command is finished, you'll need to open Xcode to finish the release process.

## Android
	
	$ gulp android-release
	
After the command is finished, an `android-arm7-release-signed.apk` and `android-x86-release-signed.apk` will have been built. Use these two files to upload your Android app to Google Play. They can be found at `./platforms/android/build/outputs/apk`. To upload both apks to Google Play you'll need to switch to Advanced Mode via their web interface.

## Summary

These gulp commands make it so you don't have to manually run the commands found [here](http://ionicframework.com/docs/guide/publishing.html) everytime you want to publish your Android app. A HUGE TIME SAVER.

Also included in `gulp-commands.js` is `$ gulp iossim` and `$ gulp androidsim`. Two other commands that I use to emulate my app.

I hope this helps you Ionicites with your build process! If you have any questions feel free to email me at <mailto:me@seanhill.info>.



