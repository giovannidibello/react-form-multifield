import { useState } from 'react'
import posts from './assets/data/PostsData';
import './App.css'

//  aggiungo i campi vuoti al form
const initialFormData = {
  titolo: "",
  autore: "",
  contenuto: "",
  categoria: "",
  pubblicato: false,
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
    setPostsList((currentPost) => [...currentPost, { id: currentPost.length === 0 ? 1 : currentPost[currentPost.length - 1].id + 1, ...formData }]);
    setFormData(initialFormData);
  }

  // funzione rimozione post
  const removePost = (id) => {
    const updatedList = postsList.filter((post) => {
      return post.id !== id
    });
    setPostsList(updatedList);
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

        {/* valore disponibilità */}
        <label htmlFor="pubblicato">Disponibile</label>
        <input
          type="checkbox"
          name="pubblicato"
          checked={formData.pubblicato}
          onChange={handleFormData}
          id="pubblicato"
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
            <h5>{post.categoria}</h5>
            <span className='pubblicato'>{post.pubblicato ? "Pubblicato" : "Non ancora pubblicato"}</span>
            <br />
            <button onClick={() => removePost(post.id)}>Cancella Post</button>
          </div >
        ))

      }
    </>
  )
}

export default App
