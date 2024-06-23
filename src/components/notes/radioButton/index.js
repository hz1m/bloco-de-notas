import React from 'react';
import { blue } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import './style.css'; // Importando o arquivo CSS

export default function ColorRadioButtons({ selectedValue, handleChange }) {
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange, // Passando o método handleChange aqui
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div className="radio-group">
      <div className={`radio-button ${selectedValue === 'Todos' ? 'radio-button-checked' : ''}`}>
        <Radio
          {...controlProps('Todos')}
          sx={{
            color: blue[800],
            '&.Mui-checked': {
              color: blue[600],
            },
          }}
        />
        <label>Todos</label>
      </div>
      <div className={`radio-button ${selectedValue === 'Prioridade' ? 'radio-button-checked' : ''}`}>
        <Radio
          {...controlProps('Prioridade')}
          sx={{
            color: blue[800],
            '&.Mui-checked': {
              color: blue[600],
            },
          }}
        />
        <label>Prioridade</label>
      </div>
      <div className={`radio-button ${selectedValue === 'Normal' ? 'radio-button-checked' : ''}`}>
        <Radio
          {...controlProps('Normal')}
          sx={{
            color: blue[800],
            '&.Mui-checked': {
              color: blue[600],
            },
          }}
        />
        <label>Normal</label>
      </div>
    </div>
  );
}
