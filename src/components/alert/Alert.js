import React, {useContext} from 'react';
import {Alert} from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import cls from './Alert.module.css';
import {AlertContext} from '../../context/alert/alertContext';

export const TodoAlert = () => {
  const {alert,hideAlert } = useContext(AlertContext);
  
   return (
    <div className={cls.wrapAlert}>
      <Alert 
        action={
          <Button
          color="inherit"
          size="small"
          onClick={hideAlert}
          >
            UNDO
          </Button>
        }
        variant="filled"
        severity={alert.severity}
      >
        {alert.text}
      </Alert>      
    </div>
  );
}

