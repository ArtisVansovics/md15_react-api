import React from 'react';
import Button from '../../components/Button/Button';

const buttons = [
  {
    title: 'All',
    bgColor: '#11AEBF',
    onClick: () => console.log('1'),
  },
  {
    title: 'Alive',
    bgColor: '#BFD962',
    onClick: () => console.log('1'),
  },
  {
    title: 'Dead',
    bgColor: '#D94E4E',
    onClick: () => console.log('1'),
  },
  {
    title: 'Unknown',
    bgColor: '#BFB378',
    onClick: () => console.log('1'),
  },
];

const CharactersPage = () => (
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
    </div>
  </div>
);

export default CharactersPage;
