import React from "react";
import { Alert, Table } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";

function Cart(props) {

  let state = useSelector((state) => state.reducer2);
  let dispatch = useDispatch();

  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {
            props.state.map((a, i) => {
              return (
                <tr key={i}>
                  <td>{ a.id }</td>
                  <td>{ a.name }</td>
                  <td>{ a.quan }</td>
                  <td>
                    <button onClick={() => { dispatch({ type: '수량증가', payload: {name: 'kim'} }) }}>+</button>
                    <button onClick={() => { dispatch({ type: '수량감소' }) }}>-</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      {
        props.alert열였니 === true
        ? (
          <Alert>
            <p>지금 구매하시면 신규할인 20%</p>
            <button onClick={() => { props.dispatch({ type: 'alert닫기' }) }}>닫기</button>
          </Alert>
        )
        : null
      }
    </div>
  );
}

// redux store 데이터 가져와서 props로 변환해주는 함수
function state를props화(state) {
  console.log(state);
  return {
    state: state.reducer,
    alert열였니: state.reducer2,
  }
}

export default connect(state를props화)(Cart);


// export default Cart;