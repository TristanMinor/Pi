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

var Combinatorics = require('../node_modules/combinatorics');

// log(generateUniqueId())

var stateTypes = {
    "size": {
      "s1": "small",
      "s2": "medium",
      "s3": "large",
    },
    "color": {
      "c1": "black",
      "c2": "white",
    },
    "shape": {
      "h1": "cube",
      "h2": "ball",
      "h3": "cone",
    },
}

var array_stateTypes = Object.values(stateTypes)
var n_stateTypes = array_stateTypes.length
var n_combinations = get_n_combinations(array_stateTypes)
var combinations = {}

// Iterate over all combinations and add empty slots
for (var j = 0; j < n_combinations; j++) {
  combinations[j] = []
}

var n_switchState = 1

// For every state type
for (var i = 0; i < n_stateTypes; i++) {

  // Get the state type as array
  var array_stateType = Object.values(array_stateTypes[i])
  // Get the number of states for the current state type
  var n_states = array_stateType.length
  // Get the number of how many times this state is the combinations
  var n_state_in_combinations = n_combinations / n_states
  // Get the number of how many times switch the state
  var n_switchState = n_combinations / n_state_in_combinations

  // Iterate over all combinations and add data for every state of this state type
  var j_state = 0
  for (var j = 0; j < n_combinations; j++) {

    // Add this state to the array of combinations
    var stateToAdd = array_stateType[j_state]
    combinations[j].push(stateToAdd)

    // On to the next state
    if ((j+1) % n_state_in_combinations == 0) {
      j_state++
    }
  }
}


log(combinations)

// for (size in traits.size) {
//     for (color in traits.color) {
//       for (shape in traits.color) {
//         // log(traits.size[size] + " " + traits.color[color] + " " + traits.shape[shape])
//       }
//     }
// }

// ------------

