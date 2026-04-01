function ImageBlock({ block, setBlocks }) {

  const handleChange = (e) => {
    const value = e.target.value;

    setBlocks(prev =>
      prev.map(b =>
        b.id === block.id ? { ...b, content: value } : b
      )
    );
  };

  return (
    <div>
      <input
        className="w-full border p-2 rounded mb-2"
        value={block.content || ""}
        onChange={handleChange}
        placeholder="Enter image URL"
      />

      {block.content && (
        <img
          src={block.content}
          alt="preview"
          className="h-40 mx-auto object-contain border rounded"
        />
      )}
    </div>
  );
}

export default ImageBlock;