/* 
decrypt_html.js
some functions to decrypt portion of html pages
experimentation to make restricted access on client-side
*/

// global data
var user_ids = ["5a07088a28", "b94189d848"];
var password_hash_salt = "bleblesalt";
var login_hash_salt = "bliblisalt";
var key_hash_salt = "blablasalt";

// check if the username/password is probably a good one and return the supposed user index.
function identify_user(user_id){
  var user_idx = -1;
  for (var i = 0; i<user_ids.length; i++){
    if(user_id==user_ids[i]){
      user_idx = i;
    }
  }
  return user_idx;
}

// knowing the user_index and user_key decrypt the html and modify the page
function index_page_decryption(username, user_idx, user_key){
  var decrypted_page = CryptoJS.AES.decrypt(encrypted_html[user_idx], user_key).toString(CryptoJS.enc.Utf8);
  //document.write(decrypted_page)
  document.getElementById("log_info").innerHTML = "Logged as " + username;
  document.getElementById("log_status").innerHTML = "";
  document.getElementById("private_content").innerHTML = decrypted_page;
  document.getElementById("login_section").style.display = "none";
  document.getElementById("private_section").style.display = "block";
}

// log_in form action
function log_into() {
  var username = document.getElementsByName("username")[0].value;
  var password = document.getElementsByName("password")[0].value;
  if(username === ""){
    alert("Set a username to log in");
  }else{
    var password_hash = CryptoJS.SHA256(password_hash_salt + password).toString(CryptoJS.enc.Hex); // does this hash increase the security? is it overkill?
    var login_hash = CryptoJS.SHA256(login_hash_salt + username + password_hash.substring(0,20)).toString(CryptoJS.enc.Hex);
    var key_hash = CryptoJS.SHA256(key_hash_salt + username + password).toString(CryptoJS.enc.Hex);
    var user_id = login_hash.substring(0,10);
    var user_key = key_hash.substring(11,25);
    var dbg_txt = "";
    dbg_txt += "Hello " + username + "!<br>";
    dbg_txt += "your password is " + password + "<br>";
    //dbg_txt += "login_hash: " + login_hash + "<br>";
    //dbg_txt += "key_hash: " + key_hash + "<br>";
    dbg_txt += "user_id: " + user_id + "<br>";
    dbg_txt += "user_key: " + user_key + "<br>";
    //document.write(dbg_txt);
    //alert(dbg_txt)
    // look for potential user
    user_idx = identify_user(user_id);
    if(user_idx<0){ // not a potential user
      document.getElementById("log_status").innerHTML = "login failed! Try with an other username or password!";
    }else{ // a potential user
      // localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("user_key", user_key);
      index_page_decryption(username, user_idx, user_key);
    }
    
  }
}

// log_out form action
function log_out() {
  // delete localStorage
  localStorage.removeItem("username");
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_key");
  // swith content
  document.getElementById("log_info").innerHTML = "";
  document.getElementById("private_content").innerHTML = "";
  document.getElementById("login_section").style.display = "block";
  document.getElementById("private_section").style.display = "none";
}

// onload action
function try_decryption_onload(){
  // read localStorage
  var username = localStorage.getItem("username");
  var user_id = localStorage.getItem("user_id");
  var user_key = localStorage.getItem("user_key");
  //alert("username: " + username)
  // look for potential user
  user_idx = identify_user(user_id);
  if(user_idx>=0){
    index_page_decryption(username, user_idx, user_key);
  }
}


