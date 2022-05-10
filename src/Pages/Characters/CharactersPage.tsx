import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Character } from '../../Models/CharacterModel';
import Button from '../../components/Button/Button';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import Loader from '../../components/Loader/Loader';

const CharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>();
  const [filteredCharacters, setFilteredCharacters] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const buttons = [
    {
      title: 'All',
      bgColor: '#11AEBF',
      onClick: () => setFilteredCharacters(''),
    },
    {
      title: 'Alive',
      bgColor: '#BFD962',
      onClick: () => setFilteredCharacters('?status=alive'),
    },
    {
      title: 'Dead',
      bgColor: '#D94E4E',
      onClick: () => setFilteredCharacters('?status=dead'),
    },
    {
      title: 'Unknown',
      bgColor: '#BFB378',
      onClick: () => setFilteredCharacters('?status=unknown'),
    },
  ];

  const getCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${filteredCharacters}`);
      setCharacters(response.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'Nothing to display' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axios error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacters().then();
  }, [filteredCharacters]);

  return (
    <div className="page">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="box box--row">
              {buttons.map(({ title, onClick, bgColor }) => (
                <Button
                  key={title}
                  title={title}
                  bgColor={bgColor}
                  onClick={onClick}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              {loading && <Loader />}
              <div className="grid-container">
                {characters && characters.map((
                  {
                    id, name, image, status,
                  },
                ) => (
                  <CharacterCard
                    key={id}
                    id={id}
                    name={name}
                    image={image}
                    status={status}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
};
export default CharactersPage;
