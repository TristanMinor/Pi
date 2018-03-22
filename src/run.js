const sketch = require('sketch')
var Artboard = require('sketch/dom').Artboard
var Document = require('sketch/dom').Document
var Group = require('sketch/dom').Group
var Rectangle = require('sketch/dom').Rectangle
var Shape = require('sketch/dom').Shape
var Style = require('sketch/dom').Style
var Text = require('sketch/dom').Text
var UI = require('sketch/ui')
var Settings = require('sketch/settings')
var SymbolMaster = require('sketch/dom').SymbolMaster

// log(generateUniqueId())

var systems = {
  "fonts": {
    "mnlmki4s2jr": {
      "name": "SF Pro Text",
      "value": "SF Pro Text",
    }
  },
  "colors": {
    "wrgze8ypmp": {
      "name": "white",
      "value": "#000000",
    }
  },
  "custom": {
    "yxf8pjwlhx": {
      "name": "button",
      "children": {
        "o4qrk2kkq4": {
          "fixedWidth": false,
          "font": "SF Pro Text",
          "fontColor": "#000000",
          "fontSize": 14,
          "fontWeight": "Bold",
          "index": 1,
          "lineHeight": 100,
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
  for (var s in systems.custom) {

    var system = systems.custom[s]
    var subsystems = system.children

    // Create symbol for system
    var artboard = new SymbolMaster({
      name: system.name,
      parent: page
    })

    // For every subsystem
    for (var ss in subsystems) {
      var subsystem = subsystems[ss]

      // –––––––––––––– TEXT –––––––––––––– //

      if (subsystem.type == 'text') {

        var subsystem_name = subsystem.name
        var subsystem_fixedWidth = subsystem.fixedWidth
        var subsystem_font = subsystem.font
        var subsystem_fontSize = subsystem.fontSize
        var subsystem_fontWeight = subsystem.fontWeight
        var subsystem_lineHeight = subsystem.lineHeight
        var subsystem_text = subsystem.text
        var subsystem_alignment = subsystem.textAlign
        var subsystem_x = subsystem.x
        var subsystem_y = subsystem.y

        var text = new Text({
          alignment: subsystem_alignment,
          fixedWidth: subsystem_fixedWidth,
          frame: {
            x: subsystem_x,
            y: subsystem_y
          },
          lineSpacing: "variable",
          name: subsystem_name,
          parent: artboard,
          text: subsystem_text,
        })

        changeTextColor(text, 0, 0, 1, 1)

        changeTextFont(text, subsystem_font + " " + subsystem_fontWeight, subsystem_fontSize)

        // log(text.sketchObject.style().textStyle())

      // –––––––––––––– SHAPE –––––––––––––– //

      } else if (subsystem.type == 'shape') {

        var subsystem_borderColor = subsystem.borderColor
        var subsystem_borderWidth = subsystem.borderWidth
        var subsystem_borderRadius = subsystem.borderRadius
        var subsystem_fillColor = subsystem.fillColor
        var subsystem_name = subsystem.name
        var subsystem_x = subsystem.x
        var subsystem_y = subsystem.y

        var shape = new Shape({
          frame: {
            x: subsystem_x,
            y: subsystem_y,
            width: text.frame.width + 20,
            height: text.frame.height + 20
          },
          name: subsystem_name,
          parent: artboard,
          style: {
            borders: [{
              color: subsystem_borderColor,
              fillType: Style.FillType.color,
              thickness: subsystem_borderWidth.toString()
            }],
            fills: [{
              color: subsystem_fillColor,
              fillType: Style.FillType.color,
            }]
          }
        })

        changeRectangleRadius(shape, subsystem_borderRadius[0], subsystem_borderRadius[1], subsystem_borderRadius[2], subsystem_borderRadius[3])

        shape.moveBackward()

      }
    }
  }

  artboard.adjustToFit()

}

function changeTextColor(text, h, s, l, a) {

  // access the underlying sketch object and get its textstyle
  var textStyle = text.sketchObject.style().textStyle()

  // textstyle consists of a dictionary of attributes, take a mutable copy of that dictionary
  var mutableAttributes = NSMutableDictionary.dictionaryWithDictionary(textStyle.attributes())

  // set the NSColor key for the attributes dictionary
  mutableAttributes.setObject_forKey(NSColor.colorWithHue_saturation_brightness_alpha(h,s,l,a),'NSColor');

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
