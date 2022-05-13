import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LocationCard.module.scss';
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
    <div className={styles.card}>
      <h3 className={styles.card__title}>
        {name}
      </h3>
      <h4 className={styles['card__sub-title']}>
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
