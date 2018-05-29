function doGet(e) { return Sheetbase.HTTP.get(e) }
function doPost(e) { return Sheetbase.HTTP.post(e) }

// Init Sheetbase, see config at Config.ts
var app = Sheetbase.initialize(
    Object.assign({},
        SHEETBASE_CONFIG(),
        APP_CONFIG()
    )
);

app.get('/', function (req, res) {
    return res.html(
        '<h1>Sheetbase Mini Shop Backend</h1>'+
        '<p>Homepage: <a href="https://sheetbase.net">https://sheetbase.net</a></p>'+
        '<p>Docs: <a href="https://sheetbase.net/docs">https://sheetbase.net/docs</a></p>'
    );
});

app.post('/', function (req, res) {
    return res.standard({
    'title': 'Sheetbase Mini Shop API',
    'homepage': 'https://sheetbase.net',
    'docs': 'https://sheetbase.net/docs'
    });
});

app.post('/order/create', Sheetbase.Middleware.authorize, function (req, res) {
    return res.standard(
        Order.create(req.body.orderData)
    );
});