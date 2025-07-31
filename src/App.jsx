import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ContentPreview from './components/ContentPreview.jsx';
import FunFacts from './components/FunFacts.jsx';
import Footer from './components/Footer.jsx';
import Gallery from './components/Gallery.jsx';
import Diet from './components/Diet.jsx';
import Habitat from './components/Habitat.jsx';
import Classification from './components/Classification.jsx';
import Anatomy from './components/Anatomy.jsx';
import Behavior from './components/Behavior.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <div>
              <Hero />
              <ContentPreview />
              <FunFacts />
            </div>
          } />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/habitat" element={<Habitat />} />
          <Route path="/classification" element={<Classification />} />
          <Route path="/anatomy" element={<Anatomy />} />
          <Route path="/behavior" element={<Behavior />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
