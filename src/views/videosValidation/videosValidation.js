import React, { Component } from 'react'
import API from '../../api'
import LoadingBar from 'react-top-loading-bar';
import ScrappedVideoCard from '../../components/Card/ScrappedVideoCard'
import { Typography } from '@material-ui/core';

export default class videosValidation extends Component {



    constructor(props)
    {   

        super(props)
        this.state={
            scrappedVideos:[],
            success:false
        }


    }

    componentDidMount(){
        const suspectedUrl = '/scrapers/youtube/'
    
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
                  scrappedVideos:res.data,
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

<Typography  variant="h3" component="h2">
        قائمة فيديوهات اليوتوب المتعلقة بكورونا    
</Typography>

        
          <center>
          {    
          this.state.scrappedVideos.filter(item=>!item.is_validated).slice(0,5).sort((a, b)=> new Date(b.published_at)-new Date(a.published_at) ).map(item=>{
              return (
                
                  <ScrappedVideoCard key={item.id} id={item.id} decription={item.description} videoId={item.video_id}  isValidated={item.is_validated} title={item.title} url={item.video_embed_url}  channel={item.channel_title}   date={item.published_at} />           

          
                  
                  ) 
          } )




          }
          </center>


          </div>
     
        )
    }
}
