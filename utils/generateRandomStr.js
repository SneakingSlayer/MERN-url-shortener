module.exports = function(number) {
    let text = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < number; i++)
            text += characters.charAt(Math.floor(Math.random() * characters.length));
    return text;
}