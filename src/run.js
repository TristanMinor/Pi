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
        "font": "SF Pro Text",
        "fontColor": "#000000",
        "fontSize": 14,
        "fontWeight": "Bold",
        "index": 1,
        "name": "label",
        "text": "Label",
        "textAlign": "left",
        "type": "text",
        "x": 10,
        "y": 10,
      },
      "urx7bp2v24i": {
        "borderColor": "#1C85FF",
        "borderRadius": [4, 4, 4, 4],
        "borderWidth": 0,
        "fillColor": "#1C85FF",
        "fillType": "color",
        "height": 32,
        "index": 0,
        "name": "background",
        "opacity": 0.0,
        "type": "shape",
        "width": 120,
        "x": 0,
        "y": 0,
      }
    }
  }
}

export default function(context) {

  // Get current document
  const document = sketch.fromNative(context.document)

  // Get selected page and rename it
  const page = document.selectedPage
  page.name = "Test"

  // Reset everything
  page.layers = {}

  // For every system
  for (var s in systems) {

    var system = systems[s]
    var subsystems = system.children

    // Create symbol for system
    var artboard = new SymbolMaster({
      name: system.name,
      parent: page
    })

    // For every subsystem
    for (var ss in subsystems) {
      var subsystem = subsystems[ss]

      // If subsystem is Text
      if (subsystem.type == 'text') {

        // Create label
        var text = new Text({
          text: subsystem.text,
          name: subsystem.name,
          parent: artboard,
          frame: {
            x: subsystem.x,
            y: subsystem.y
          }
        })

        changeTextColor(text, 1, 1, 1, 1)

        changeTextFont(text, subsystem.font + " " + subsystem.fontWeight, subsystem.fontSize)

      // Or if subsystem is Shape
      } else if (subsystem.type == 'shape') {

        // Create background
        var shape = new Shape({
          name: subsystem.name,
          parent: artboard,
          frame: {
            x: subsystem.x,
            y: subsystem.y,
            width: text.frame.width + 20,
            height: text.frame.height + 20
          },
          style: {
            fills: [{
              color: subsystem.fillColor,
              fillType: Style.FillType.color,
            }],
            borders: [{
              color: subsystem.borderColor,
              fillType: Style.FillType.color,
              thickness: subsystem.borderWidth.toString()
            }],
          }
        })

        changeRectangleRadius(shape, subsystem.borderRadius[0], subsystem.borderRadius[1], subsystem.borderRadius[2], subsystem.borderRadius[3])

        // shape.moveBackward()

        log(shape.sketchObject.index)

      }
    }
  }

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
