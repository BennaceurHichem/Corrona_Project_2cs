/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import ReactHtmlParser from 'react-html-parser'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import API from  '../../api';
import Button from '@material-ui/core/Button';
import './editorStyle.css'
import LoadingBar from 'react-top-loading-bar';
//import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import history from '../../history'

class Editor extends React.Component{


  constructor(props) {
    super(props);

    // Must initialize state first
    this.state = { 
      value: '',
      parsedValue:'' ,
    title:'',
    file:null,
    publication_date:null,
    result:null
  
  
  };
  }



  getTitle = (e)=>{

    this.setState({

      title: e.target.value
    })

  }

  fileSelectedListener = (e)=>{
      console.log( e.target.files[0])
      const file  =  e.target.files[0];

      this.setState({

        file: file
      });
  }
  handleSubmit = (e)=>{
    e.preventDefault();
    const token ='YWRtaW46YWRtaW4='

    var publication_date  = new  Date().toISOString().slice(0, 19).replace('T', ' ');

    this.setState({
      publication_date
    })

   const attachment =  {
      
      "nom": this.state.file? this.state.file.name: "image",
      "file":this.state.file,
   
  
  }
   
  //thi is for the attachment only 
  const attachmentFormData = new FormData();
  attachmentFormData.append("nom", this.state.file? this.state.file.name: "image");
  attachmentFormData.append("extension", "image");

  const fd  =  new FormData();

  
 // attachmentFormData.append("file", attachment, attachment.name);
  fd.append("attachment",this.state.file)
  fd.append("title",this.state.title)
  fd.append("content",this.state.value)
  fd.append("editor",1)
  fd.append("attachment.nom", this.state.file.name);
  fd.append("attachment.extension.", "image");
  fd.append("attachment.file", this.state.file, this.state.file.name);
  fd.append("publication_date",publication_date);


    

      console.log(fd)
      this.setState({
        result:fd
      })

      const articleURL = 'feeds/articles/'
   
      this.LoadingBar.continuousStart()
      API.post(articleURL,
      
        fd
      ,{
      headers:{
        Authorization:'Basic '+token,
        Accept: "application/json"
      }
    }).then((res)=>{

      this.LoadingBar.complete()
      alert("لقد تم إؤسال المقال ينجاح")

      history.push('/redacteur/writearticle')
    }).catch((err)=>{


      alert(err+"Verifier la taille de votre image")
    })

  }



  render(){



      return(
        <div className="App">

        <LoadingBar
          height={3}
          color='#f11946'
          onRef={ref => (this.LoadingBar = ref)}
        />

    <h2>Espace Rèdaction d'articles </h2>



    <TextField
          id="standard-full-width"
          label="العنوان"
          style={{ margin: 8 }}
          placeholder="عنوان المقال"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e)=>this.getTitle(e)}
        />


<input onChange={(e)=>this.fileSelectedListener(e)} text="أضف الصورة الرئيسية للمقال" type="file"  />






    <CKEditor
      editor={ClassicEditor}
      data="أكتب مقالك هنا  !"
      
      config={{
        language: {
            // The UI will be English.
            ui: 'ar',

            // But the content will be edited in Arabic.
            content: 'ar'
        }
        
      }}
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
  



    <Button variant="contained" color="primary" onClick={(e)=>this.handleSubmit(e)}>
        Submit article 
        </Button>
  </div>

      );

  }
  



}


export default Editor ;

