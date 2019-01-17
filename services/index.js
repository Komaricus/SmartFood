require('module-alias/register');
const http = require('http'),
  SmartFridgeAPI = require('@SmartFridgeAPI'),
  SmartFridgeServer = http.Server(SmartFridgeAPI),
  SmartFridgePORT = process.env.PORT || 3001,
  LOCAL = '0.0.0.0';
SmartFridgeServer.listen(SmartFridgePORT, LOCAL, () => console.log(`SmartFridgeAPI running on ${SmartFridgePORT}`));