var vec3 = require("vec3");


var color = module.exports;


color.create = vec3.create;

color.copy = vec3.copy;

color.clone = vec3.clone;

color.setRGB = vec3.set;

color.add = vec3.add;
color.sub = vec3.sub;

color.mul = vec3.mul;
color.div = vec3.div;

color.sadd = vec3.sadd;
color.ssub = vec3.ssub;

color.smul = vec3.smul;
color.sdiv = vec3.sdiv;

color.lengthSqValues = vec3.lengthSqValues;

color.lengthValues = vec3.lengthValues;

color.invLengthValues = vec3.invLengthValues;

color.dot = vec3.dot;

color.lengthSq = vec3.lengthSq;

color.length = vec3.length;

color.invLength = vec3.invLength;

color.setLength = vec3.setLength;

color.normalize = vec3.normalize;

color.lerp = vec3.lerp;

color.min = vec3.min;

color.max = vec3.max;

color.clamp = vec3.clamp;

color.equal = vec3.equal;

color.notEqual = vec3.notEqual;


var cmin = color.create(0, 0, 0),
    cmax = color.create(1, 1, 1);

color.cnormalize = function(out) {

    return color.clamp(out, out, cmin, cmax);
};

color.str = function(out) {

    return "Color(" + out[0] + ", " + out[1] + ", " + out[2] + ", " + out[3] + ")";
};

color.set = function(out, r, g, b) {
    var type = typeof(r);

    if (type === "number") {
        out[0] = r !== undefined ? r : 0;
        out[1] = g !== undefined ? g : 0;
        out[2] = b !== undefined ? b : 0;
    } else if (type === "string") {
        color.setStyle(out, r);
    } else if (r.length === +r.length) {
        out[0] = r[0] || 0;
        out[1] = r[1] || 0;
        out[2] = r[2] || 0;
    }

    return out;
};

var rgb255 = /^rgb\((\d+),(\d+),(\d+)\)$/i,
    rgb100 = /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i,
    hex6 = /^\#([0.0-9a-f]{6})$/i,
    hex3 = /^\#([0.0-9a-f])([0.0-9a-f])([0.0-9a-f])$/i,
    hex3to6 = /#(.)(.)(.)/,
    hex3to6String = "#$1$1$2$2$3$3",
    colorName = /^(\w+)$/i,
    inv255 = 1 / 255,
    inv100 = 1 / 100;

color.setStyle = function(out, style) {
    var color;

    if (rgb255.test(style)) {
        color = rgb255.exec(style);

        out[0] = min(255, Number(color[1])) * inv255;
        out[1] = min(255, Number(color[2])) * inv255;
        out[2] = min(255, Number(color[3])) * inv255;
    } else if (rgb100.test(style)) {
        color = rgb100.exec(style);

        out[0] = min(100, Number(color[1])) * inv100;
        out[1] = min(100, Number(color[2])) * inv100;
        out[2] = min(100, Number(color[3])) * inv100;
    } else if (hex6.test(style)) {

        out[0] = parseInt(style.substr(1, 2), 16) * inv255;
        out[1] = parseInt(style.substr(3, 2), 16) * inv255;
        out[2] = parseInt(style.substr(5, 2), 16) * inv255;
    } else if (hex3.test(style)) {
        style = style.replace(hex3to6, hex3to6String);

        out[0] = parseInt(style.substr(1, 2), 16) * inv255;
        out[1] = parseInt(style.substr(3, 2), 16) * inv255;
        out[2] = parseInt(style.substr(5, 2), 16) * inv255;
    } else if (colorName.test(style)) {
        style = colorNames[style.toLowerCase()];

        out[0] = parseInt(style.substr(1, 2), 16) * inv255;
        out[1] = parseInt(style.substr(3, 2), 16) * inv255;
        out[2] = parseInt(style.substr(5, 2), 16) * inv255;
    }

    return out;
};

var colorNames = color.colorNames = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgrey: "#d3d3d3",
    lightgreen: "#90ee90",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370d8",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#d87093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
};
