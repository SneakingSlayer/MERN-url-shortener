module.exports = function(base62, number){
    let text = "";
  
    for (let i = 0; i < number; i++)
            text += base62.charAt(Math.floor(Math.random() * base62.length));
  
    return text;
}