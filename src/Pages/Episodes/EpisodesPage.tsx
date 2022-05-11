import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Episode } from '../../Models/EpisodeModel';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [episodeSearch, setEpisodeSearch] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const getEpisodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/?name=${episodeSearch}`);
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
  }, [episodeSearch]);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  });
  console.log(episodes);
  console.log(searchValue);
  return (
    <div className="page">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <form
                className="search-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setEpisodeSearch(searchValue);
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
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              {loading && <Loader />}
            </div>
          </div>
        </div>
      </div>
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
};
export default EpisodesPage;
