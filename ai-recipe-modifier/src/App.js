import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [recipe, setRecipe] = useState('');
  const [modifiedRecipe, setModifiedRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const modifyRecipe = async () => {
    setLoading(true);
    setError('');
    
    if (!recipe.trim()) {
      setError('Please enter a recipe.');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/modify-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipe }),
      });

      const data = await response.json();

      if (response.ok) {
        setModifiedRecipe(data.modifiedRecipe);
      } else {
        setError('Error modifying the recipe.');
      }
    } catch (error) {
      setError('Error connecting to the backend.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>AI Recipe Modifier</h1>
      
      <textarea
        value={recipe}
        onChange={(e) => setRecipe(e.target.value)}
        placeholder="Enter your recipe here"
      />
      
      <button onClick={modifyRecipe} disabled={loading}>
        {loading ? 'Modifying...' : 'Modify Recipe'}
      </button>

      {error && <p className="error-message">{error}</p>}
      
      {modifiedRecipe && (
        <div className="modified-recipe">
          <h2>Modified Recipe:</h2>
          <pre>{modifiedRecipe}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
