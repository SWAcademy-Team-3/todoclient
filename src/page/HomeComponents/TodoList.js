export default function TodoList({ category, data, handleClick, my = true }) {
  // TODO 삭제버튼 커스터마이징
  return (
    <>
      <p style={{ fontSize: "18px", margin: "2px 0px" }}>{category}</p>
      {data.length === 0 ? (
        <span>등록된 일이 없어요</span>
      ) : (
        <div className="list">
          {data.map((val) => {
            return (
              <div className="element" key={val.todoId}>
                {my ? (
                  <button
                    className="DeleteButton"
                    onClick={() =>
                      handleClick(
                        category === "HABIT" ? val.habitId : val.todoId,
                        "DELETE",
                        category,
                        val.todo
                      )
                    }
                  >
                    X
                  </button>
                ) : (
                  <div></div>
                )}
                <span
                  onClick={() =>
                    handleClick(val.todoId, "UPDATE", category, val.todo)
                  }
                  style={{
                    textDecoration: val.success ? "line-through" : "none",
                  }}
                >
                  {val.todo ? val.todo : val.content}
                </span>
                <span
                  style={{
                    textDecoration: val.success ? "line-through" : "none",
                  }}
                >
                  {val.endDateTime && val.endDateTime}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
