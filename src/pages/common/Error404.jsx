import Button from "../../components/ui/Button";
import {Link} from "react-router-dom";

export default function Error404(){
	return(
			<div className="error">
				<div className="error404">
					<h1>404</h1>
					페이지를 찾을 수 없습니다.
				</div>
				<Link to={'/'}>
					<Button className={'submit-button'}>메인으로</Button>
				</Link>
			</div>
	)
}