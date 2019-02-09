import React from 'react';
import Item from './Item/Item';
import classes from './Items.module.css';

//Load List of Items 
const Items = (props) => {
  let listOfCompanies;
    if(props.loaded) { //If Loaded display the list of companies    
         listOfCompanies = props.data.map(item => {
          return <Item handleItemClick={props.previewItem} key={item.id} name={item.name} logo={item.logo} id ={item.id}/>
        })
      } else if (props.error) { //If there's an error display a message
          listOfCompanies = <h1 style={{color:"red"}}>Some problem occured loading the content, please try again later</h1>
      } 
       else { //If loading display loading 
        listOfCompanies = <h1>Loading...</h1>
      } 

    return(
        <div className={classes.Items}>
            {listOfCompanies}
        </div>
    )
};

export default Items;