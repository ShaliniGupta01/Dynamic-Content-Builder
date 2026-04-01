import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import HeaderBlock from "./HeaderBlock";

function BlockRenderer({ block, setBlocks }) {
  switch (block.type) {
    case "text":
      return <TextBlock block={block} setBlocks={setBlocks} />;
    case "image":
      return <ImageBlock block={block} setBlocks={setBlocks} />;
    case "header":
      return <HeaderBlock block={block} setBlocks={setBlocks} />;
    default:
      return null;
  }
}

export default BlockRenderer;