var tape = require("tape"),
    color = require("..");


var white = color.create(1.0, 1.0, 1.0, 1.0),
    grey = color.create(0.5, 0.5, 0.5, 1.0),
    black = color.create(0.0, 0.0, 0.0, 1.0);


tape("color.toRGB(out[, alpha = 1])", function(assert) {
    assert.equals(color.toRGB(grey), "rgb(127,127,127)");
    assert.equals(color.toRGB(grey, 0.5), "rgba(127,127,127,0.5)");
    assert.end();
});

tape("color.toRGBA(out)", function(assert) {
    assert.equals(color.toRGBA(grey), "rgba(127,127,127,1)");
    assert.end();
});

tape("color.toHEX(out)", function(assert) {
    assert.equals(color.toHEX(white), "#ffffff");
    assert.equals(color.toHEX(black), "#000000");
    assert.end();
});

tape("color.fromRGB(out, rgb)", function(assert) {
    assert.deepEquals(color.fromRGB(color.create(), "rgb(0, 0, 0)"), color.create(0, 0, 0, 1));
    assert.end();
});

tape("color.fromRGBA(out, rgba)", function(assert) {
    assert.deepEquals(color.fromRGBA(color.create(), "rgba(0, 0, 0, 0.5)"), color.create(0, 0, 0, 0.5));
    assert.end();
});

tape("color.fromRGB100(out, rgb100)", function(assert) {
    assert.deepEquals(color.fromRGB100(color.create(), "rgb(50%, 50%, 50%)"), color.create(0.5, 0.5, 0.5, 1));
    assert.end();
});

tape("color.fromHEX(out, hex)", function(assert) {
    assert.deepEquals(color.fromHEX(color.create(), "#ffffff"), color.create(1, 1, 1, 1));
    assert.end();
});

tape("color.fromHEX3(out, hex3)", function(assert) {
    assert.deepEquals(color.fromHEX3(color.create(), "#fff"), color.create(1, 1, 1, 1));
    assert.end();
});

tape("color.fromColorName(out, colorName)", function(assert) {
    assert.deepEquals(color.fromColorName(color.create(), "blue"), color.create(0, 0, 1, 1));
    assert.end();
});

tape("color.fromStyle(out, style)", function(assert) {
    assert.deepEquals(color.fromStyle(color.create(), "rgb(0, 0, 0)"), color.create(0, 0, 0, 1));
    assert.deepEquals(color.fromStyle(color.create(), "rgb(0, 0, 0)"), color.create(0, 0, 0, 1));
    assert.deepEquals(color.fromStyle(color.create(), "rgba(0, 0, 0, 0.5)"), color.create(0, 0, 0, 0.5));
    assert.deepEquals(color.fromStyle(color.create(), "rgb(50%, 50%, 50%)"), color.create(0.5, 0.5, 0.5, 1));
    assert.deepEquals(color.fromStyle(color.create(), "#ffffff"), color.create(1, 1, 1, 1));
    assert.deepEquals(color.fromStyle(color.create(), "#fff"), color.create(1, 1, 1, 1));
    assert.deepEquals(color.fromStyle(color.create(), "blue"), color.create(0, 0, 1, 1));
    assert.end();
});
