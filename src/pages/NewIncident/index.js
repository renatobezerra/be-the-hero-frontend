import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  async function handleNewIncident(e){
    e.preventDefault();
    const ongId = localStorage.getItem('ongId');

    console.log(`OngId: ${ongId}`);

    try{
      let newIncident = {
        title,
        description,
        value
      };

      await api.post('/incidents', newIncident, {
        headers: {
          Authorization: ongId
        }
      });

      alert('Novo caso cadastrado com sucesso !!!');

      history.push('/profile');
    }
    catch(err){
      console.log(err);
      alert(`Ocoreu um erro ao cadastrar novo caso: ${err}`);
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="logo" />
          <h1>Cadastrar Novo Caso</h1>
          <p>
            Descreva o caso detalhadamente, para encontrar um herói para resolver isso
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Titulo do Caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
            />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
            />
          <input
            placeholder="Valor em Reais"
            // value={Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value)}
            value={value}
            onChange={e => setValue(e.target.value)}
            />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
