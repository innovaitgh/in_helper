"use strict";

var _env_host = _interopRequireDefault(require("env_host"));
var _queryString = _interopRequireDefault(require("query-string"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var setCookie = function setCookie(cname, cvalue, expiry) {
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(expiry);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
};
var getCookie = function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
var accountHost = (0, _env_host["default"])("account.innovaitgh");
var validateTokenFetch = function validateTokenFetch(headers) {
  return fetch("".concat(accountHost, "/api/v1/validate_token"), {
    headers: headers
  });
};
var shouldRedirect = function shouldRedirect(headers) {
  var _queryString$parse = _queryString["default"].parse(window.location.search),
    r_path = _queryString$parse.r_path;
  if (r_path) {
    var r_path_host = new URL(r_path).origin;
    var queryHeaders = _queryString["default"].stringify(headers);
    window.location.replace("".concat(r_path_host, "/users/verify?").concat(queryHeaders, "&r_path=").concat(r_path));
  }
  return false;
};
var getAuthCookie = function getAuthCookie() {
  return getCookie("iu4");
};
var clearCookie = function clearCookie(name) {
  return setCookie(name, "", 0);
};
module.exports = {
  clearCookie: clearCookie,
  shouldRedirect: shouldRedirect,
  validateTokenFetch: validateTokenFetch,
  accountHost: accountHost,
  getCookie: getCookie,
  setCookie: setCookie,
  getAuthCookie: getAuthCookie
};