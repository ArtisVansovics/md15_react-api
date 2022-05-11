import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Episode } from '../../Models/EpisodeModel';
import { Info } from '../../Models/InfoModel';
import Button from '../../components/Button/Button';
import PageTitle from '../../components/PageTitle/PageTitle';
import Loader from '../../components/Loader/Loader';

const EpisodePage = () => {
  const [episode, setEpisode] = useState<Episode>();
  const [info, setInfo] = useState<Info>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getEpisode = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
      const responseTwo = await axios.get('https://rickandmortyapi.com/api/episode');
      setEpisode(response.data);
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
    getEpisode().then();
  }, [id]);

  const prevEpisode = Number(id) - 1;
  const nextEpisode = Number(id) + 1;

  return (
    <div className="page">
      {episode && (
        <div className="container">
          <div className="row row center-xs">
            <div className="col-xs-12 col-md-6">
              <div className="box">
                <PageTitle title={episode.name} />
              </div>
            </div>
            <div className="col-xs-6 col-md-3 first-md">
              <div className="box box--stretch">
                <Button
                  title="Previous Episode"
                  bgColor="#BFD962"
                  onClick={() => navigate(`/episodes/${prevEpisode}`)}
                  disabled={info && prevEpisode === 0}
                />
              </div>
            </div>
            <div className="col-xs-6 col-md-3">
              <div className="box box--stretch">
                <Button
                  title="Next Episode"
                  bgColor="#BFD962"
                  onClick={() => navigate(`/episodes/${nextEpisode}`)}
                  disabled={info && nextEpisode === info.count + 1}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="page__text">
                  {`Episode: ${episode.episode}`}
                  <br />
                  {`Air-date: ${episode.air_date}`}
                  <br />
                  {`Created: ${episode.created}`}
                </div>
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
export default EpisodePage;
