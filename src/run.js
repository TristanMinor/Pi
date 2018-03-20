const sketch = require('sketch')
var Artboard = require('sketch/dom').Artboard
var Group = require('sketch/dom').Group
var Rectangle = require('sketch/dom').Rectangle
var Shape = require('sketch/dom').Shape
var Style = require('sketch/dom').Style
var Text = require('sketch/dom').Text
var SymbolMaster = require('sketch/dom').SymbolMaster

export default function(context) {

  // Get current document
  const document = sketch.fromNative(context.document)

  // Get selected page and rename it
  const page = document.selectedPage
  page.name = "Page"

  // Reset everything
  page.layers = {}

  // Create artboard
  var artboard = new Artboard({
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

  // Change label font color
  changeTextColor(label, 1, 1, 1, 1)

  // Change font and size
  changeTextFont(label, 'SF Pro Text', 24)

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

  // Put background behind label
  background.moveBackward()

  // Adjust artboard to content
  artboard.adjustToFit()

  // Change artboard to symbol
  var master = SymbolMaster.fromArtboard(artboard)

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
