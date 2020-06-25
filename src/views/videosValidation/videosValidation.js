import React, { Component } from 'react'
import API from '../../api'
import LoadingBar from 'react-top-loading-bar';
import ScrappedVideoCard from '../../components/Card/ScrappedVideoCard'
import { Typography,Grid,Row } from '@material-ui/core';
import PaginationList from 'react-pagination-list';

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

        
          <Grid align="center">
 
          <div style={{display: 'flex', justifyContent: 'center'}}>
                <PaginationList 
                    data={this.state.scrappedVideos.filter(item=>item.is_validated).sort((a, b)=> new Date(b.published_at)-new Date(a.published_at) )}
                    pageSize={3}
                    renderItem={(item, key) => (
                       
                             <ScrappedVideoCard style={{ marginLeft: "auto", marginRight: "auto"}} key={item.id} id={item.id} decription={item.description} videoId={item.video_id}  isValidated={item.is_validated} title={item.title} url={item.video_embed_url}  channel={item.channel_title}   date={item.published_at} />               
                       
 
                             )}
                >

                </PaginationList>
                                
                </div>

          </Grid>
     

     </div>
        )
    }
}


