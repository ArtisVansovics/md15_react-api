import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Character } from '../../Models/CharacterModel';
import { Info } from '../../Models/InfoModel';
import Button from '../../components/Button/Button';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import Loader from '../../components/Loader/Loader';

const CharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>();
  const [info, setInfo] = useState<Info>();
  const [filteredCharacters, setFilteredCharacters] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>();
  // const [visiblePages, setVisiblePages] = useState<number[]>();

  const buttons = [
    {
      title: 'All',
      bgColor: '#11AEBF',
      onClick: () => {
        setFilteredCharacters('');
        setCurrentPage(1);
      },
    },
    {
      title: 'Alive',
      bgColor: '#BFD962',
      onClick: () => {
        setFilteredCharacters('alive');
        setCurrentPage(1);
      },
    },
    {
      title: 'Dead',
      bgColor: '#D94E4E',
      onClick: () => {
        setFilteredCharacters('dead');
        setCurrentPage(1);
      },
    },
    {
      title: 'Unknown',
      bgColor: '#BFB378',
      onClick: () => {
        setFilteredCharacters('unknown');
        setCurrentPage(1);
      },
    },
  ];

  const getCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios
        .get(`https://rickandmortyapi.com/api/character/?page=${currentPage.toString()}&status=${filteredCharacters}`);
      setCharacters(response.data.results);
      setInfo(response.data.info);
      setPageCount(response.data.info.pages);
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
  }, [filteredCharacters, currentPage]);

  const pages = Array.from(Array(pageCount).keys()).map((page) => page + 1);

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
              {info && (
                <div className="pagination">
                  {pages.map((page) => (
                    page === currentPage ? (
                      <button
                        key={page}
                        className="pagination__item"
                        onClick={() => setCurrentPage(page)}
                        style={{ outline: '4px solid #BFD962' }}
                      >
                        {page}
                      </button>
                    ) : (
                      <button
                        key={page}
                        className="pagination__item"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    )
                  ))}
                </div>
              )}
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
