import React, { useState, useEffect } from 'react';
import foodList from './data/foodList.json';
import './App.css';

function App() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMealTime, setSelectedMealTime] = useState('');
  const [result, setResult] = useState(null);

  const types = ['飯', '麵', '其他'];
  const locations = ['後門&宵夜街', '校內'];
  const mealTimes = ['早餐', '正餐'];

  const handleRandomize = () => {
    let filteredFoods = [...foodList.foods];

    if (selectedType) {
      filteredFoods = filteredFoods.filter(food => food.type === selectedType);
    }

    if (selectedLocation) {
      filteredFoods = filteredFoods.filter(food => food.location === selectedLocation);
    }

    if (selectedMealTime) {
      filteredFoods = filteredFoods.filter(food => food.mealTime === selectedMealTime);
    }

    if (filteredFoods.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredFoods.length);
      setResult(filteredFoods[randomIndex]);
    } else {
      setResult(null);
    }
  };

  // 頁面載入時隨機選擇一個餐廳
  useEffect(() => {
    handleRandomize();
  }, []);

  return (
    <div className="App">
      <h1>午餐隨機挑選器</h1>
      
      <div className="filters">
        <div className="filter-group">
          <h3>餐點時段</h3>
          <div className="buttons">
            {mealTimes.map(mealTime => (
              <button
                key={mealTime}
                className={selectedMealTime === mealTime ? 'active' : ''}
                onClick={() => {
                  setSelectedMealTime(selectedMealTime === mealTime ? '' : mealTime);
                  setTimeout(handleRandomize, 100);
                }}
              >
                {mealTime}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h3>食物種類</h3>
          <div className="buttons">
            {types.map(type => (
              <button
                key={type}
                className={selectedType === type ? 'active' : ''}
                onClick={() => {
                  setSelectedType(selectedType === type ? '' : type);
                  setTimeout(handleRandomize, 100);
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h3>位置</h3>
          <div className="buttons">
            {locations.map(location => (
              <button
                key={location}
                className={selectedLocation === location ? 'active' : ''}
                onClick={() => {
                  setSelectedLocation(selectedLocation === location ? '' : location);
                  setTimeout(handleRandomize, 100);
                }}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="randomize-btn" onClick={handleRandomize}>
        換一個
      </button>

      {result && (
        <div className="result">
          <h2>今天吃：{result.name}</h2>
          <p>類型：{result.type}</p>
          <p>位置：{result.location}</p>
          <p>時段：{result.mealTime}</p>
          <p className="description">{result.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
