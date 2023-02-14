export default function TodoList({ category, data, setData }) {
  // TODO 삭제버튼 커스터마이징
  // TODO TODO 완료 상태 여부 판단(update)

  const handleDelete = (targetId) => {
    const deletedData = data.filter((val) => val.tempId !== targetId);
    setData(deletedData);
  };

  const handleUpdate = (targetId) => {
    // 추후에 id 값으로 비교해서 업데이트 하기
    const updateData = data.map((val) => {
      if (val.tempId === targetId) {
        val.isClear = !val.isClear;
      }
      return val;
    });
    setData(updateData);
  };

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
                <button
                  className="DeleteButton"
                  onClick={() => handleDelete(val.tempId)}
                >
                  X
                </button>
                <span
                  onClick={() => handleUpdate(val.tempId)}
                  style={{
                    textDecoration: val.isClear ? "line-through" : "none",
                  }}
                >
                  {val.todo} <br />
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
