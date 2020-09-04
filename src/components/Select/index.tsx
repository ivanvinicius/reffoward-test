import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

import { Container } from './styles';
import customStyles from './customStyles';

interface IProps extends SelectProps<OptionTypeBase> {
  name: string;
}

const Select: React.FC<IProps> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        styles={customStyles}
        isSearchable={false}
        isClearable={false}
        classNamePrefix="react-select"
        {...rest}
      />
    </Container>
  );
};

export default Select;
