
function capitalizeWords(str) 
{
    return str.replace(/\b\w/g, function(char) 
    {
        return char.toUpperCase();
    });
}

let sentence = "hello world";
let capitalizedSentence = capitalizeWords(sentence);
console.log(capitalizedSentence); 