var systems = {
  "borderRadius": {
    "states": {
      "_u2twcd8y0vs": {
        "name": "4",
        "value": [4, 4, 4, 4],
      }
    }
  },
  "borderWidth": {
    "states": {
      "_nvb3t9etnnr": {
        "name": "0",
        "value": 0,
      }
    }
  },
  "color": {
    "states": {
      "_wrgze8ypmp": {
        "name": "white",
        "value": "#ffffff",
        "owners": {
          "system": "_yxf8pjwlhx",
          "subsystem": "_o4qrk2kkq4",
          "stateType": "_r3aqy5bx2qi",
          "state": "_65ra6yllq4t",
        }
      },
      "_hhn8bp16oar": {
        "name": "black",
        "value": "#000000",
      },
      "_ggghpez789b": {
        "name": "blue",
        "value": "#1C85FF",
      },
      "_oxap8ky9s3": {
        "name": "light grey",
        "value": "#efefef",
      }
    }
  },
  "fillType": {
    "states": {
      "_8n1pvddmohv": {
        "name": "color",
        "value": "color",
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
  "index": {
    "states": {
      "_i388bzi9bus": {
        "name": "0",
        "value": 0,
      },
      "_ehbc265ei6h": {
        "name": "0",
        "value": 1,
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
  "number": {
    "states": {
      "_j8519wryluc": {
        "name": "36",
        "value": 36,
      },
      "_wr9lnhfd56s": {
        "name": "67",
        "value": 67,
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
      "_u4o743q5ra": {
        "name": "0",
        "value": 0,
      },
      "_64lj1q81p0m": {
        "name": "10",
        "value": 10,
      },
      "_eocjp4bk5v": {
        "name": "14",
        "value": 14,
      }
    }
  },
  "string": {
    "states": {
      "_e17sqyqwz9l": {
        "name": "Label",
        "value": "Label",
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
        "borderColor": "_ggghpez789b",
        "borderFillType": "_8n1pvddmohv",
        "borderRadius": "_u2twcd8y0vs",
        "borderWidth": "_nvb3t9etnnr",
        "fillColor": "_ggghpez789b",
        "fillFillType": "_8n1pvddmohv",
        "height": "_j8519wryluc",
        "name": "background",
        "opacity": "_v9utdnntp28",
        "type": "shape",
        "width": "_wr9lnhfd56s",
        "x": "_u4o743q5ra",
        "y": "_u4o743q5ra",
      },
      "_o4qrk2kkq4": {
        "fixedWidth": "_yjj4cnrjof",
        "fontFamily": "_mnlmki4s2jr",
        "fontSize": "_hs4rl9bzja",
        "fontWeight": "_0iw3g3z0ss6",
        "index": "_ehbc265ei6h",
        "lineHeight": "_hxfbvdg4vl",
        "name": "label",
        "opacity": "_v9utdnntp28",
        "text": "_e17sqyqwz9l",
        "textAlign": "_f45sks7k49",
        "type": "text",
        "x": "_eocjp4bk5v",
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
                "fontColor": "_wrgze8ypmp",
              },
              "_urx7bp2v24i": {
                "fillColor": "_ggghpez789b"
              }
            }
          },
          "_xsrbhb9dfuj": {
            "name": "secondary",
            "children": {
              "_o4qrk2kkq4": {
                "fontColor": "_hhn8bp16oar",
              },
              "_urx7bp2v24i": {
                "fillColor": "_oxap8ky9s3"
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
          var artboard_name = system.name + "/" + state.name

          // Create symbol
          var artboard = new SymbolMaster({
            name: artboard_name,
            parent: page,
            "frame": {
              x: horizontalOffset,
              y: 0,
            }
          })

          // For every subsystem
          for (var id_subsystem in subsystems) {

            var subsystem = subsystems[id_subsystem]

            // –––––––––––––– TEXT –––––––––––––– //

            switch (subsystem.type) {

              case "text":

                // Get values from JSON

                // Get missing parameters
                var missingParameters = state.children[id_subsystem]

                // Add missing parameters from state
                for (missingKey in missingParameters) {
                  var missingValue = missingParameters[missingKey]
                  subsystem[missingKey] = missingValue
                }

                // Find values in JSON
                var subsystem_name =          subsystem.name
                var subsystem_fixedWidth =    eval("systems.fixedWidth.states." + subsystem.fixedWidth + ".value")
                var subsystem_fontFamily =    eval("systems.fontFamily.states." + subsystem.fontFamily + ".value")
                var subsystem_fontColor =     eval("systems.color.states." + subsystem.fontColor + ".value")
                var subsystem_fontSize =      eval("systems.fontSize.states." + subsystem.fontSize + ".value")
                var subsystem_fontWeight =    eval("systems.fontWeight.states." + subsystem.fontWeight + ".value")
                var subsystem_index =         eval("systems.index.states." + subsystem.index + ".value")
                var subsystem_lineHeight =    eval("systems.lineHeight.states." + subsystem.lineHeight + ".value")
                var subsystem_opacity =       eval("systems.opacity.states." + subsystem.opacity + ".value")
                var subsystem_text =          eval("systems.string.states." + subsystem.text + ".value")
                var subsystem_textAlign =     eval("systems.textAlign.states." + subsystem.textAlign + ".value")
                var subsystem_x =             eval("systems.padding.states." + subsystem.x + ".value")
                var subsystem_y =             eval("systems.padding.states." + subsystem.y + ".value")

                // Create text object
                var text = new Text({
                  alignment: subsystem_textAlign,
                  fixedWidth: subsystem_fixedWidth,
                  frame: {
                    x: subsystem_x,
                    y: subsystem_y
                  },
                  name: subsystem_name,
                  parent: artboard,
                  text: subsystem_text,
                })

                // Convert text color form HEX to HSL
                var hsl = hexToHSL(subsystem_fontColor)
                var h = hsl["h"]
                var s = hsl["s"]
                var l = hsl["l"]

                // Change text color
                changeTextColor(text, h, s, l, subsystem_opacity)

                // Change font family, weight and size
                changeTextFont(text, subsystem_fontFamily + " " + subsystem_fontWeight, subsystem_fontSize)

                break

              // –––––––––––––– SHAPE –––––––––––––– //

              case "shape":

                // Get values from JSON

                // Get missing parameters
                var missingParameters = state.children[id_subsystem]

                // Add missing default state parameters from state parameters to subsystem
                for (missingKey in missingParameters) {
                  var missingValue = missingParameters[missingKey]
                  subsystem[missingKey] = missingValue
                }

                // Get values from JSON
                var subsystem_name = subsystem.name
                var subsystem_borderColor =     eval("systems.color.states." + subsystem.borderColor + ".value")
                var subsystem_borderFillType =  eval("systems.fillType.states." + subsystem.borderFillType + ".value")
                var subsystem_borderRadius =    eval("systems.borderRadius.states." + subsystem.borderRadius + ".value")
                var subsystem_borderWidth =     eval("systems.borderWidth.states." + subsystem.borderWidth + ".value").toString()
                var subsystem_fillColor =       eval("systems.color.states." + subsystem.fillColor + ".value")
                var subsystem_fillFillType =    eval("systems.fillType.states." + subsystem.fillFillType + ".value")
                var subsystem_height =          eval("systems.number.states." + subsystem.height + ".value")
                var subsystem_width =           eval("systems.number.states." + subsystem.width + ".value")
                var subsystem_x =               eval("systems.padding.states." + subsystem.x + ".value")
                var subsystem_y =               eval("systems.padding.states." + subsystem.y + ".value")

                // Convert fill types from strings to some object Sketch needs
                subsystem_borderFillType =      eval("Style.FillType." + subsystem_borderFillType)
                subsystem_fillFillType =        eval("Style.FillType." + subsystem_fillFillType)

                var shape = new Shape({
                  frame: {
                    x: subsystem_x,
                    y: subsystem_y,
                    width: subsystem_width,
                    height: subsystem_height
                  },
                  name: subsystem_name,
                  parent: artboard,
                  style: {
                    borders: [{
                      color: subsystem_borderColor,
                      fillType: subsystem_borderFillType,
                      thickness: subsystem_borderWidth
                    }],
                    fills: [{
                      color: subsystem_fillColor,
                      fillType: subsystem_fillFillType,
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

function hexToHSL(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    r = parseInt(result[1], 16);
    g = parseInt(result[2], 16);
    b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if(max == min){
      h = s = 0; // achromatic
    }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
  var HSL = new Object();
  HSL['h']=h;
  HSL['s']=s;
  HSL['l']=l;
  return HSL;
}

function get_n_combinations(array){

    // The default number of combinations is 1 so it can be multiplied (if it was 0 it would always be 0)
    n_combinations = 1

    // Multiply the numbers of options in every child of the array
    for (i = 0; i < array.length; i++) {
       n_combinations *= Object.keys(array[i]).length
    }

    return n_combinations
}
