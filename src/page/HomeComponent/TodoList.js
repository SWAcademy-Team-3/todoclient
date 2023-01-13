export default function TodoList({ category, data }) {
  // TODO 삭제버튼 커스터마이징
  // TODO TODO 완료 상태 여부 판단(update)

  return (
    <>
      <p style={{ fontSize: "18px", margin: "2px 0px" }}>{category}</p>
      {data.length === 0 ? (
        <span>등록된 일이 없어요</span>
      ) : (
        <div className="list">
          {data.map((val, index) => {
            return (
              <div className="element" key={index}>
                <span>
                  <button>x</button> {val.todo} <br />
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
