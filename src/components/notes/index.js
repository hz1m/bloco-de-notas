import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import './styles.css';
import './styles-priority.css';
import api from '../../services/api';

function Notes({ data, handleDelete, handleChangePriority }) {
  const [changedNote, setChangedNote] = useState(data.notes); 
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit(e, priority) {
    e.style.cursor = 'text';
    e.style.borderRadius = '5px';

    if (priority) {
      e.style.boxShadow = '0 0 5px white';
    } else {
      e.style.boxShadow = '0 0 5px gray';
    }

    setIsEditing(true); 
  }

  async function handleSave(e, originalNotes) {
    e.style.cursor = 'default';
    e.style.boxShadow = 'none';

    try {
      const updatedNotes = e.value; 

      if (updatedNotes !== originalNotes) {
        await api.post(`/contents/${data._id}`, {
          notes: updatedNotes,
        });
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar notas:', error);
    }
  }

  return (
    <main>
      <ul>
        <li className={data.priority ? "notepad-infos-priority" : "notepad-infos"}>
          <div>
            <strong>{data.title}</strong>
            <div>
              <FaTrash onClick={() => handleDelete(data._id)} />
            </div>
          </div>
          <textarea
            defaultValue={data.notes}
            onClick={e => handleEdit(e.target, data.priority)}
            onChange={e => setChangedNote(e.target.value)}
            onBlur={e => isEditing && handleSave(e.target, data.notes)}
          ></textarea>
          <span>
            <AiOutlineExclamationCircle size="20" onClick={() => handleChangePriority(data._id)} />
          </span>
        </li>
      </ul>
    </main>
  );
}

export default Notes;
