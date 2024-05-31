import {Link} from "react-router-dom";
import Button from "../../components/ui/Button";

export default function Error403() {
	return (
      <div className="error">
        <div className="error404">
          <h1>403</h1>
          로그인 한 상태에서는 접근할 수 없습니다.
        </div>
        <Link to={'/'}>
          <Button className={'submit-button'}>메인으로</Button>
        </Link>
      </div>
  )
}