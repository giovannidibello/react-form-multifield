import { useState } from 'react'
import posts from './assets/data/PostsData';
import './App.css'

//  aggiungo i campi vuoti al form
const initialFormData = {
  titolo: "",
  autore: "",
  contenuto: "",
  categoria: "",
};

function App() {

  const [postsList, setPostsList] = useState(posts);
  const [formData, setFormData] = useState(initialFormData);

  // funzione di gestione delle info dei campi
  function handleFormData(e) {

    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    // setto tramite lo stato l'oggetto con le info prese dai campi del form
    setFormData((currentFormData) => ({
      ...currentFormData,
      [e.target.name]: value,
    }));
  }

  // funzione di gestione dell'invio del form
  function handleSubmit(e) {
    e.preventDefault();
    setPostsList((currentPost) => [...currentPost, { id: currentPost[currentPost.length - 1].id + 1, ...formData }]);
    setFormData(initialFormData);
  }


  return (
    <>

      <form id='formpost' onSubmit={handleSubmit}>
        {/* valore titolo post */}
        <input
          type="text"
          name="titolo"
          onChange={handleFormData}
          value={formData.titolo}
          placeholder='Titolo Post'
        />

        {/* valore autore */}
        <input
          type="text"
          name="autore"
          onChange={handleFormData}
          value={formData.autore}
          placeholder='Autore Post'
        />

        {/* valore contenuto */}
        <textarea
          name="contenuto"
          onChange={handleFormData}
          value={formData.contenuto}
          placeholder='Contenuto Post'
        ></textarea>

        {/* valore categoria */}
        <input
          type="text"
          name="categoria"
          onChange={handleFormData}
          value={formData.categoria}
          placeholder='Categoria Post'
        />

        {/* bottone di invio info */}
        <button>Aggiungi</button>
      </form>


      {
        postsList.map((post) => (
          <div className='postItem' key={post.id}>
            <h2>{post.titolo}</h2>
            <h4>{post.autore}</h4>
            <p>{post.contenuto}</p>
            <span>{post.categoria}</span>
          </div>
        ))

      }
    </>
  )
}

export default App
