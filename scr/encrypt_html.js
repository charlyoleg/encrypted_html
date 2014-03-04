/*
encrypt_html.js
This script is used to generated the encrypted html. 
This script must be executed on your laptop with node.js. It should never been uploaded to your server.
*/


// import the js library
var CryptoJS = require("crypto-js"); // need node.js --version newer then v0.8
var admin_input = require('./admin_input'); //include admin_input.js
//console.log(admin_input.username[0]);

// 
if (admin_input.username.length !== admin_input.password.length) {
    console.log("ERR015: Error, the number of usernames " + admin_input.username.length + " is different from the number of passwords " + admin_input.password.length);
    process.exit(2);
}
if (admin_input.username.length < 1) {
    console.log("ERR019: Error, the number of username "  + admin_input.username.length + " is smaller than one!");
    process.exit(2);
}
console.log("Update in src/js/decrypt_html.js");
var user_id_str = "var user_ids = [";
var user_keys = new Array(admin_input.username.length);
//console.log("user IDs:");
for (var i = 0; i<admin_input.username.length; i++) {
    var password_hash = CryptoJS.SHA256(admin_input.password_hash_salt + admin_input.password[i]).toString(CryptoJS.enc.Hex); // does this hash increase the security? is it overkill?
    var login_hash = CryptoJS.SHA256(admin_input.login_hash_salt + admin_input.username[i] + password_hash.substring(0,20)).toString(CryptoJS.enc.Hex);
    var key_hash = CryptoJS.SHA256(admin_input.key_hash_salt + admin_input.username[i] + admin_input.password[i]).toString(CryptoJS.enc.Hex);
    var user_id = login_hash.substring(0,10);
    var user_key = key_hash.substring(11,25);
    //console.log(i + " : username: " + admin_input.username[i] + "   user_id: " + user_id);
    if(i>0){
        user_id_str += ", ";
    }
    user_id_str += "\"" + user_id + "\"";
    user_keys[i] = user_key;
}
user_id_str += "];";
console.log(user_id_str);

//
//console.log("Salt:");
console.log("var password_hash_salt = \"" + admin_input.password_hash_salt + "\";");
console.log("var login_hash_salt = \"" + admin_input.login_hash_salt + "\";");
console.log("var key_hash_salt = \"" + admin_input.key_hash_salt + "\";");

// html encryption
if (admin_input.page_name.length * admin_input.username.length != admin_input.page_content.length) {
    console.log("ERR048: Error, unexpected array length: page_name.length: " + admin_input.page_name.length + " username.length: " + admin_input.username.length + " page_content.length: " + admin_input.page_content.length);
    process.exit(2);
}

for (var j = 0; j<admin_input.page_name.length; j++) {
    console.log("\nUpdate in src/" + admin_input.page_name[j] + ".html");
    var encrypted_html_str = "var encrypted_html = [\n";
    for (var i = 0; i<admin_input.username.length; i++) {
        var encrypted_html = CryptoJS.AES.encrypt(admin_input.page_content[j*admin_input.username.length+i], user_keys[i]);
        if (i>0) {
            encrypted_html_str += ",\n";
        }
        encrypted_html_str += "\"" + encrypted_html + "\"";
    }
    encrypted_html_str += "];";
    console.log(encrypted_html_str);
}



