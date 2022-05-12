import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Episode } from '../../Models/EpisodeModel';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [searchParams, setSearchParams] = useSearchParams('');
  const [searchValue, setSearchValue] = useState<string>('');
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const getEpisodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/?${searchParams}`);
      setEpisodes(response.data.results);
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

  const searchUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    getEpisodes().then();
  }, [searchParams]);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  });

  return (
    <div className="page">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="box box--row">
              <form
                className="search-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearchParams({ name: searchValue });
                  setSearchValue('');
                }}
              >
                <input
                  className="search-form__input"
                  type="text"
                  placeholder="Search by name"
                  ref={searchRef}
                  value={searchValue}
                  onChange={searchUpdate}
                  required
                />
                <Button
                  title="SEARCH"
                  bgColor="#11aebf"
                  disabled={searchValue === ''}
                />
              </form>
              <Button
                title="Reset"
                bgColor="#11aebf"
                onClick={() => setSearchParams('')}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              {loading && <Loader />}
              <div className="grid-container grid-container--wide-columns">
                {episodes && episodes.map((
                  {
                    id, name, episode,
                  },
                ) => (
                  <EpisodeCard
                    key={id}
                    id={id}
                    name={name}
                    episode={episode}
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
export default EpisodesPage;
