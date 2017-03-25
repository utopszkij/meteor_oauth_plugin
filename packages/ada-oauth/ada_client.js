Ada = {};

// Request Ada credentials for the user
//
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Ada.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'ada'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }

  var credentialToken = Random.secret();
  var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
  var display = mobile ? 'touch' : 'popup';

  var scope = "email";
  if (options && options.requestPermissions)
    scope = options.requestPermissions.join(',');

  var loginStyle = OAuth._loginStyle('ada', config, options);

  var loginUrl =
        'https://adatom.hu/ada/v1/oauth2/auth?client_id=' + config.appId +
        '&redirect_uri=' + OAuth._redirectUri('ada', config) +
        '&display=' + display + '&scope=' + scope +
        '&state=' + OAuth._stateParam(loginStyle, credentialToken, options && options.redirectUrl);

  // Handle authentication type (e.g. for force login you need auth_type: "reauthenticate")
  if (options && options.auth_type) {
    loginUrl += "&auth_type=" + encodeURIComponent(options.auth_type);
  }

  OAuth.launchLogin({
    loginService: "ada",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: {width:400, height: 700}
  });
}
