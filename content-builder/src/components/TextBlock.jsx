function TextBlock({ block, setBlocks }) {

  const handleChange = (e) => {
    const value = e.target.value;

    setBlocks(prev =>
      prev.map(b =>
        b.id === block.id ? { ...b, content: value } : b
      )
    );
  };

  return (
    <textarea
      className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={block.content || ""}
      onChange={handleChange}
      placeholder="Enter text..."
    />
  );
}

export default TextBlock;