/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import Palette from "./components/Palette";
import Canvas from "./components/Canvas";

function App() {
  const [blocks, setBlocks] = useState([]);
  const [savedLayouts, setSavedLayouts] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savedLayouts")) || [];
    setSavedLayouts(data);
  }, []);

  // Add Block
  const addBlock = (type) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      content: "",
      level: "h1",
    };
    setBlocks([...blocks, newBlock]);
  };

  // Save Layout
  const handleSaveLayout = () => {
    const newLayouts = [
      ...savedLayouts,
      {
        name: `Layout ${savedLayouts.length + 1}`,
        blocks,
      },
    ];

    setSavedLayouts(newLayouts);
    localStorage.setItem("savedLayouts", JSON.stringify(newLayouts));
  };

  // Delete Layout
  const deleteLayout = (index) => {
    const updated = savedLayouts.filter((_, i) => i !== index);
    setSavedLayouts(updated);
    localStorage.setItem("savedLayouts", JSON.stringify(updated));
  };

  // Rename Layout
  const renameLayout = (index, newName) => {
    const updated = [...savedLayouts];
    updated[index].name = newName;

    setSavedLayouts(updated);
    localStorage.setItem("savedLayouts", JSON.stringify(updated));
  };

return (
  <div className="flex flex-col bg-gray-100 min-h-screen">

    {/* 🔥 TOP BAR */}
    <div className="flex justify-between items-center bg-white shadow px-6 py-3">
      <h1 className="text-xl font-bold text-gray-700">
        Dynamic Content Builder
      </h1>

      {/* ✅ SAVE BUTTON */}
      <button
        onClick={handleSaveLayout}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
      Save 
      </button>
    </div>

    {/* MAIN CONTENT */}
    <div className="flex flex-1">
      <Palette
        addBlock={addBlock}
        onSave={handleSaveLayout}
        savedLayouts={savedLayouts}
        setBlocks={setBlocks}
        deleteLayout={deleteLayout}
        renameLayout={renameLayout}
      />

      <Canvas blocks={blocks} setBlocks={setBlocks} />
    </div>
  </div>
);
}

export default App;