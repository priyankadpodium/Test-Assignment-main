exports.process = function (event, context) { 
    contextponse_index=Math.floor(Math.random() * 2)
    var contextponse = ["declined", "confirm"];
    context.json({
        status: contextponse[contextponse_index]
    });
};