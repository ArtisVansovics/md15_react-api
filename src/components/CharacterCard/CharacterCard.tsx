import React, { FC } from 'react';
import './CharacterCard.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

type CharacterCardProps = {
  id: number;
  name: string;
  image: string;
  status: string;
}

const CharacterCard:FC<CharacterCardProps> = (
  {
    id, name, image, status,
  },
) => {
  const navigate = useNavigate();

  return (
    <div
      className={`character-card ${status.toLowerCase()}`}
    >
      <img
        className="character-card__img"
        src={image}
        alt={name}
      />
      <h3 className="character-card__title">
        {name}
      </h3>
      <Button
        title="Learn More"
        bgColor="#D99C52"
        onClick={() => navigate(`/characters/${id}`)}
      />
    </div>
  );
};

export default CharacterCard;
