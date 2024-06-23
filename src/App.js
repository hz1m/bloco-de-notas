import React, { useEffect, useState } from "react";
import axios from "axios";
import api from './services/api';

import './app.css';
import './global.css';
import './sidebar.css';
import './main.css';

import Notes from './components/notes/index';
import ColorRadioButtons from "./components/notes/radioButton";

function App() {
  const [selectedValue, setSelectedValue] = useState('Todos');
  const [notes, setNotes] = useState('');
  const [title, setTitles] = useState('');
  const [allNotes, setAllNotes] = useState([]);

  const getAllNotes = async () => {
    try {
      const response = await api.get('/annotations');
      setAllNotes(response.data);
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  async function loadNotes(option) {
    try {
      let response;
      if (option === 'Todos') {
        response = await api.get('/annotations');
      } else {
        const params = { priority: option === 'Prioridade' };
        response = await api.get('/priorities', { params });
      }
      setAllNotes(response.data);
    } catch (error) {
      console.error('Erro ao carregar notas:', error);
    }
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    loadNotes(event.target.value);
  }

  async function handleChangePriority(id) {
    try {
      const response = await api.post(`/priorities/${id}`);
      if (response.data) {
        getAllNotes();
      } else {
        console.error('Erro ao definir prioridade da nota:', response);
      }
    } catch (error) {
      console.error('Erro ao definir prioridade da nota:', error);
    }
  }
  
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/annotations/${id}`);
      if (response.data) {
        setAllNotes(allNotes.filter(note => note._id !== id));
      } else {
        console.error('Erro ao deletar nota:', response);
      }
    } catch (error) {
      console.error('Erro ao deletar nota:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3333/annotations', {
        title,
        notes,
        priority: false
      });

      console.log('Resposta do servidor:', response.data);

      getAllNotes();
      setTitles('');
      setNotes('');

    } catch (error) {
      console.error('Erro ao salvar nota:', error);
    }
  }

  useEffect(() => {
    function enableSubmitButton() {
      let btn = document.getElementById('btn_submit')
      btn.style.background = '#6dbef5'
      if (title && notes) {
        btn.style.background = '#6dbef5'
      }
    }
    enableSubmitButton()
  }, [title, notes])

  return (
    <div id="App">
      <aside>
        <strong>Caderno de Notas</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="title">Título da Anotação</label>
            <input
              required
              value={title}
              onChange={(e) => setTitles(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="nota">Anotações</label>
            <textarea
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button id="btn_submit" type="submit">Salvar</button>
        </form>
        <ColorRadioButtons
          selectedValue={selectedValue}
          handleChange={handleChange}
        />
      </aside>
      <main>
        <ul>
          {allNotes.map(data => (
            <Notes
              key={data.id}
              data={data}
              handleDelete={handleDelete}
              handleChangePriority={handleChangePriority}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
