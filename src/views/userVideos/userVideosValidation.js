import React, { Component } from 'react'
import API from '../../api'
import LoadingBar from 'react-top-loading-bar';
import ScrappedVideoCard from '../../components/Card/ScrappedVideoCard'
import UserCardVideo from '../../components/Card/UserCardVideo'

import { Typography,Grid,Row } from '@material-ui/core';
import PaginationList from 'react-pagination-list';

export default class videosValidation extends Component {



    constructor(props)
    {   

        super(props)
        this.state={
            userVideos:[],
            success:false
        }


    }

    componentDidMount(){
        const userVideosUrl = '/feeds/videos/v2'
    
        this.LoadingBar.continuousStart()

        API.get(userVideosUrl,
            {
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
            }
          }).then((res)=>{
             this.LoadingBar.complete()
              
              this.setState({
                  userVideos:res.data,
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
                        قائمة فيديوهات المستخدمين    
                </Typography>

        
          <Grid align="center">
 
          <div style={{display: 'flex', justifyContent: 'center'}}>
                {this.state.userVideos===null && <p>No videos Found</p>}
                <PaginationList 
                    data={this.state.userVideos.filter(item=>!item.is_validated).sort((a, b)=> new Date(b.publication_date)-new Date(a.publication_date) )}
                    pageSize={3}
                    renderItem={(item, key) => (
                       
                             <UserCardVideo style={{ marginLeft: "auto", marginRight: "auto"}} key={item.id} id={item.id} decription={item.description} videoId={item.attachment.id}  isValidated={item.is_validated} isDeleted={item.is_deleted} title={item.title} url={item.attachment.file_url}     date={item.publication_date} />               
                       
 
                             )}
                >

                </PaginationList>
                                
                </div>

          </Grid>
     

     </div>
        )
    }
}


