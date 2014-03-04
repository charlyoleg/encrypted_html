/* admin_input.js
edit this file to:
- add/remove/change user login
- change salt
- change html content to be encrypted
*/

// define the user login
exports.username = ["jim", "jack"];
exports.password = ["jim", "jack"];

// salt
exports.password_hash_salt = "bleblesalt";
exports.login_hash_salt = "bliblisalt";
exports.key_hash_salt = "blablasalt";

// html to encrypt
// the content differ between users as they may get links to different locations
var index_jim = "hi jim<br><a href=\"hidden/a5368xjlspsawjx61xhaux5/index.html\">hidden page</a><br><a href=\"next.html\">encrypted page</a>";
var index_jack = "hi jack<br><a href=\"hidden/h6yz6d4lsg7knctyre96yo6/index.html\">hidden page</a><br><a href=\"next.html\">encrypted page</a>";
var next_jim = "Hi Jim! This is an new encrypte page.";
var next_jack = "Hi jack! This is an new encrypte page. You might see something different from jack.<br><a href=\"hidden/h6yz6d4lsg7knctyre96yo6/index.html\">one linke</a>";

exports.page_name = ["index", "next"];
exports.page_content = [index_jim, index_jack, next_jim, next_jack];

