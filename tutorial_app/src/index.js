import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 기본적인 디자인 정의
import App from './App';  // '.' : 현재 디렉토리 의미, 'App' : js 확장자 생략 -> App.js 파일 의미. 따라서, 현재 디렉토리의 App.js 파일을 의미함
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));  // '<App />' 태그가 'root'란 id를 가진 태그로 렌더링되라는 코드
// root <- index.html
root.render(
  <React.StrictMode>
    <App /> {/* -> UI 부분 전체 : 3번째 줄의 'App' */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
