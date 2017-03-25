/* @param {Object} [options]
 * @param {String[]} options.requestPermissions A list of permissions to request from the user.
 * @param {Boolean} options.requestOfflineToken If true, asks the user for permission to act on their behalf when offline.
 *   This stores an additional offline token in the `services` field of the user document. 
 *   Currently only supported with Google.
 * @param {Object} options.loginUrlParameters Provide additional parameters to the authentication uri. 
 *   Currently only supported with Google {@url https://developers.google.com/identity/protocols/
 *   OpenIDConnect#authenticationuriparameters}.
 * @param {String} options.loginHint An email address that the external service will use to pre-fill the 
 *   login prompt. Currently only supported with Meteor developer accounts and Google accounts. 
 *   If used with Google, the Google 
 *   User ID can also be passed.
 * @param {String} options.loginStyle Login style ("popup" or "redirect", defaults to the login service configuration).  
 *   The "popup" style opens the login page in a separate popup window, which is generally preferred because the Meteor 
 *   application doesn't need to be reloaded.  The "redirect" style redirects the Meteor application's window to the login 
 *   page, and the login service provider redirects back to the Meteor application which is then reloaded.  The "redirect" 
 *   style can be used in situations where a popup window can't be opened, such as in a mobile UIWebView.  The "redirect" 
 *   style however relies on session storage which isn't available in Safari private mode, so the "popup" style will 
 *    be forced if session storage can't be used.
 * @param {String} options.redirectUrl If using "redirect" login style, the user will be returned to this URL after 
 *  authorisation has been completed.
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on 
 *   failure. The callback cannot be called if you are using the "redirect" `loginStyle`, because the app will have reloaded 
 *   in the meantime; try using [client-side login hooks](#accounts_onlogin) instead.
 */

Accounts.oauth.registerService('ada');
if (Meteor.isClient) {
  Meteor.loginWithAda = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Ada.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: ['services.ada'],
    forOtherUsers: [
      // https://www.adatom.hu
      'services.ada.id', 'services.ada.username', 'services.ada.gender'
    ]
  });
}
