module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var _ = require('lodash');

    context.res = {
        status: 200,
        body: "_.random(0, 100, true) = " + _.random(0, 100, true)
    };
};