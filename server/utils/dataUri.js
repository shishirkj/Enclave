import dataUriParser from 'datauri/parser.js'
import path from 'path'


// data--> avatar: {
//     name: 'profile_pic.png',
//     data: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 01 2c 00 00 00 a8 08 02 00 00 00 d5 49 44 58 00 00 00 20 63 48 52 4d 00 00 7a 26 00 00 80 84 00 ... 19996 more bytes>,
//     size: 20046,
//     encoding: '7bit',
//     tempFilePath: '',
//     truncated: false,
//     mimetype: 'image/png',
//     md5: '572bf1bbfa7b13dfd753c89576c6247e',
//     mv: [Function: mv]
//   }
// }

const dataUri=(file)=>{
    
    const parser = new dataUriParser();
     
    const extname  = path.extname(file.avatar.name).toString();
    
    return parser.format(extname,file.avatar.data)

}


export default dataUri