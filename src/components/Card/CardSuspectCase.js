import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import wilayas from "../../wilayas_api.json";
import API from '../../api'
import Box from "@material-ui/core/Box";
import emailjs from 'emailjs-com';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    marginTop:20,
    marginBottom:20,

  },
  btn:{
      textAlign:"center",
      margin:"auto",

      
  }
});

export default function CardSuspectCase(props) {

    const [showButtons, setShowButtons] = React.useState(true)

    /*

Convert wilaya id(code) to the specific srting 

*/
  const getWilayaStringFromId = (id)=>{
   
    return wilayas.filter(i=>i.code===id)[0].name
  }

  const  sendEmail = (e)=> {
    e.preventDefault();

    emailjs.sendForm('corrona_watch', 'template_tsJRJGAm', e.target, 'user_ZhRyO8iRI7txG0nQXJQFE')
      .then((result) => {
          console.log(result.text);
          alert("لقد تم إرسال الإيمايل بنجاح")
      }, (error) => {
          console.log(error.text);
          
          alert("ERROR")
      });
  }

  const classes = useStyles();

  const handleCaseValidation = (e)=>{
      const caseUrl = `/reports/suspected-cases/treat/${props.id}`

      const data ={
        id:props.id,
        is_treated:true
    
      }
      API.patch(caseUrl,
     
        data
      ,{
      headers:{
      
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      }
     }).then(res=>{
       setShowButtons(false)
       alert(" تم تأكيد الحالة بنجاح")
     
     }).catch(err=>{
     alert("ERROR WHILE UPDATING ARTICLE ! "+err)
     setShowButtons(false)
     })
         


  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
      <img
          width="100%"
          height="100%"
          src={
            props.image ?props.image:null
          }
          title="Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          Daira: { getWilayaStringFromId(props.town)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          
                {!props.isTreated &&showButtons ? "الحالة لم يتم تأكيدها بعد":"حالة تم تأكيدها"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Box justify-content="center" margin="auto">

      {!props.isTreated &&showButtons&& 
        <form className="contact-form" onSubmit={(e)=>sendEmail(e)}>
            <Button type="submit" size="large" color="primary" className={classes.btn} onClick={e=>handleCaseValidation(e)}>
                تأكيد الحالة ✅
            </Button>
            </form>
          
     }
      
    </Box>
      
      
      
      </CardActions>
    </Card>
  );
}