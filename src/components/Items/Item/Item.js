import React from 'react';
import classes from './Item.module.css';

const Item = ( props ) => (
    <div onClick={props.handleItemClick.bind(this,props.id)} className={classes.Item}>
        <img src={props.logo?props.logo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Qxdg1ZZOWK9FZqnMQHWO3GD89b6IiE770FX3umhF8HV_vZbc'} alt="logo"/>
      <hr/>
      <p>{props.name}</p>
    </div>
);

export default Item;