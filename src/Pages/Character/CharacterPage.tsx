import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Character } from '../../Models/CharacterModel';
import { Info } from '../../Models/InfoModel';
import Button from '../../components/Button/Button';
import PageTitle from '../../components/PageTitle/PageTitle';
import Loader from '../../components/Loader/Loader';

const CharacterPage = () => {
  const [character, setCharacter] = useState<Character>();
  const [info, setInfo] = useState<Info>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getCharacter = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
      const responseTwo = await axios.get('https://rickandmortyapi.com/api/character');
      setCharacter(response.data);
      setInfo(responseTwo.data.info);
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
    getCharacter().then();
  }, [id]);

  const prevCharacter = Number(id) - 1;
  const nextCharacter = Number(id) + 1;

  return (
    <div className="page">
      {character && (
        <div className="container">
          <div className="row center-xs">
            <div className="col-xs-12 col-md-6">
              <div className="box">
                <PageTitle title={character.name} />
              </div>
            </div>
            <div className="col-xs-6 col-md-3 first-md">
              <div className="box box--stretch">
                <Button
                  title="Previous Character"
                  bgColor="#BFD962"
                  onClick={() => navigate(`/characters/${prevCharacter}`)}
                  disabled={info && prevCharacter === 0}
                />
              </div>
            </div>
            <div className="col-xs-6 col-md-3">
              <div className="box box--stretch">
                <Button
                  title="Next Character"
                  bgColor="#BFD962"
                  onClick={() => navigate(`/characters/${nextCharacter}`)}
                  disabled={info && nextCharacter === info.count + 1}
                />
              </div>
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-xs-12 col-sm-5">
              <div className="box">
                <img
                  className="img"
                  src={character.image}
                  alt={character.name}
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-5">
              <div className="box box--stretch">
                <p className="page__text">
                  {`Status: ${character.status}`}
                  <br />
                  {`Species: ${character.species}`}
                  <br />
                  {`Gender: ${character.gender}`}
                  <br />
                  {`Origin: ${character.origin.name}`}
                  <br />
                  {`Location: ${character.location.name}`}
                  <br />
                  {character.type && `Type: ${character.type}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && <Loader />}
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
};

export default CharacterPage;
