var mathf = require("@nathanfaucett/mathf"),
    vec3 = require("@nathanfaucett/vec3"),
    vec4 = require("@nathanfaucett/vec4"),
    isNumber = require("@nathanfaucett/is_number"),
    isString = require("@nathanfaucett/is_string"),
    colorNames = require("./colorNames");


var color = exports;


color.ArrayType = typeof(Float32Array) !== "undefined" ? Float32Array : mathf.ArrayType;


color.create = function(r, g, b, a) {
    var out = new color.ArrayType(4);

    out[0] = isNumber(r) ? r : 0;
    out[1] = isNumber(g) ? g : 0;
    out[2] = isNumber(b) ? b : 0;
    out[3] = isNumber(a) ? a : 1;

    return out;
};

color.copy = vec4.copy;

color.clone = function(a) {
    var out = new color.ArrayType(4);

    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];

    return out;
};

color.setRGB = vec3.set;
color.setRGBA = vec4.set;

color.add = vec4.add;
color.sub = vec4.sub;

color.mul = vec4.mul;
color.div = vec4.div;

color.sadd = vec4.sadd;
color.ssub = vec4.ssub;

color.smul = vec4.smul;
color.sdiv = vec4.sdiv;

color.lengthSqValues = vec4.lengthSqValues;
color.lengthValues = vec4.lengthValues;
color.invLengthValues = vec4.invLengthValues;

color.dot = vec4.dot;

color.lengthSq = vec4.lengthSq;

color.length = vec4.length;

color.invLength = vec4.invLength;

color.setLength = vec4.setLength;

color.normalize = vec4.normalize;

color.lerp = vec4.lerp;

color.min = vec4.min;

color.max = vec4.max;

color.clamp = vec4.clamp;

color.equals = vec4.equals;
color.notEquals = vec4.notEquals;


var cmin = color.create(0, 0, 0, 0),
    cmax = color.create(1, 1, 1, 1);

color.cnormalize = function(out, a) {
    return color.clamp(out, a, cmin, cmax);
};

color.str = function(out) {
    return "Color(" + out[0] + ", " + out[1] + ", " + out[2] + ", " + out[3] + ")";
};

color.string = color.toString = color.str;

color.set = function(out, r, g, b, a) {
    if (isNumber(r)) {
        out[0] = isNumber(r) ? r : 0;
        out[1] = isNumber(g) ? g : 0;
        out[2] = isNumber(b) ? b : 0;
        out[3] = isNumber(a) ? a : 1;
    } else if (isString(r)) {
        color.fromStyle(out, r);
    } else if (r && r.length === +r.length) {
        out[0] = r[0] || 0;
        out[1] = r[1] || 0;
        out[2] = r[2] || 0;
        out[3] = r[3] || 1;
    }

    return out;
};

function to256(value) {
    return (value * 255) | 0;
}

color.toRGB = function(out, alpha) {
    if (isNumber(alpha)) {
        return "rgba(" + to256(out[0]) + "," + to256(out[1]) + "," + to256(out[2]) + "," + (mathf.clamp01(alpha) || 0) + ")";
    } else {
        return "rgb(" + to256(out[0]) + "," + to256(out[1]) + "," + to256(out[2]) + ")";
    }
};

color.toRGBA = function(out) {
    return "rgba(" + to256(out[0]) + "," + to256(out[1]) + "," + to256(out[2]) + "," + (mathf.clamp01(out[3]) || 0) + ")";
};

function toHEX(value) {
    value = mathf.clamp(value * 255, 0, 255) | 0;

    if (value < 16) {
        return "0" + value.toString(16);
    } else if (value < 255) {
        return value.toString(16);
    } else {
        return "ff";
    }
}

color.toHEX = function(out) {
    return "#" + toHEX(out[0]) + toHEX(out[1]) + toHEX(out[2]);
};

var rgb255 = /^rgb\((\d+),(?:\s+)?(\d+),(?:\s+)?(\d+)\)$/i,
    inv255 = 1 / 255;

color.fromRGB = function(out, style) {
    var values = rgb255.exec(style);
    out[0] = mathf.min(255, Number(values[1])) * inv255;
    out[1] = mathf.min(255, Number(values[2])) * inv255;
    out[2] = mathf.min(255, Number(values[3])) * inv255;
    out[3] = 1;
    return out;
};

var rgba255 = /^rgba\((\d+),(?:\s+)?(\d+),(?:\s+)?(\d+),(?:\s+)?((?:\.)?\d+(?:\.\d+)?)\)$/i;

color.fromRGBA = function(out, style) {
    var values = rgba255.exec(style);
    out[0] = mathf.min(255, Number(values[1])) * inv255;
    out[1] = mathf.min(255, Number(values[2])) * inv255;
    out[2] = mathf.min(255, Number(values[3])) * inv255;
    out[3] = mathf.min(1, Number(values[4]));
    return out;
};

var rgb100 = /^rgb\((\d+)\%,(?:\s+)?(\d+)\%,(?:\s+)?(\d+)\%\)$/i,
    inv100 = 1 / 100;

color.fromRGB100 = function(out, style) {
    var values = rgb100.exec(style);
    out[0] = mathf.min(100, Number(values[1])) * inv100;
    out[1] = mathf.min(100, Number(values[2])) * inv100;
    out[2] = mathf.min(100, Number(values[3])) * inv100;
    out[3] = 1;
    return out;
};

color.fromHEX = function(out, style) {
    out[0] = parseInt(style.substr(1, 2), 16) * inv255;
    out[1] = parseInt(style.substr(3, 2), 16) * inv255;
    out[2] = parseInt(style.substr(5, 2), 16) * inv255;
    out[3] = 1;
    return out;
};

var hex3to6 = /#(.)(.)(.)/,
    hex3to6String = "#$1$1$2$2$3$3";

color.fromHEX3 = function(out, style) {
    style = style.replace(hex3to6, hex3to6String);
    out[0] = parseInt(style.substr(1, 2), 16) * inv255;
    out[1] = parseInt(style.substr(3, 2), 16) * inv255;
    out[2] = parseInt(style.substr(5, 2), 16) * inv255;
    out[3] = 1;
    return out;
};

color.fromColorName = function(out, style) {
    return color.fromHEX(out, colorNames[style.toLowerCase()]);
};

var hex6 = /^\#([0.0-9a-f]{6})$/i,
    hex3 = /^\#([0.0-9a-f])([0.0-9a-f])([0.0-9a-f])$/i,
    colorName = /^(\w+)$/i;

color.fromStyle = function(out, style) {
    if (rgb255.test(style)) {
        return color.fromRGB(out, style);
    } else if (rgba255.test(style)) {
        return color.fromRGBA(out, style);
    } else if (rgb100.test(style)) {
        return color.fromRGB100(out, style);
    } else if (hex6.test(style)) {
        return color.fromHEX(out, style);
    } else if (hex3.test(style)) {
        return color.fromHEX3(out, style);
    } else if (colorName.test(style)) {
        return color.fromColorName(out, style);
    } else {
        return out;
    }
};

color.colorNames = colorNames;
