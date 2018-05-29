/**
 * Order Class
 * @namespace
 */
var Order = (function (__this) {

    __this.create = function (orderData) {
        if (!orderData) return Sheetbase.AppError.client(
            'order/missing-info',
            'Missing order information!'
        );

        // TODO: validate order data

        // preapare
        var preparedOrder = JSON.parse(JSON.stringify(orderData));
        for (var key in preparedOrder) {
            if (preparedOrder[key] instanceof Object) {
                preparedOrder[key] = JSON.stringify(preparedOrder[key]);
            }
        }
        // more info
        preparedOrder.id = Sheetbase.Helper.id();
        preparedOrder.timestamp = (new Date()).toISOString();


        var OrderTable = Sheetbase.Model.get('Order');

        // append preparedOrder
        var newOrder = new OrderTable(preparedOrder);
        var newSavedOrder = newOrder.save();
        if (!newSavedOrder) return Sheetbase.AppError.client(
            'order/action-fails',
            'Errors happen when saving order, please try again!'
        );

        // send email to operator and customer
        // var bcc = (orderData.client && orderData.client.email) ? orderData.client.email : null;
        // var recipient = Sheetbase.Config.get('operatorEmail') || bcc;
        // var template = TemplateEmail.order(newSavedOrder);
        // var title = template.title;
        // var bodyText = template.text;
        // var bodyHtml = template.html;

        // var options = {
        //     name: Sheetbase.Config.get('siteName') || 'Sheetbase.net App',
        //     htmlBody: bodyHtml
        // };
        // if (bcc) options.bcc = bcc;

        // if (recipient) {
        //     try {
        //         GmailApp.sendEmail(recipient, title, bodyText, options);
        //     } catch (error) {
        //         return Sheetbase.AppError.server(
        //             'order/email-not-sent',
        //             'Email not sent!'
        //         );
        //     }
        // }

        return {
            '#': newSavedOrder['#'],
            id: newSavedOrder.id,
            timestamp: newSavedOrder.timestamp
        };
    }

    return __this;

})(Order||{});