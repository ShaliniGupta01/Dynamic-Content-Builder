function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-red-500 hover:text-red-700"
    >
      Delete
    </button>
  );
}

export default DeleteButton;