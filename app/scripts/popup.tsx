// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

let ReactDOM = require("react-dom");
import * as React from 'react'


import Popup from '../component/popup'

console.log("Ok")
let e = window.document.getElementById("main")
ReactDOM.render(<Popup></Popup>, e)
