Ada = {};

Ada.handleAuthFromAccessToken = function handleAuthFromAccessToken(accessToken, expiresAt) {
  // include all fields from ada
  var whitelisted = ['id', 'email', 'assurances'];

  var identity = getIdentity(accessToken, whitelisted);

  var serviceData = {
    accessToken: accessToken,
    expiresAt: expiresAt
  };

  var fields = _.pick(identity, whitelisted);
  _.extend(serviceData, fields);

  return {
    serviceData: serviceData,
    options: {profile: {name: identity.name}}
  };
};

OAuth.registerService('ada', 2, null, function(query) {
  var response = getTokenResponse(query);
  var accessToken = response.accessToken;
  var expiresIn = response.expiresIn;

  return Ada.handleAuthFromAccessToken(accessToken, (+new Date) + (1000 * expiresIn));
});

// checks whether a string parses as JSON
var isJSON = function (str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
var getTokenResponse = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'ada'});
  if (!config)
    throw new ServiceConfiguration.ConfigError();

  var responseContent;
  try {
    // Request an access token
    responseContent = HTTP.get(
      "https://adatom.hu/ada/v1/oauth2/token", {
        params: {
          client_id: config.appId,
          redirect_uri: OAuth._redirectUri('ada', config),
          client_secret: OAuth.openSecret(config.secret),
          code: query.code
        }
      }).data;
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Ada. " + err.message),
                   {response: err.response});
  }

  var adaAccessToken = responseContent.access_token;
  var adaExpires = responseContent.expires_in;

  if (!adaAccessToken) {
    throw new Error("Failed to complete OAuth handshake with ada " +
                    "-- can't find access token in HTTP response. " + responseContent);
  }
  return {
    accessToken: adaAccessToken,
    expiresIn: adaExpires
  };
};

var getIdentity = function (accessToken, fields) {
  try {
    return HTTP.get("https://adatom.hu/ada/v1/users/me", {
      params: {
        access_token: accessToken,
        fields: fields.join(",")
      }
    }).data;
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Ada. " + err.message),
                   {response: err.response});
  }
};

Ada.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
