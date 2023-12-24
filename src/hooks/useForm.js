import { useState } from 'react';
import { deepClone, isObjectEmpty } from '../utils/object-utils';

/**
 *
 * create form using this useForm hook easily
 * @typedef {Object} Param
 * @property {Object} init
 * @property {(Object/boolean)} validate
 * @param {init} init
 * @returns
 */

const useForm = ({ init, validate }) => {
  const [state, setState] = useState(mapValuesToState(init));

  const handleChange = (e) => {
    const { name: key, value } = e.target;

    const oldState = deepClone(state);
    oldState[key].value = value;

    const { errors } = getErrors();

    if (oldState[key].focus && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = '';
    }
    setState(oldState);
  };

  const handleFocus = (e) => {
    const { name: key } = e.target;
    const oldState = deepClone(state);
    oldState[key].focused = true;

    if (!oldState[key].touched) {
      oldState[key].touched = true;
    }

    setState(oldState);
  };

  const handleBlur = (e) => {
    const { name: key } = e.target;

    const {errors} = getErrors()

    const oldState = deepClone(state);

    if (oldState[key].touched && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = '';
    }

    oldState[key].focused = false;

    setState(oldState);
  };


  
  const handleSubmit = (e, cb) => {
    e.preventDefault();
    const {hasError, errors, values} = getErrors()

    cb({
        hasError,
        errors,
        values,
        touched: mapStateToKeys(state, 'touched'),
        focused: mapStateToKeys(state, 'focused'),

    })
        
  };

  const getErrors = ()=>{
    let hasError = null,
      errors = false;
    const values = mapStateToKeys(state, 'value');
    if (typeof validate === 'boolean') {
      hasError = validate;
      errors: mapStateToKeys(state, 'error');
    } else if (typeof validate === 'function') {
      const errorsFromCB  = validate(values);
        hasError = !isObjectEmpty(errorsFromCB);
      errors = errorsFromCB
    } else {
      throw new Error('validate property must be boolean or function');
    }
    return{
        hasError,
        values,
        errors
    }
  }

  const reset = ()=>{
    const newState = mapValuesToState(init, true);
    setState(newState)
  }

  return {
    formState: state,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit,
    reset
  };
};

export default useForm;

//helper function

const mapValuesToState = (values, reset=false) => {
  return Object.keys(values).reduce((acc, key) => {
    acc[key] = {
      value: reset? '' : values[key],
      error: '',
      focused: false,
      touched: false,
    };
    return acc;
  }, {});
};



const mapStateToKeys = (state, key) => {
  return Object.keys(state).reduce((acc, cur) => {
    acc[cur] = state[cur][key];
    return acc;
  }, {});
};
