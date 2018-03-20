const sketch = require('sketch')
var Artboard = require('sketch/dom').Artboard
var Group = require('sketch/dom').Group
var Rectangle = require('sketch/dom').Rectangle
var Shape = require('sketch/dom').Shape
var Style = require('sketch/dom').Style
var Text = require('sketch/dom').Text
var SymbolMaster = require('sketch/dom').SymbolMaster

var systems = {
  "yxf8pjwlhx": {
    "name": "button",
    "children": {
      "o4qrk2kkq4": {
        "fontColor": "#000000",
        "fontSize": 14,
        "fontWeight": "Regular",
        "name": "label",
        "typeface": "SF Mono",
        "type": "text",
      },
      "urx7bp2v24i": {
        "borderColor": "#1C85FF",
        "borderRadius": [4, 4, 4, 4],
        "borderWidth": 0,
        "fillColor": "#1C85FF",
        "height": 32,
        "name": "background",
        "opacity": 0.0,
        "type": "shape",
        "width": 120,
      }
    }
  }
}

// For every system
for (var s in systems) {

  var system = systems[s]
  var subsystems = system.children

  // For every subsystem
  for (var ss in subsystems) {
    var subsystem = subsystems[ss]

    log(subsystem.type)

  }

}

// log(generateUniqueId())

export default function(context) {

  // Get current document
  const document = sketch.fromNative(context.document)

  // Get selected page and rename it
  const page = document.selectedPage
  page.name = "button"

  // Reset everything
  page.layers = {}

  // Create symbol
  var artboard = new SymbolMaster({
    name: "button/",
    parent: page
  })

  // Create label
  var label = new Text({
    text: 'Label',
    name: 'label',
    parent: artboard,
    frame: {
      x: 10,
      y: 10
    }
  })

  changeTextColor(label, 1, 1, 1, 1)

  changeTextFont(label, 'SF Pro Text Regular', 14)

  // Create background
  var background = new Shape({
    name: 'background',
    parent: artboard,
    frame: {
      x: 0,
      y: 0,
      width: label.frame.width + 20,
      height: label.frame.height + 20
    },
    style: {
      fills: [{
        color: '#1C85FF',
        fillType: Style.FillType.color,
      }],
      borders: [{
        color: '#000000ff',
        fillType: Style.FillType.color,
        thickness: '0'
      }],
    }
  })

  changeRectangleRadius(background, 4, 4, 4, 4)

  background.moveBackward()

  artboard.adjustToFit()

}

function changeTextColor(text, r, g, b, a) {

  // access the underlying sketch object and get its textstyle
  var textStyle = text.sketchObject.style().textStyle()

  // textstyle consists of a dictionary of attributes, take a mutable copy of that dictionary
  var mutableAttributes = NSMutableDictionary.dictionaryWithDictionary(textStyle.attributes())

  // set the NSColor key for the attributes dictionary
  mutableAttributes.setObject_forKey(NSColor.colorWithRed_green_blue_alpha(r,g,b,a),'NSColor');

  // write the attributes dictionary back onto the textstyle (and we're done)
  textStyle.setValue_forKey_(mutableAttributes,'attributes');

}

function changeTextFont(text, font, size) {

  // access the underlying sketch object and get its textstyle
  var textStyle = text.sketchObject.style().textStyle()

  // textstyle consists of a dictionary of attributes, take a mutable copy of that dictionary
  var mutableAttributes = NSMutableDictionary.dictionaryWithDictionary(textStyle.attributes())

  // set the NSColor key for the attributes dictionary
  mutableAttributes.setObject_forKey(NSFont.fontWithName_size_(font,size),'NSFont');

  // write the attributes dictionary back onto the textstyle (and we're done)
  textStyle.setValue_forKey_(mutableAttributes,'attributes');
}

function changeRectangleRadius(rectangle, a, b, c, d) {

  radiusArray = [a, b, c, d]

  // For every one of 4 points in rectangle
  for (i = 0; i < 4; i++) {

    // access the underlying sketch object and get its radius
    var radius = rectangle.sketchObject.layers()[0].points()[i]

    // write the value onto the radius (and we're done)
    radius.setValue_forKey_(radiusArray[i], 'cornerRadius')

  }

}

function generateUniqueId(){

  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return Math.random().toString(36).substr(2, 11);

}
