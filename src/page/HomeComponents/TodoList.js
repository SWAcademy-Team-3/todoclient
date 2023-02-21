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
              <div className="element" key={val.tempId}>
                {my ? (
                  <button
                    className="DeleteButton"
                    onClick={() =>
                      handleClick(val.tempId, "DELETE", category, val.todo)
                    }
                  >
                    X
                  </button>
                ) : (
                  <div></div>
                )}
                <span
                  onClick={() =>
                    handleClick(val.tempId, "UPDATE", category, val.todo)
                  }
                  style={{
                    textDecoration: val.isClear ? "line-through" : "none",
                  }}
                >
                  {val.todo}
                </span>
                <span
                  style={{
                    textDecoration: val.isClear ? "line-through" : "none",
                  }}
                >
                  {val.limitTime}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
