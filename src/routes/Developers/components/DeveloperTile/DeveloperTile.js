import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { isObject } from 'lodash';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import classes from './DeveloperTile.scss';


export const DeveloperTile = ({ developer, onSelect, onDelete, showDelete }) => (
    <Paper className={classes.container}>
        <div className={classes.top}>
      <span className={classes.name} onClick={() => onSelect(developer)}>
        {developer.name}
      </span>
            {showDelete && onDelete
                ? <IconButton tooltip="delete" onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
                : null}
        </div>
        <span className={classes.owner}>
      {
          isObject(developer.createdBy)
              ? developer.createdBy.displayName
              : developer.createdBy || 'No Owner'
      }
    </span>
    </Paper>
);
DeveloperTile.propTypes = {
    developer: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
};
export default DeveloperTile;