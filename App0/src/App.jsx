import { useState } from "react";
import "./index.css";
import {
  FaPlus,
  FaCheckCircle,
  FaCircle,
  FaTrash,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function App() {
  const [redItems, setDone] = useState([]);
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const activityDone = (index) => {
    setDone((prevRedItems) => {
      const newRedItems = [...prevRedItems];
      newRedItems[index] = !newRedItems[index];
      return newRedItems;
    });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the input value state on change
  };

  const addItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue]); // Add the input value to the list
      setDone([...redItems, false]); // Initialize the new item as not red
      setInputValue(""); // Clear the input field
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const clearItems = () => {
    setItems([]);
    setDone([]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`w-screen h-screen flex justify-center items-center ${darkMode ? "bg-gray-800" : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"}`}
    >
      <div
        className={`w-4/5 h-4/5 rounded-xl flex flex-col items-center justify-start shadow-xl relative ${darkMode ? "bg-gray-700" : "bg-neutral-100 text-black"}`}
      >
        <div className="absolute top-4 left-4">
          <button
            onClick={toggleDarkMode}
            className="flex items-center bg-indigo-500 text-white p-2 rounded-full shadow-lg"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <div className="h-1/3 flex flex-col justify-center">
          <p className="text-3xl shadow-sm text-pink-500 font-bold">
            ToDo List App
          </p>
        </div>
        <div className="w-4/5 h-2/3 flex flex-col">
          <div className="h-10 flex flex-row">
            <input
              type="text"
              className={`w-full rounded-l-md px-4 shadow-md outline-none border-2 border-dashed border-pink-500 border-r-0 ${darkMode ? "bg-gray-600 text-white" : "bg-neutral-100 text-black"}`}
              placeholder="Enter Task..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button
              className="w-fit rounded-r-md bg-pink-500 px-4"
              onClick={addItem}
            >
              <FaPlus color="white" />
            </button>
          </div>
          {items.map((item, index) => (
            <div
              className={`flex flex-row items-center rounded-xl ${darkMode ? "bg-gray-600 text-white" : "bg-neutral-100 text-black"} h-10 shadow-md mt-2 ${redItems[index] ? "line-through" : ""}`}
              key={index}
            >
              <div
                className={`mx-4 ${redItems[index] ? "text-indigo-500" : "text-purple-500"}`}
                onClick={() => activityDone(index)}
              >
                {redItems[index] ? <FaCheckCircle /> : <FaCircle />}
              </div>
              <p className="">{item}</p>
            </div>
          ))}
        </div>
        <button
          className="absolute bottom-4 right-4 bg-indigo-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          onClick={clearItems}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default App;
