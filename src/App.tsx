import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router, Route, Routes, NavLink, Navigate,
} from 'react-router-dom';
import Header from './components/Header/Header';
import CharacterPage from './Pages/Character/CharacterPage';
import CharactersPage from './Pages/Characters/CharactersPage';
import EpisodePage from './Pages/Episode/EpisodePage';
import EpisodesPage from './Pages/Episodes/EpisodesPage';
import LocationPage from './Pages/Loaction/LocationPage';
import LocationsPage from './Pages/Locations/LocationsPage';

const App = () => (
  <div className="App">
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <div className="box" />
        </div>
      </div>
    </div>
  </div>
);

export default App;
