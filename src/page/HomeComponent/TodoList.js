export default function TodoList({ category, data }) {
  return (
    <>
      <h3>{category}</h3>
      {data.map((val, index) => {
        return (
          <span key={index}>
            <button>x</button> {val.todo} <br />
          </span>
        );
      })}
    </>
  );
}
