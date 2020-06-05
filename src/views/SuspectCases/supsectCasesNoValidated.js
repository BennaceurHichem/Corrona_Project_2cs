import React, { Component } from 'react'
import API from '../../api'
import LoadingBar from 'react-top-loading-bar';
import CardSuspectCase from '../../components/Card/CardSuspectCase'
import { Typography,Grid } from '@material-ui/core';

export default class supsectCasesNoValidated extends Component {

    constructor(props)
    {   

        super(props)
        this.state={
            suspectedCases:[],
            success:false
        }


    }

    componentDidMount(){
        const suspectedUrl = '/reports/suspected-cases/'
    
        this.LoadingBar.continuousStart()

        API.get(suspectedUrl,
            {
            headers:{
                          'Accept': 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
            }
          }).then((res)=>{
             this.LoadingBar.complete()
              
              this.setState({
                  suspectedCases:res.data,
                  success:true
              })
              
          }).catch((err)=>{
            alert(err)
          })


    }


    render() {
        return (
            <div>
              <LoadingBar
                                    height={3}
                                    color='#f11946'
                                    onRef={ref => (this.LoadingBar = ref)}
                                />

<Typography gutterBottom variant="h5" component="h2">
         قائمة الحالات المبلغ عنها الغير معالجة      
</Typography>

          
    <Grid align="center">
            {    
            this.state.suspectedCases.filter(item=>!item.is_treated).map(item=>{
                return (
                  
                    <CardSuspectCase key={item.id} id={item.id} date={item.date} isTreated={item.is_treated} town={item.town} image={item.attachment.file_url}     />           

            
                    
                    ) 
            } )

 


            }
    </Grid>


            </div>
        )
    }
}
