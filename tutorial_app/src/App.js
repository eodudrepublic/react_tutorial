import './App.css'; // App  UI 디자인

// 리액트에서 사용자 정의 태그를 만들때는 반드시 '대문자'로 시작해야 함
function Header() {
  return (
    // 반환하고 싶은 내용을 반환
    <header>
      <h1><a href="/">WEB</a></h1>
    </header>
  );
}

// 리액트에선 사용자 정의 태그라는 표현을 쓰지 않고 '컴포넌트(Component)'라는 표현을 씀
function Nav() {
  return (
    <nav>
      <ol>
        <li><a href="/read/1">html</a></li>
        <li><a href="/read/2">css</a></li>
        <li><a href="/read/3">js</a></li>
      </ol>
    </nav>
  );
}
function Article() {
  return (
    <article>
      <h2>Welcome</h2>
      Hello, WEB
    </article>
  );
}
function App() {
  return (
    <div className="App">
      {/* <header>
        <h1><a href="/">WEB</a></h1>
      </header> 
      => Header 사용자 정의 태그*/}
      <Header></Header>
      {/* <Header></Header>
      <Header></Header> */}

      {/* <nav>
        <ol>
          <li><a href="/read/1">html</a></li>
          <li><a href="/read/2">css</a></li>
          <li><a href="/read/3">js</a></li>
        </ol>
      </nav>
      => Nav component */}
      <Nav></Nav>

      {/* <article>
        <h2>Welcome</h2>
        Hello, WEB
      </article>
      => Article component */}
      <Article></Article>

      {/* => 코드가 훨씬 간결해짐! */}
      {/* 각각의 코드가 이름을 갖고 있기 때문에 어떠한 취지의 코드인지 빠르게 파악이 가능 */}
      {/* 빠른 수정 가능! => 생산성을 높임! */}
    </div>
  );
}

export default App;
