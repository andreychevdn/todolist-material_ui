import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export const CheckBox = ({checked}) => {
  return (
   <Checkbox 
   checked={checked}
   style={{cursor: 'default'}} />
  );
}