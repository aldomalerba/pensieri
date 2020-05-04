
let elPreview = document.getElementById('preview');
const elPickerBackground = document.querySelector('.color-picker-background');
const elPickerText = document.querySelector('.color-picker-text');

const defaultColorText = '#000000';
const defaultColorBackground = '#EDEDED';

const pickrBackground = Pickr.create({
  el: elPickerBackground,
  useAsButton: true,
  theme: 'classic',
  position: 'bottom-end',
  default: defaultColorBackground,
  components: {
      palette: false,
      hue: true,

      interaction: {
          input: true
      }
  }
});

const pickrText = Pickr.create({
    el: elPickerText,
    useAsButton: true,
    theme: 'classic',
    position: 'bottom-start',
    default: defaultColorText,
    components: {
        palette: false,
        hue: true,

        interaction: {
            input: true
        }
    },
    strings: {
      cancel: 'Annulla'
   }
  });

pickrBackground.on('init', instance => {
    elPickerBackground.style.background = defaultColorBackground;
    elPreview.style.backgroundColor = defaultColorBackground;
}).on('change',  (color, instance) => {
    const hexaColor = color.toHEXA().toString();
    elPickerBackground.style.background = hexaColor;
    elPreview.style.backgroundColor = hexaColor;
}).on('changestop',  (instance) => {
    instance.applyColor(false);
}).on('save', (color, instance) => {
    const hexaColor = color.toHEXA().toString();
    const hexaColorText = pickrText.getColor().toHEXA().toString();
    const isLightBackground = isLight(hexaColor);
    const isLightText = isLight(hexaColorText);
    
    if(isLightBackground && isLightText)
        console.log("ATTENZIONE: scritta chiara su sfondo chiaro");
    else if(!isLightBackground && !isLightText)
        console.log("ATTENZIONE: scritta scura su sfondo scuro");
    else console.log("OK!");

});


pickrText.on('init', instance => {
    elPickerText.style.background = defaultColorText;
    elPreview.style.color = defaultColorText;
}).on('change',  (color, instance) => {
    const hexaColor = color.toHEXA().toString();
    elPickerText.style.background = hexaColor;
    elPreview.style.color = hexaColor;
}).on('changestop',  (instance) => {
    instance.applyColor(false);
}).on('save', (color, instance) => {
    const hexaColor = color.toHEXA().toString();
    const hexaColorBackground = pickrBackground.getColor().toHEXA().toString();
    const isLightBackground = isLight(hexaColorBackground);
    const isLightText = isLight(hexaColor);
    
    if(isLightBackground && isLightText)
        console.log("ATTENZIONE: scritta chiara su sfondo chiaro");
    else if(!isLightBackground && !isLightText)
        console.log("ATTENZIONE: scritta scura su sfondo scuro");
    else console.log("OK!");

});


function isLight(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;
    
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        
        r = color[1];
        g = color[2];
        b = color[3];
    } 
    else {
        
        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) 
        return true;   
    else 
        return false;
    
}