import React, {Component} from 'react';
import axios from 'axios';
import classes from './ItemPreview.module.css';

class ItemPreview extends Component {
    state={
      endPoint:'https://api.renmark.ir/companies/'+this.props.id,
      name:null,
      address:null,
      logo:null,
      website:null,
      overview:null,
      email:null,
      isLoaded:false,
      error:null
    }  

    componentDidMount() {
      this.handleIdEndpoint(this.state.endPoint)
    }
    handleIdEndpoint = (endPointUrl) => {
      axios.get(endPointUrl)
      .then(response => {
        const {name, email, address, logo, overview, website } = response.data.data;
        this.setState({
          endPoint:endPointUrl,
          name:name,
          address:address,
          logo:logo,
          website:website,
          overview:overview,
          email:email,
          isLoaded:true
        })
      })
      .catch(error => {
        this.setState({error:error})
      }) 
    }

    render() {
      let informations=null;
      if(this.state.isLoaded){
        const {name, address, logo, website, overview,email} = this.state;
        informations = 
          <div className={classes.ItemPreview}>
              <img src={logo} alt='logo'/>
              <h1>{name}</h1>
              {address?(<address>{address.street}, {address.suite}, {address.province.code}, {address.postal_code}, {address.country.name}<br/>
                <strong>Phone:</strong> {address.phone} / {address.phone2} <br/>
                <strong>Fax:</strong> {address.fax} <br/>
              </address>):null}
              <p className={classes.Website}><a href={'https://www.'+website}>{website}</a></p>
              <p className={classes.Email}><a href={'mailto:'+email}>{email}</a></p>
              <hr/>
              <p className={classes.Overview}>{overview}</p>
          </div>
        ;
      } else if (this.state.error) { //If there's an error display a message
      informations = <h1 style={{color:"red"}}>Some problem occured loading the content, please try again later</h1>
      }
      else {
        informations = <p>Loading..</p>
      }
      return(
        <>
          {informations}
        </>
      )
    }
}

export default ItemPreview;