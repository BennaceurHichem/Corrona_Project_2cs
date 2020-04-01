import React, { Component } from "react";
import GoogleMap from "google-map-react";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import markerImg from "assets/img/marker.png";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
//import Popup from "./Popup";
import TextField from "@material-ui/core/TextField";
import Geocode from "react-geocode";


// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    

class MyMap extends Component {




  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          index: 0,
          nbrecovered: 0,
          nbDeath: 0,
          nbCase: 0,
          nbgueris: 0,
          showPopup: false,
          lat: 36.707694,
          lng: 3.1667,
          position: { lat: 36.707694, lng: 3.1667 }
        }
      ]
    };
   
      this.onClick = this.onClick.bind(this)

  }

  changeState = () => {};

  onClick(obj) {
    const lat = obj.lat;
    const lng = obj.lng;
    console.log("my log :    " + obj.x, obj.y, obj.lat, obj.lng, obj);
    console.log(
      "is exist ?:    " +
        this.state.markers.some(item => lat === item.lat && lng === item.lng)
    );

    this.setState(previousState => {
      return {
        markers: [
          ...previousState.markers,
          {
            lat: lat,
            lng: lng,
            position: { lat, lng },
            nbRecovered: 0,
            nbDeath: 0,
            nbCase: 0,
            nbgueris: 0,
            showPopup: false
          }
        ]
      };
    });
  }

  //the props passed are object of elemnt which contain index,lat,lng so we will pass them directly in this way
  handleMarkerClick = ({ index, lat, lng }) => {
    //log messages
    console.log("marker clicked");
    console.log(
      "context in handeMarkerClicked : index" +
        index +
        "lat: " +
        lat +
        "lng " +
        lng
    );
    //showing the specific form
    //here we will get the specific marker and toggle showPopup value
    //the marker  that has clicked
    const wantedElement = this.state.markers.find(marker => {
      return marker.lat === lat && marker.lng === lng;
    });

    //make changes to dispaly the form
    wantedElement.showPopup = true;

    //push the modified list to the state markers list
    let VList = [];
    VList = [...this.state.markers];
    console.log("the index is : " + VList);
    let Vindex = this.state.markers.findIndex(
      marker => marker.lat === lat && marker.lng === lng
    );
    VList[Vindex] = wantedElement;

    this.setState({
      markers: VList
    });

    console.log("the index is : " + Vindex);
    console.log(
      "wanted element   showpopu variable is : " + wantedElement.showPopup
    );
    /*  this.setState(previousState => {
      const marker  = previousState.markers.find()
      return {
        markers: [
          ...previousState.markers,
          {

            showPopup: true,
          }
        ]
      };
    });
*/
  };

 handleRightClick({ index, lat, lng }){
    console.log(
      "context in handleRightClicked : index" +
        index +
        "lat: " +
        lat +
        "lng " +
        lng
    );

    this.setState(prevState => ({
      markers: prevState.markers.filter(
        marker => !(marker.lat === lat && marker.lng === lng)
      )
    }));
  };

   handlenbCaseChange = param=> e =>{

     console.log("param: "+param)
     console.log("event : "+e)

    /*const wantedElement = this.state.markers.find(marker => {
      return marker.lat === lat && marker.lng === lng;
    });
      console.log("event ::::: "+e)
      console.log("lat ::::: "+lat)
      console.log("lng ::::: "+lng)
    //setting the number of cases
    wantedElement.nbCase = e.target.value;

    //push the modified list to the state markers list
    let VList = [];
    VList = [...this.state.markers];
    console.log("the index is : " + VList);
    let Vindex = this.state.markers.findIndex(
      marker => marker.lat === lat && marker.lng === lng
    );
    VList[Vindex] = wantedElement;

    //push changed list of markers
    this.setState({
      markers: VList
    });
  };
   handlenbDeathChange= (e, lat, lng) => {
    const wantedElement = this.state.markers.find(marker => {
      return marker.lat === lat && marker.lng === lng;
    });

    //setting the number of cases
    wantedElement.nbDeath = e.target.value;

    //push the modified list to the state markers list
    let VList = [];
    VList = [...this.state.markers];
    console.log("the index is : " + VList);
    let Vindex = this.state.markers.findIndex(
      marker => marker.lat === lat && marker.lng === lng
    );
    VList[Vindex] = wantedElement;

    //push changed list of markers
    this.setState({
      markers: VList
    });

    */
  };



  handlenbRecoveredChange = (e, lat, lng) => {
    const wantedElement = this.state.markers.find(marker => {
      return marker.lat === lat && marker.lng === lng;
    });

    //setting the number of cases
    wantedElement.nbrecovered = e.target.value;

    //push the modified list to the state markers list
    let VList = [];
    VList = [...this.state.markers];
    console.log("the index is : " + VList);
    let Vindex = this.state.markers.findIndex(
      marker => marker.lat === lat && marker.lng === lng
    );
    VList[Vindex] = wantedElement;

    //push changed list of markers
    this.setState({
      markers: VList
    });
  };

  handlenbGuerisChange = (e, lat, lng)=> {
    const wantedElement = this.state.markers.find(marker => {
      return marker.lat === lat && marker.lng === lng;
    });

    //setting the number of cases
    wantedElement.nbgueris = e.target.value;

    //push the modified list to the state markers list
    let VList = [];
    VList = [...this.state.markers];
    console.log("the index is : " + VList);
    let Vindex = this.state.markers.findIndex(
      marker => marker.lat === lat && marker.lng === lng
    );
    VList[Vindex] = wantedElement;

    //push changed list of markers
    this.setState({
      markers: VList
    });
  };
  static defaultProps = {
    center: {
      lat: 36.707694,
      lng: 3.1667
    },
    zoom: 11
  };

  render() {
    const handleApiLoaded = (map, maps) => {
      // use map and maps objects
    };

    const Marker = context => {
      console.log("context in Marker" + Object.keys(context));
      return (
        <div>
          <img
            src={markerImg}
            style={{ width: "20px", height: "20px" }}
            onClick={() =>this.handleMarkerClick(context) }
            onContextMenu={() => this.handleRightClick(context)}
          />
        </div>
      );
    };

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "60vh", width: "50%", display: "center" }}>
        <GoogleMap
          bootstrapURLKeys={{ key: "AIzaSyCjJsyCujE0MlzAxsIJGwhKxr2dI6UmJGs" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          onClick={this.onClick}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              lat={marker.position.lat}
              lng={marker.position.lng}
              index={index}
            />
          ))}
        </GoogleMap>

        {this.state.markers.map((marker, index) => {
          return (
            marker.showPopup && (
              <div>
              <form>
                <input
                  margin="dense"
                  id="nbCase"
                  label="Case Number"
               
                  type="number"
                  value={marker.nbCase}
                  onChange={(e)=>this.handlenbCasechange(marker.lat, marker.lng)(e) }
                />
                <TextField
                  margin="dense"
                  id="nbDeath"
             
                  label="Death Numbers"
                  type="number"
                  onChange={(e)=>this.handlenbDeath(e,marker.lat, marker.lng) }
                  fullWidth
                />

                <TextField
                  margin="dense"
                  id="nbrecovered"
                  label="Recovered Number"
                
                  type="number"
                  onChange={(e)=>this.handlenbRecoveredechange(
                    e,
                    marker.lat,
                    marker.lng
                  )}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="nbGueris"
                  label="Gueris Number"
                
                  type="number"
                  onChange={(e)=>this.handlenbRecoveredechange(
                    e,
                    marker.lat,
                    marker.lng
                  )}
                  fullWidth
                />
                </form>
              </div>
            )
          );
        })}
      </div>
    );
  }
}

export default MyMap;
