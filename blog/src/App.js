import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  let posts = "강남 고기 맛집";
  let [글제목, 글제목변경] = useState(["남자 코트 추천", "강남 우동 맛집", "성남 돈까스 맛집"]);
  let [따봉, 따봉변경] = useState(0);
  let [modal, modal변경] = useState(false);
  let [누른제목, 누른제목변경] = useState(0);

  let [입력값, 입력값변경] = useState('');

  function 반복된UI() {
    let a = [];
    for(let i=0; i<3; i++) {
      a.push(<div>안녕</div>);
    }
    return a;
  }

  function 글추가() {
    let newArr = [입력값, ...글제목];
    글제목변경(newArr);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>

      { 
        글제목.map((글, index) => {
          return (
            <div className="list" key={index}>
              <h3 onClick={ () => {누른제목변경(index)} }>{글}<span onClick={() => {따봉변경(따봉 + 1);}}>👍</span>{따봉}</h3>
              <p>2월 17일 발행</p>
              <hr />
            </div>
          )
        })
      }

      {/* {반복된UI()} */}

      {/* <button onClick={ () => {누른제목변경(0)} }>버튼1</button>
      <button onClick={ () => {누른제목변경(1)} }>버튼2</button>
      <button onClick={ () => {누른제목변경(2)} }>버튼3</button> */}

      <div className="publish">
        <input onChange={(e) => 입력값변경(e.target.value)}/>
        <button onClick={글추가}>저장</button>
      </div>

      <button onClick={() => {modal변경(!modal)}}>열고닫기</button>
      {
        modal === true
        ? <Modal 글제목={글제목} 누른제목={누른제목}/>
        : null
      }

      <Profile />
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
        <h2>제목: {props.글제목[props.누른제목]}</h2>
        <p>날짜</p>
        <p>상세 내용</p>
    </div>
  )
}

// 예전 리액트 문법 (class)
class Profile extends React.Component {
  constructor(){
    super();
    this.state = { name: 'kim', age: 30 }
  }

  changeName = () => {
    this.setState({name: "park"})
  }

  render() {
    return (
      <div>
        <h3>프로필입니다.</h3>
        <p>저는 {this.state.name} 입니다.</p>
        <button onClick={ this.changeName }>버튼</button>
      </div>
    )
  }
}

export default App;
