import Button from "../ui/Button";

export default function Back(){
  const goBack = () => {
    window.history.back();
  }
  return (
      <div className="back">
        <Button type="button" className="back" onClick={goBack}>
          <span className="back">🔙</span>
          <p className="back">취소하고 돌아가기</p>
        </Button>
      </div>
  )
}