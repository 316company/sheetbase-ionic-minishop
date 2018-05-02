function HTTP_GET(e) {
  var endpoint = Sheetbase.Request.param(e, 'e');

  // override home route
  if(!endpoint)
    return Sheetbase.Response.html(
      '<h1>Sheetbase Mini Shop Backend</h1>' +
      '<p>Hello <strong>world</strong>!</p>'
    );

  if(!Sheetbase.Request.isAuthorized(e)) {
    return Sheetbase.Response.unauthorized();
  } else {

    // custom routes
    // switch(endpoint) {
    //   default: break;
    // }
    
    // default routes
    return Sheetbase.GETRoute.defaults(e);
    
  }

}

var GetOutput = {
};