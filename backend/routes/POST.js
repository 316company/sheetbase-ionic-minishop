function HTTP_POST(e) {
  if(!Sheetbase.Request.isAuthorized(e)) return Sheetbase.Response.unauthorized();     
  
  var endpoint = Sheetbase.Request.param(e, 'e');

  // override home route
  // if(!endpoint) return {};

  // custom routes
  switch(endpoint) {

    // NOTE: Routes start here

    case 'order/create':
      return Sheetbase.Response.json(
        PostOutput.orderCreate(e)
      );
    break;


    // Routes ended

    default: break;
  }
  
  // default routes
  return Sheetbase.POSTRoute.defaults(e);
}

var PostOutput = {

  orderCreate: function (e) {
    var orderData = Sheetbase.Request.body(e, 'orderData');
    return OrderTable.create(orderData);
  }

};