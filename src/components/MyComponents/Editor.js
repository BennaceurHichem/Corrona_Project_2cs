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

class Editor extends React.Component{


  constructor(props) {
    super(props);

    // Must initialize state first
    this.state = { 
      value: '',
      parsedValue:'' ,
    title:'',
    attachment:null,
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
      const attachment  =  e.target.files[0];
  
      this.setState({

        attachment: attachment
      });
  }
  handleSubmit = (e)=>{

    var publication_date  = new  Date().toISOString().slice(0, 19).replace('T', ' ');

    this.setState({
      publication_date
    })

    /*
 "attachment": {
            "id": 1,
            "nom": "test",
            "extension": "image",
            "file": "https://corona-watch-api.herokuapp.com/uploads/62422326_1424531601033075_6778511987220414464_o.jpg",
            "date": "2020-05-03T00:20:16.906879Z"
        },

    */
  /*  "id": 1,
      "nom": this.state.attachment? this.state.attachment.name: "image",
      "extension": "image",
      "file": `https://corona-watch-api.herokuapp.com/uploads/${ this.state.attachment? this.state.attachment.name: "image"}`,
      "date": this.state.publication_date*/
    const attachment =  {
      "id": 1,
      "nom": this.state.attachment? this.state.attachment.name: "image",
      "extension": "image",
      "file":"https://corona-watch-api.herokuapp.com/uploads/62422326_1424531601033075_6778511987220414464_o.jpg",
      "date": this.state.publication_date
  
  }
   
    const postedData={
        title: this.state.title,
        content: this.state.value,
        attachment: attachment,
        publication_date:publication_date,
        editor:1




    }
      const fd  =  new FormData();


      fd.append("attachment",attachment)
      fd.append("title",this.state.title)
      fd.append("content",this.state.value)
      fd.append("publication_date",publication_date)
      fd.append("editor",1)

      console.log(fd)
      this.setState({
        result:fd
      })

      const articleURL = 'feeds/articles/'

      API.post(articleURL,
      
        postedData
      ,{
      headers:{
        Authorization:'Basic YWRtaW46YWRtaW4=',
      
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      }
    }).then((res)=>{

      alert("SUCCESS !")
    }).catch((err)=>{


      alert(err)
    })

  }



  render(){



      return(
        <div className="App">
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


    <Button variant="contained" color="primary" onClick={(e)=>this.handleSubmit(e)}>
        Submit article 
        </Button>
  </div>

      );

  }
  



}


export default Editor ;