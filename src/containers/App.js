import React, { Component } from 'react';
import axios from 'axios';

import Items from '../components/Items/Items';
import Header from '../components/Header/Header';
import ItemPreview from '../components/Items/ItemPreview/ItemPreview';
import Modal from '../components/UI/Modal/Modal';
import Pagination from '../components/UI/Pagination/Pagination';

import classes from './App.module.css';

class App extends Component {
  state = {
    endPoint:"https://api.renmark.ir/companies",
    previousPageEndpoint:null,
    nextPageEndpoint:null,
    currentPage:null,
    error:null, 
    isLoaded: false,
    data: [],
    totalPages:null,
    showModal:false,
    statePreviewId:null,
    preview:false
  };

  componentDidMount() {
    this.handlePagination(this.state.endPoint)
  }

  //Recieves the endpoint as parameter and update the state
  handlePagination =  (endPoint) => {
    axios.get(endPoint)
      .then(response => {
        const { total_pages, current_page, links } = response.data.meta.pagination;
        this.setState({data:response.data,
            isLoaded:true,
            currentPage:current_page,
            nextPageEndpoint:links.next,
            previousPageEndpoint:links.previous,
            totalPages:total_pages})
      })
      .catch(error => {
        this.setState({error:error})
      })
  }

  //Update the endpoint and Fetch Data
  handleNextPagination =  () => {
    const {nextPageEndpoint} = this.state;
    this.setState({endPoint:nextPageEndpoint})
    this.handlePagination(nextPageEndpoint);
  }

  //Update the state and fetch Data
  handlePreviousPagination =  () => {
    const {previousPageEndpoint} = this.state;
    this.setState({endPoint:previousPageEndpoint})
    this.handlePagination(previousPageEndpoint);
  }

  //Show the preview Modal 
  showModal = (id) => {
    this.setState({showModal:true})
    this.setState({previewId:id})
    this.setState({preview:true})
  }

  //Hide the preview modal by clicking on the backdrop
  hideModal = () => {
    this.setState({showModal:false,preview:false})
  }


  
  render() {
    const { preview,previewId,showModal,error, isLoaded, data:{data},totalPages, currentPage } = this.state; //All the states we need in the render
    const isNextButtonDisabled = currentPage === totalPages; //Disable Next Button
    const isPreviousButtonDisabled = currentPage === 1; //Disable Previous Button
    let itemPreview = null; //For rendering the ItemPreview Component with the ID
    if (preview) { //If true return the Component else return nothing
      itemPreview = <ItemPreview id={previewId} />
    } else itemPreview = null;
       return(
      <div className={classes.App}>
        <Modal 
          hide ={this.hideModal}
          show={showModal}>
            {itemPreview}
        </Modal>                
        <Header />
        <Pagination  
          isPreviousButtonDisabled={isPreviousButtonDisabled}
          isNextButtonDisabled={isNextButtonDisabled}
          handleNextPagination={this.handleNextPagination}
          handlePreviousPagination={this.handlePreviousPagination}
          current={currentPage}
          total={totalPages}/>
        <Items 
          previewItem={this.showModal} 
          error={error} 
          loaded={isLoaded} 
          data={data} />
        <Pagination isPreviousButtonDisabled={isPreviousButtonDisabled}
          isNextButtonDisabled={isNextButtonDisabled}
          handleNextPagination={this.handleNextPagination}
          handlePreviousPagination={this.handlePreviousPagination}
          current={currentPage}
          total={totalPages}/>
      </div>
      );
  }
}

export default App;
