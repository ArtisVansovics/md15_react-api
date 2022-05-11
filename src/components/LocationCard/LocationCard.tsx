import React, { FC } from 'react';
import './LocationCard.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

type LocationCardProps = {
  id: number;
  name: string;
  type: string;
}

const LocationCard:FC<LocationCardProps> = (
  {
    id, type, name,
  },
) => {
  const navigate = useNavigate();

  return (
    <div className="location-card">
      <h3 className="location-card__title">
        {name}
      </h3>
      <h4 className="location-card__sub-title">
        {`Location type: ${type}`}
      </h4>
      <Button
        title="Learn More"
        bgColor="#BFB378"
        onClick={() => navigate(`/locations/${id}`)}
      />
    </div>
  );
};

export default LocationCard;
