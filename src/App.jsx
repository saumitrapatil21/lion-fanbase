import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ContentPreview from './components/ContentPreview';
import FunFacts from './components/FunFacts';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Diet from './components/Diet';
import Habitat from './components/Habitat';
import Classification from './components/Classification';
import Anatomy from './components/Anatomy';
import Behavior from './components/Behavior';

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
