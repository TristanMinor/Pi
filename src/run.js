const sketch = require('sketch')
var Artboard = require('sketch/dom').Artboard
var Document = require('sketch/dom').Document
var Group = require('sketch/dom').Group
var Page = require('sketch/dom').Page
var Rectangle = require('sketch/dom').Rectangle
var Shape = require('sketch/dom').Shape
var Style = require('sketch/dom').Style
var Text = require('sketch/dom').Text
var UI = require('sketch/ui')
var Settings = require('sketch/settings')
var SymbolMaster = require('sketch/dom').SymbolMaster

// log(generateUniqueId())

var systems = {
  "color": {
    "states": {
      "_wrgze8ypmp": {
        "name": "white",
        "value": "#000000",
      },
      "_hhn8bp16oar": {
        "name": "black",
        "value": "#ffffff",
      }
    }
  },
  "fixedWidth": {
    "states": {
      "_yjj4cnrjof": {
        "name": "false",
        "value": false,
      }
    }
  },
  "fontFamily": {
    "states": {
      "_mnlmki4s2jr": {
        "name": "SF Pro Text",
        "value": "SF Pro Text",
      }
    }
  },
  "fontWeight": {
    "states": {
      "_0iw3g3z0ss6": {
        "name": "Bold",
        "value": "Bold",
      }
    }
  },
  "fontSize": {
    "states": {
      "_hs4rl9bzja": {
        "name": "14",
        "value": 14,
      }
    }
  },
  "lineHeight": {
    "states": {
      "_hxfbvdg4vl": {
        "name": "1",
        "value": 1,
      }
    }
  },
  "opacity": {
    "states": {
      "_v9utdnntp28": {
        "name": "1",
        "value": 1,
      }
    }
  },
  "padding": {
    "states": {
      "_64lj1q81p0m": {
        "name": "10",
        "value": 10,
      }
    }
  },
  "textAlign": {
    "states": {
      "_f45sks7k49": {
        "name": "left",
        "value": "left",
      }
    }
  },

  "_yxf8pjwlhx": {
    "name": "button",

    "children": {

      "_urx7bp2v24i": {
        "borderColor": "#1C85FF",
        "borderRadius": [4, 4, 4, 4],
        "borderWidth": 0,
        "fillColor": "#1C85FF",
        "fillType": "color",
        "height": 32,
        "index": 0,
        "name": "background",
        "opacity": "opacity.states._v9utdnntp28",
        "type": "shape",
        "width": 120,
        "x": 0,
        "y": 0,
      },
      "_o4qrk2kkq4": {
        "fixedWidth": "_yjj4cnrjof",
        "fontFamily": "_mnlmki4s2jr",
        "fontColor": "_wrgze8ypmp",
        "fontSize": "_hs4rl9bzja",
        "fontWeight": "_0iw3g3z0ss6",
        "index": 1,
        "lineHeight": "_hxfbvdg4vl",
        "name": "label",
        "text": "Label",
        "textAlign": "_f45sks7k49",
        "type": "text",
        "x": "_64lj1q81p0m",
        "y": "_64lj1q81p0m",
      }
    },

    "stateTypes": {

      "_r3aqy5bx2qi": {
        "name": "emphasis",

        "states" : {

          "_65ra6yllq4t": {
            "name": "main",
            "children": {
              "_o4qrk2kkq4": {
                "fontColor": "color.states._wrgze8ypmp"
              },
              "_urx7bp2v24i": {
                "fillColor": "#1C85FF"
              }
            }
          },
          "_xsrbhb9dfuj": {
            "name": "secondary",
            "children": {
              "_o4qrk2kkq4": {
                "fontColor": "color.states._hhn8bp16oar"
              },
              "_urx7bp2v24i": {
                "fillColor": "#eeeeee"
              }
            }
          }
        }
      }
    }
  }
}

export default function(context) {

  // Get current document
  const document = sketch.fromNative(context.document)

  // For every system (like "button")
  for (var i_sys in systems) {

    // Continue only if the system is supported
    if (typeof systems[i_sys].name != 'undefined') {

      var system = systems[i_sys]
      var subsystems = system.children
      var stateTypes = system.stateTypes

      // Restart horizontal offset
      var horizontalOffset = 0

      // Create page for system
      var page = context.document.documentData().addBlankPage()
      page.name = system.name

      // For every state type (like "emphasis")
      for (var i_staTyp in stateTypes) {

        stateType = stateTypes[i_staTyp]
        states = stateType.states

        // For every state (like "main")
        for (var i_sta in states) {

          var state = states[i_sta]
          var artboard_name = system.name + "/" + stateType.name + "/" + state.name

          // Create symbol
          var artboard = new SymbolMaster({
            name: artboard_name,
            parent: page,
            "frame": {
              x: horizontalOffset,
              y: 100,
            }
          })

          // For every subsystem
          for (var i_sub in subsystems) {

            var subsystem = subsystems[i_sub]

            // –––––––––––––– TEXT –––––––––––––– //

            switch (subsystem.type) {

              case "text":

                // Get values from JSON
                var subsystem_textAlign =     eval("systems.textAlign.states." + subsystem.textAlign + ".value")
                var subsystem_name =          subsystem.name
                var subsystem_fixedWidth =    eval("systems.fixedWidth.states." + subsystem.fixedWidth + ".value")
                var subsystem_fontFamily =          eval("systems.fontFamily.states." + subsystem.fontFamily + ".value")
                var subsystem_fontColor =     eval("systems.color.states." + subsystem.fontColor + ".value")
                var subsystem_fontSize =      eval("systems.fontSize.states." + subsystem.fontSize + ".value")
                var subsystem_fontWeight =    eval("systems.fontWeight.states." + subsystem.fontWeight + ".value")
                var subsystem_lineHeight =    eval("systems.lineHeight.states." + subsystem.lineHeight + ".value")
                var subsystem_text =          subsystem.text
                var subsystem_x =             eval("systems.padding.states." + subsystem.x + ".value")
                var subsystem_y =             eval("systems.padding.states." + subsystem.y + ".value")
                // var subsystem_fontColor
                // if (subsystem.fontColor == "overriden") {
                //   subsystem_fontColor = "#000000"
                // } else {
                //   subsystem_fontColor = eval("systems" + "." + subsystem.fontColor + "." + "value")
                // }

                var text = new Text({
                  alignment: subsystem_textAlign,
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

                changeTextFont(text, subsystem_fontFamily + " " + subsystem_fontWeight, subsystem_fontSize)

                break

            // –––––––––––––– SHAPE –––––––––––––– //

              case "shape":

                // Get values from JSON
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
                    width: 59,
                    height: 36
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

                break

            }
          }

          artboard.adjustToFit()

          horizontalOffset = horizontalOffset + artboard.frame.width + 20

        }
      }
    }
  }
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
  var id = "_" + Math.random().toString(36).substr(2, 11);
  return id

}
