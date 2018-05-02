function doGet(e) { return HTTP_GET(e);}
function doPost(e) { return HTTP_POST(e);}

// Init Sheetbase, see config at Config.ts
Sheetbase.initialize(SHEETBASE_CONFIG(), APP_CONFIG());