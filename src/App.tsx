import React, { useState } from 'react';

/**
 * Composant principal de l'application
 */
function App() {
  const [text, setText] = useState("");
  const [inputData, setInputData] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  /**
   * Met à jour le state 'text' à chaque changement de l'input
   * @param e - L'événement de changement
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  /**
   * Soumet les données du formulaire et met à jour le state en conséquence
   */
  const handleSubmit = () => {
    /**
     * Gère la soumission du formulaire en mettant à jour le state en conséquence
     */
    if (editIndex !== null) {
      // Si editIndex n'est pas null, met à jour l'élément existant dans inputData avec la valeur de 'text'
      const updatedData = [...inputData];
      updatedData[editIndex] = text;
      setInputData(updatedData);
      setEditIndex(null);
    } else {
      // Sinon, ajoute la valeur de 'text' à la fin de inputData
      setInputData((prevData) => [...prevData, text]);
    }
    // Réinitialise le champ de texte à une chaîne vide après la soumission
    setText("");
  }

  /**
   * Met à jour le state 'text' et 'editIndex' pour permettre la modification d'un élément existant
   * @param index - L'index de l'élément à éditer
   */
  const handleEdit = (index: number) => {
    setText(inputData[index]);
    setEditIndex(index);
  }

  /**
   * Supprime un élément du state 'inputData'
   * @param index - L'index de l'élément à supprimer
   */
  const handleDelete = (index: number) => {
    const updatedData = inputData.filter((_, i) => i !== index);
    setInputData(updatedData);
    console.log("updatedData", updatedData);
  }

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={handleSubmit}>
        {editIndex !== null ? 'Mettre à jour' : 'Soumettre'}
      </button>
      <ul>
        {inputData.map((item, index) => (
          <div key={index} style={{ display: 'flex', gap: '10px' }}>
            <li>{item}</li>
            <div>
              <button onClick={() => handleEdit(index)}>Modifier</button>
              <button onClick={() => handleDelete(index)}>Supprimer</button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;