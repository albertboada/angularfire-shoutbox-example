/**
 * @DAO
 */
APP.factory(
"shoutsDao", function (firebaseDataSource, $firebase) {
    return new $firebase(firebaseDataSource.child("shouts"));
});