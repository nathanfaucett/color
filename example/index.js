global.color = require("../src/index");


var a = color.create(),
    b = color.create(),
    c = color.create();

color.set(a, "#ff0088");
color.set(b, "#3f085f");

color.add(a, a, b);
color.add(c, c, a);

console.log(color.toHEX(color.fromStyle(color.create(), "#f1f1f1")));

var fade_color = color.create();
function fade(style, amount) {
    return color.toRGBA(color.smul(fade_color, color.fromStyle(fade_color, style), amount));
}

console.log(fade("#fff", 0.5));
