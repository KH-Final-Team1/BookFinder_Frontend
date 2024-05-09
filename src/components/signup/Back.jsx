import Button from "../ui/Button";

export default function Back(){
  return (
      <div className="back">
        <Button type="button" className="back">
          <span className="back">🔙</span>
          <p className="back">취소하고 돌아가기</p>
        </Button>
      </div>
  )
}