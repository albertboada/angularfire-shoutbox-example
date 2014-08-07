/**
 * @Datasource
 */
APP.factory(
"firebaseDataSource", function (appSettings) {
    var firebase_url = appSettings.firebase.app_name+".firebaseIO.com";
    return new Firebase(firebase_url);
});