import './App.css';
import React from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';


function App() {
  return (
    <div className="App">
      <h1 className='main-heading'>Radix Sort Visualizer</h1>
      <SortingVisualizer></SortingVisualizer>
    </div>
  );
}

export default App;
