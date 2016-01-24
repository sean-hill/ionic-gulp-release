/* --------------------------------
  iOS and Android simulator tasks
-------------------------------- */

gulp.task('iossim', function(callback){
  sh.exec('ionic build ios', function(){
    sh.exec('ionic emulate ios', callback);
  });
});

gulp.task('androidsim', function(callback){
  sh.exec('ionic run android', callback);
});


/* ------------------
  iOS release tasks
------------------ */

gulp.task('ionic-release-ios', function(callback){
  sh.exec('ionic build --release ios', callback)
});

gulp.task('ios-release', function(callback){
  runSequence('ionic-release-ios', callback);
});


/* ----------------------
  Android release tasks
---------------------- */

// Run cordova build command
gulp.task('ionic-release-android', function(callback){
  sh.exec('ionic build --release android ', callback)
});

// Jarsign APK file
function jarsign(filename, finished) {

  var pathToApk = path.resolve(__dirname, './platforms/android/build/outputs/apk/' + filename + '-unsigned.apk');

  var args = ['-verbose', '-sigalg', 'SHA1withRSA', '-digestalg', 'SHA1', '-keystore', 'YOUR_APP.keystore', pathToApk, 'YOUR_ALIAS'];

  var child = spawn('jarsigner', args);

  child.stdin.setEncoding = 'utf-8';
  child.stdout.pipe(process.stdout);

  child.stdin.write('YOUR_PASSWORD\n');

  child.on('close', function(){
    return finished();
  });

};

// Jarsign Android Task
gulp.task('jarsign-android', function(callback){

  async.series({
    armv7: function(done) {
      jarsign('android-armv7-release', done);
    },
    x86: function(done) {
      jarsign('android-x86-release', done);
    }
  }, function(err, results){
    return callback();
  });

});

// Zipalign APK file
function zipalign(filename, finished) {

  var pathToApk = path.resolve(__dirname, './platforms/android/build/outputs/apk/' + filename + '-unsigned.apk');
  var signedApk = path.resolve(__dirname, './platforms/android/build/outputs/apk/' + filename + '-signed.apk');

  var args = ['-f', '-v', '4', pathToApk, signedApk];

  var child = spawn('zipalign', args, { stdio: 'inherit' });

  child.on('close', function(){
    return finished(null, signedApk);
  });

};

// Zipalign Gulp Task
gulp.task('zipalign-android', function(callback){

  async.series({
    armv7: function(done) {
      zipalign('android-armv7-release', done);
    },
    x86: function(done) {
      zipalign('android-x86-release', done);
    }
  }, function(err, results){
    console.log('\nREADY FOR RELEASE!!!');
    console.log('Submit', results.armv7, 'to the Google Play Store.');
    console.log('Submit', results.x86, 'to the Google Play Store.\n');
    return callback();
  });

});

// Run all android build tasks
gulp.task('android-release', function(callback){
  runSequence('ionic-release-android', 'jarsign-android', 'zipalign-android', callback);
});