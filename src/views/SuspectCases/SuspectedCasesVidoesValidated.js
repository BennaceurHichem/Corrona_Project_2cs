import React, { Component } from 'react'
import API from '../../api'
import LoadingBar from 'react-top-loading-bar';
import CardSuspectCaseVideo from '../../components/Card/CardSuspectCaseVideo'
import { Typography,Grid } from '@material-ui/core';

export default class    SupsectCasesVideosValidated extends Component {

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
         قائمة الفيديوهات المبلغ عنها المقبولة      
</Typography>

          
    <Grid align="center">
            {    
            this.state.suspectedCases.filter(item=>item.is_treated && item.attachment.nom==="video").map(item=>{
                return (
                  
                    <CardSuspectCaseVideo key={item.id} id={item.id} date={item.date} isTreated={item.is_treated} town={item.town} image={item.attachment.file_url}     />           

            
                    
                    ) 
            } )

 


            }
    </Grid>


            </div>
        )
    }
}
