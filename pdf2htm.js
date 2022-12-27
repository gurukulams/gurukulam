
// 12th_Physics_Vol-1_EM - www.tntextbooks.in.pdf
// 12th_Physics_Vol-1_TM - www.tntextbooks.in.pdf

const pdf2html = require('pdf2html')
const options = { page: 100, }


const debug = require('debug')('pdf2html')
const fs = require('fs')
const exec = require('child_process').exec
const path = require('path')

const constants = {

  VENDOR_PDF_BOX_JAR: 'pdfbox-app-2.0.26.jar',
  VENDOR_TIKA_JAR: 'tika-app-2.4.0.jar',

  DIRECTORY: {
    PDF: path.join(__dirname, './files/pdf/'),
    IMAGE: path.join(__dirname, './files/image/'),
    VENDOR: path.join(__dirname, './node_modules/pdf2html/vendor/')
  }

}
// /Users/thirumuruganmani/projects/explore/gurukulam/node_modules/pdf2html/vendor/pdfbox-app-2.0.26.jar
// pdf2html.html('12th_Physics_Vol-1_TM.pdf',(err, html) => {
//     if (err) {
//         console.error('Conversion error: ' + err)
//     } else {
//         console.log(html)
//     }
// })

const callback = (err, html) => {
        if (err) {
            console.error('Conversion error: ' + err)
        } else {

        fs.writeFile('test2.html', html, err => {
            if (err) {
            console.error(err);
            }
            // file written successfully
        });
            console.log(html)
        }
    }
const commandOption = 'html'
const filePath = "12th_Physics_Vol-1_EM.pdf"
const command = `java -jar "${constants.DIRECTORY.VENDOR + constants.VENDOR_TIKA_JAR}" --${commandOption} "${filePath}"`
  debug(command)
  exec(command, { maxBuffer: 1024 * 2000000 }, callback)