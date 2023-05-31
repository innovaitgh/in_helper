import envHost from "env_host";
import queryString from "query-string";

const setCookie = (cname, cvalue, expiry) => {
    const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(expiry);
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
};

const getCookie = (cname) => {
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

const accountHost = envHost("account.innovaitgh");


const validateTokenFetch = () => fetch(`${accountHost}/api/v1/validate_token`, { headers });


const shouldRedirect = (headers) => {

    var { r_path } = queryString.parse(window.location.search);
    if (r_path) {
        var r_path_host = new URL(r_path).origin;
        var queryHeaders = queryString.stringify(headers);
        window.location.replace(`${r_path_host}/users/verify?${queryHeaders}&r_path=${r_path}`);
    }

    return false;

}

const getAuthCookie = (name) => getCookie(name);


const clearCookie = (name) => setCookie(name, "", 0);

module.exports = {
    clearCookie,
    shouldRedirect,
    validateTokenFetch,
    accountHost,
    getCookie,
    setCookie,
    getAuthCookie,
};
