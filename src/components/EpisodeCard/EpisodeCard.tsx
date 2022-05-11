import React, { FC } from 'react';
import './EpisodeCard.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

type EpisodeCardProps = {
  id: number;
  name: string;
  episode: string;
}

const EpisodeCard:FC<EpisodeCardProps> = (
  {
    id, episode, name,
  },
) => {
  const navigate = useNavigate();

  return (
    <div className="episode-card">
      <h3 className="episode-card__title">
        {`${episode}: ${name}`}
      </h3>
      <Button
        title="Learn More"
        bgColor="#BFD962"
        onClick={() => navigate(`/episodes/${id}`)}
      />
    </div>
  );
};

export default EpisodeCard;
