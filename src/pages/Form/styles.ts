import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;

  display: flex;
  align-items: center;
  flex-direction: column;

  max-width: 700px;
  padding: 10px;

  font-family: 'Archivo Narrow', sans-serif;

  form {
    width: 100%;
    padding: 10px;

    display: flex;
    align-items: center;
    flex-direction: column;

    border: 1px solid lightgrey;
    border-radius: 8px;

    span {
      font-size: 20px;
      color: #5506b0;
    }

    h1 {
      color: grey;
    }
  }
`;
export const AdressGroup = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
`;
