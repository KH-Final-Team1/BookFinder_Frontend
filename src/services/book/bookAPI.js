import axios from 'axios';

export function searchBookList () {
  axios.get("http://localhost:8080/api/v1/books/list?filter=name&keyword=자바")
      .then((result)=>{
        console.log(result);
      }).catch((err)=>{
        console.log(err);
  });
}