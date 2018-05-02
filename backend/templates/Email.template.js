var TemplateEmail = (function (__this) {

    __this.order = function (order) {
        var title = '';
        var text = '';
        var html = '';

        // title
        title += 'Order #'+ order['#'] +' created.';

        // text
        text += 'No: #'+ order['#'] +'\\n';
        text += 'Id: '+ order.id +'\\n';
        text += 'Transaction Id: '+ (order.transactionId || 'n/a (pay later)') +'\\n';
        text += 'Date: '+ order.timstamp +'\\n';
        text += 'Count: '+ order.count +' items\\n';
        text += 'Total: '+ order.total +' '+ (APP_CONFIG.currencyCode||'USD') +'\\n';
        text += 'Items: '+ order.items +'\\n';
        text += 'Thank you for using our services!';
        
        // html
        html += '<p>No: #'+ order['#'] +'</p>';
        html += '<p>Id: <strong>'+ order.id +'</strong></p>';
        html += '<p>Transaction Id: '+ (order.transactionId || 'n/a (pay later)') +'</p>';
        html += '<p>Date: '+ order.timestamp +'</p>';
        html += '<p>Count: '+ order.count +' items</p>';
        html += '<p>Total: <strong>'+ order.total +'</strong> '+ (APP_CONFIG.currencyCode||'USD') +'</p>';
        html += '<p>Items: <em>'+ order.items +'</em></p>';
        html += '<p>Thank you for using our services!</p>';

        return {
            title: title,
            text: text,
            html: html
        };
    }

    return __this;

})(TemplateEmail||{});