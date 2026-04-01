import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import BlockRenderer from "./BlockRenderer";
import DeleteButton from "./DeleteButton";

function SortableItem({ block, setBlocks }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteBlock = () => {
    setBlocks(prev => prev.filter(b => b.id !== block.id));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="group bg-white p-5 mb-5 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        
        {/* DRAG HANDLE */}
        <div
          {...listeners}
          className="flex items-center gap-2 cursor-grab text-gray-400 hover:text-gray-600"
        >
          <span className="text-lg">⋮⋮</span>
          <span className="text-sm hidden group-hover:inline">
            Drag Block
          </span>
        </div>

        {/* DELETE BUTTON */}
        <DeleteButton onClick={deleteBlock} />
      </div>

      {/* CONTENT */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <BlockRenderer block={block} setBlocks={setBlocks} />
      </div>
    </div>
  );
}

function Canvas({ blocks, setBlocks }) {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex(b => b.id === active.id);
      const newIndex = blocks.findIndex(b => b.id === over.id);

      setBlocks(arrayMove(blocks, oldIndex, newIndex));
    }
  };

  return (
    <div className="w-3/4 p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      
      {/* EMPTY STATE */}
      {blocks.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-32 text-gray-400">
          <p className="text-xl">🚀 Start building your page</p>
          <p className="text-sm mt-2">Add blocks from left panel</p>
        </div>
      )}

      {/* DRAG AREA */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
          {blocks.map(block => (
            <SortableItem key={block.id} block={block} setBlocks={setBlocks} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default Canvas;