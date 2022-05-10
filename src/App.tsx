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
import Page404 from './Pages/404/Page404';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route
        path="/"
        element={<CharactersPage />}
      />
      <Route
        path="/characters"
        element={<CharactersPage />}
      />
      <Route
        path="/characters/:id"
        element={<CharacterPage />}
      />
      <Route
        path="/episodes"
        element={<EpisodesPage />}
      />
      <Route
        path="/episodes/:id"
        element={<EpisodePage />}
      />
      <Route
        path="/locations"
        element={<LocationsPage />}
      />
      <Route
        path="/locations/:id"
        element={<LocationPage />}
      />
      <Route
        path="404"
        element={<Page404 />}
      />
      <Route
        path="*"
        element={<Navigate to="/404" />}
      />
    </Routes>
  </Router>
);

export default App;
