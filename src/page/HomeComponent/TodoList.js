export default function TodoList({ category, data }) {
  // TODO TODO 들여쓰기 적용
  // TODO 삭제버튼 커스터마이징
  // TODO TODO 완료 상태 여부 판단(update)

  return (
    <>
      <h3>{category}</h3>
      {data.length === 0 ? (
        <span>등록된 일이 없어요</span>
      ) : (
        data.map((val, index) => {
          return (
            <span key={index}>
              <button>x</button> {val.todo} <br />
            </span>
          );
        })
      )}
    </>
  );
}
