    paypal.Button.render({

        env: 'production', // Or 'sandbox'

        client: {
            sandbox:    'AdZ15E9wo-owMdiVw6zUv5syuyW3h91f3059T1u5fZVpaxF-CA8t2YVhknomyVXqwBfCJ_ykKvCT8Aph',
            production: 'AdZ15E9wo-owMdiVw6zUv5syuyW3h91f3059T1u5fZVpaxF-CA8t2YVhknomyVXqwBfCJ_ykKvCT8Aph'
        },

        commit: true, // Show a 'Pay Now' button

        payment: function(data, actions) {
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: '1.00', currency: 'USD' }
                        }
                    ]
                }
            });
        },

        onAuthorize: function(data, actions) {
            return actions.payment.execute().then(function(payment) {

                // The payment is complete!
                // You can now show a confirmation message to the customer
            });
        }

    }, '#paypal-button');
