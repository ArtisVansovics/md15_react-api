import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Location } from '../../Models/LocationModel';
import { Info } from '../../Models/InfoModel';
import Button from '../../components/Button/Button';
import PageTitle from '../../components/PageTitle/PageTitle';
import Loader from '../../components/Loader/Loader';

const LocationPage = () => {
  const [location, setLocation] = useState<Location>();
  const [info, setInfo] = useState<Info>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getLocation = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
      const responseTwo = await axios.get('https://rickandmortyapi.com/api/location');
      setLocation(response.data);
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
    getLocation().then();
  }, [id]);

  const prevLocation = Number(id) - 1;
  const nextLocation = Number(id) + 1;

  return (
    <div className="page">
      {location && (
        <div className="container">
          <div className="row center-xs">
            <div className="col-xs-12 col-md-6">
              <div className="box">
                <PageTitle title={location.name} />
              </div>
            </div>
            <div className="col-xs-6 col-md-3 first-md">
              <div className="box box--stretch">
                <Button
                  title="Previous Location"
                  bgColor="#BFD962"
                  onClick={() => navigate(`/locations/${prevLocation}`)}
                  disabled={info && prevLocation === 0}
                />
              </div>
            </div>
            <div className="col-xs-6 col-md-3">
              <div className="box box--stretch">
                <Button
                  title="Next Location"
                  bgColor="#BFD962"
                  onClick={() => navigate(`/locations/${nextLocation}`)}
                  disabled={info && nextLocation === info.count + 1}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="page__text">
                  {`Type: ${location.type}`}
                  <br />
                  {`Dimension: ${location.dimension}`}
                  <br />
                  {`Created: ${location.created}`}
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

export default LocationPage;
