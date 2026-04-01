import { useState } from "react";

function Palette({
  addBlock,
  onSave,
  savedLayouts,
  setBlocks,
  deleteLayout,
  renameLayout,
}) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempName, setTempName] = useState("");

  return (
    <div className="w-1/4 bg-white shadow-lg p-5 overflow-y-auto h-screen">
      
      <h2 className="text-xl font-bold mb-4">Add Blocks</h2>

      <button onClick={() => addBlock("text")} className="btn-blue">
        Text Block
      </button>

      <button onClick={() => addBlock("image")} className="btn-green">
        Image Block
      </button>

      <button onClick={() => addBlock("header")} className="btn-purple">
        Header Block
      </button>

      <button onClick={onSave} className="btn-black">
         Save Layout
      </button>

      <h3 className="font-semibold mb-2 mt-4">Saved Layouts</h3>

      {savedLayouts.length === 0 && (
        <p className="text-gray-400 text-sm">No saved layouts</p>
      )}

      {savedLayouts.map((layout, index) => {
        const blocksData = layout.blocks || layout;

        return (
          <div
            key={index}
            className="border p-3 mb-3 rounded bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex justify-between items-center mb-2">

              {/* EDIT NAME */}
              {editingIndex === index ? (
                <input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={() => {
                    renameLayout(index, tempName);
                    setEditingIndex(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      renameLayout(index, tempName);
                      setEditingIndex(null);
                    }
                  }}
                  className="border px-2 py-1 rounded text-sm"
                  autoFocus
                />
              ) : (
                <span
                  onClick={() => setBlocks([...blocksData])}
                  className="cursor-pointer font-medium"
                >
                  {layout.name || `Layout ${index + 1}`} ({blocksData.length})
                </span>
              )}

              <div className="flex gap-2">
                {/* EDIT */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingIndex(index);
                    setTempName(layout.name);
                  }}
                  className="text-blue-500"
                >
                  ✏
                </button>

                {/* DELETE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteLayout(index);
                  }}
                  className="text-red-500"
                >
                  🗑
                </button>
              </div>
            </div>

            {/* PREVIEW */}
            <div className="space-y-2 text-sm">
              {blocksData.map((block) => {
                if (block.type === "text") {
                  return <p key={block.id}>{block.content}</p>;
                }

                if (block.type === "image") {
                  return (
                    block.content && (
                      <img key={block.id} src={block.content} className="h-16" />
                    )
                  );
                }

                if (block.type === "header") {
                  const Tag = block.level || "h1";
                  return <Tag key={block.id}>{block.content}</Tag>;
                }

                return null;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Palette;