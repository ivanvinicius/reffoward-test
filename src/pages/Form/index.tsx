import React, {useRef, useState, useEffect, useCallback} from 'react';
import { FormHandles } from '@unform/core';
import {Form as Unform} from '@unform/web'

import api from '../../services/api'

import Select from '../../components/Select';

interface ISelectOptions {
  value: string;
  label: string;
}

interface ICitiesData extends ISelectOptions{
  state_id: string;
}

const Form: React.FC = () => {
  const [states, setStates] = useState<ISelectOptions[]>();
  const [cities, setCities] = useState<ISelectOptions[]>();
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    api.get('/states').then(response => {
      setStates(response.data);
    })
  }, [])

  const handleFindCitiesByState = useCallback(async (data: any) => {
    if(!data){
      setCities([])
    }

    const {value: state_id} = data;
    const citiesFormated: ISelectOptions[] = [];
    
    const response = await api.get('/cities', { params: { state_id }});
      
    response.data?.map(({value, label}: ICitiesData) => {
      return citiesFormated.push({value, label});
    })

    setCities(citiesFormated);
  }, [])

  return (
    <>
      <Unform style={{width: '300px'}} ref={formRef} onSubmit={() => console.log('ok')}>
        
        <label htmlFor="state">Estados</label>
        <Select 
          id="state"
          name="state"
          options={states}
          onChange={handleFindCitiesByState}
        />

        <br/>

        <label htmlFor="city">Cidades</label>
        <Select 
          id="city"
          name="city"
          options={cities}
        />
      </Unform>
    </>
  );
}

export default Form;