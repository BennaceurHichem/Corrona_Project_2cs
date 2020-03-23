/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import ReactHtmlParser from 'react-html-parser'


import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


class Editor extends React.Component{


  constructor(props) {
    super(props);

    // Must initialize state first
    this.state = { 
      value: '',
      parsedValue:'' };
  }

  render(){



      return(
        <div className="App">
    <h2>Espace Rèdaction d'articles </h2>
    <CKEditor
      editor={ClassicEditor}
      data="<p>Hello from CKEditor 5!</p>"
      onInit={editor => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        this.setState({
          value:data,
          parsedValue:ReactHtmlParser(data)
        }) 
        console.log({ event, editor, data });
        console.log("data used is :" + data);
      }}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
    />
  
    <div>
      <h1>Displayed Text :</h1>
      {this.state.parsedValue}
    </div>
  </div>

      );

  }
  



}



export default Editor ;