import { useRef, useEffect } from "react";

function HeaderBlock({ block, setBlocks }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && !ref.current.innerText) {
      ref.current.innerText = block.content || "Editable Header";
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBlur = () => {
    const value = ref.current.innerText;

    setBlocks(prev =>
      prev.map(b =>
        b.id === block.id ? { ...b, content: value } : b
      )
    );
  };

  const Tag = block.level || "h1";

  return (
    <div>
      <select
        value={block.level}
        onChange={(e) =>
          setBlocks(prev =>
            prev.map(b =>
              b.id === block.id ? { ...b, level: e.target.value } : b
            )
          )
        }
        className="mb-2 border p-1 rounded"
      >
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
      </select>

      <Tag
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        className="border p-2 rounded font-bold"
      />
    </div>
  );
}

export default HeaderBlock;