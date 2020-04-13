import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [techs, setTechs] = useState("")

  useEffect(() => {
    api.get("repositories").then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title,
      url,
      techs: techs.split(',')
    })
    setRepositories([...repositories, response.data])
    setTitle("")
    setUrl("")
    setTechs("")
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const repoIndex = repositories.findIndex(repo => repo.id === id)
    repositories.splice(repoIndex, 1);
    setRepositories([...repositories])
  }

  return (
    <div>
      <div className="inputs">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}></input>
        <input placeholder="Url" value={url} onChange={e => setUrl(e.target.value)}></input>
        <input placeholder="Techs" value={techs} onChange={e => setTechs(e.target.value)}></input>

        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
      <div className="repo_list">
        <ul className="list_item" data-testid="repository-list">
          {repositories.map(repository =>
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
          </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
