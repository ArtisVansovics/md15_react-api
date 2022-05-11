import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Location } from '../../Models/LocationModel';
import LocationCard from '../../components/LocationCard/LocationCard';
import Loader from '../../components/Loader/Loader';

const LocationsPage = () => {
  const [locations, setLocations] = useState<Location[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const getLocations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/location/');
      setLocations(response.data.results);
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
    getLocations().then();
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              {loading && <Loader />}
              <div className="grid-container">
                {locations && locations.map((
                  {
                    id, name, type,
                  },
                ) => (
                  <LocationCard
                    key={id}
                    id={id}
                    name={name}
                    type={type}
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

export default LocationsPage;
