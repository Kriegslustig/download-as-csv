// source: https://gist.github.com/stubbetje/229984

const base64 = {
  characters:
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

  encode: function(string) {
    let result = ''

    let i = 0
    do {
      let a = string.charCodeAt(i++)
      let b = string.charCodeAt(i++)
      let c = string.charCodeAt(i++)

      a = a ? a : 0
      b = b ? b : 0
      c = c ? c : 0

      let b1 = (a >> 2) & 0x3f
      let b2 = ((a & 0x3) << 4) | ((b >> 4) & 0xf)
      let b3 = ((b & 0xf) << 2) | ((c >> 6) & 0x3)
      let b4 = c & 0x3f

      if (!b) {
        b3 = b4 = 64
      } else if (!c) {
        b4 = 64
      }

      result +=
        base64.characters.charAt(b1) +
        base64.characters.charAt(b2) +
        base64.characters.charAt(b3) +
        base64.characters.charAt(b4);
    } while (i < string.length)

    return result
  }
}

export default base64
