import React, { useState, useEffect , useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const emailreducer=(state, action) => {

  if(action.type==='USER_INPUT'){
    return {value:action.val, isValid:action.val.includes('@')}
  }

  if(action.type==='INPUT_BLUR'){
    return {value: state.value, isValid:state.value.includes('@')}
  }

  return {value:'', isValid:false};

}

const passwordreducer= (state, action) => { 
  if(action.type==='USER_INPUT'){
    return {value:action.val, isValid:action.val.trim().length>6}
  }

  if(action.type==='INPUT_BLUR'){
    return  {value:state.value, isValid:state.value.trim().length>6}
  }
  return {value:'', isValid:false};

}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailstate, dispatchemail]=useReducer(emailreducer,{
    value:'',
     isValid:false
    });


    const [passwordstate,dispatchpassword ]= useReducer(passwordreducer,{
       value:'',
       isValid:null,
    });

  // useEffect(() => {
  //   console.log('EFFECT RUNNING');

  //   return () => {
  //     console.log('EFFECT CLEANUP');
  //   };
  // }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);
 
  const {isValid:emailisvalid}= emailstate 
  const {isValid:passwordisvalid}=passwordstate

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailisvalid && passwordisvalid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailstate, passwordstate]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchemail({type:'USER_INPUT', val:event.target.value})

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordstate.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchpassword({type:'USER_INPUT', val:event.target.value})

    // setFormIsValid(
    //   emailstate.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
  dispatchemail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchpassword({type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailstate.value, passwordstate.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailstate.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailstate.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
           passwordstate.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordstate.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
