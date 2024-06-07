function transformToCamelCase(cssStyle) 
{
    var words = cssStyle.split('-');
    var camelCaseStyle = words[0];

    for (var i = 1; i < words.length; i++)
         {
        camelCaseStyle += words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return camelCaseStyle;
}


console.log(transformToCamelCase("font-size")); 
console.log(transformToCamelCase("background-color")); 
console.log(transformToCamelCase("text-align"));
