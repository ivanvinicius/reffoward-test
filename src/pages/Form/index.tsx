import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form as Unform } from '@unform/web';

import api from '../../services/api';
import Select from '../../components/Select';

import { Container, AdressGroup } from './styles';

interface ISelectOptions {
  value: string;
  label: string;
}

interface ICitiesData extends ISelectOptions {
  state_id: string;
}

const Form: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [states, setStates] = useState<ISelectOptions[]>();
  const [cities, setCities] = useState<ISelectOptions[]>();

  useEffect(() => {
    api.get('/states').then((response) => {
      setStates(response.data);
    });
  }, []);

  const handleFindCitiesByState = useCallback(async (data: any) => {
    const selectRef = formRef.current?.getFieldRef('city');

    selectRef.select.clearValue();

    if (!data) {
      setCities([]);
    }

    const { value: state_id } = data;
    const citiesFormated: ISelectOptions[] = [];

    const response = await api.get('/cities', { params: { state_id } });

    response.data?.map(({ value, label }: ICitiesData) => {
      return citiesFormated.push({ value, label });
    });

    setCities(citiesFormated);
  }, []);

  return (
    <Container>
      <Unform ref={formRef} onSubmit={() => '1'}>
        <h1>Formulário de Endereço</h1>

        <AdressGroup>
          <Select
            name="state"
            placeholder="Estado"
            options={states}
            onChange={handleFindCitiesByState}
            noOptionsMessage={() => 'Sem registros.'}
          />

          <Select
            name="city"
            placeholder="Cidade"
            noOptionsMessage={() => 'Antes selecione o UF'}
            options={cities}
          />
        </AdressGroup>
      </Unform>
    </Container>
  );
};

export default Form;
