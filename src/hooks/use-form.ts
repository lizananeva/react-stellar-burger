import { useState } from 'react';
import { TValues } from '../utils/types';

export const useForm = (inputValues: TValues = {}) => {
    const [values, setValues] = useState(inputValues);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
      const { name, value } = event.target;

      setValues({...values, [name]: value});
    };

    return { values, setValues, onChange };
  }
