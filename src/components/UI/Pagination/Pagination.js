import React from 'react';
import classes from './Pagination.module.css';

const Pagination = ( props ) => (
    <div className={classes.Pagination}>
        <a href='#topPage'><button className={classes.Clickable} disabled={props.isPreviousButtonDisabled} onClick={props.handlePreviousPagination}>Previous</button></a>
        <button>{props.current} / {props.total}</button>
        <a href='#topPage'><button className={classes.Clickable} disabled={props.isNextButtonDisabled} onClick={props.handleNextPagination}>Next</button></a>
    </div>
);

export default Pagination;