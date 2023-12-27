import './App.css'; // App  UI 디자인

// 리액트에서 사용자 정의 태그를 만들때는 반드시 '대문자'로 시작해야 함
function Header(props) {
  // 개발자 도구의 concole에서 props에 들어가는 값 확인 -> title 값이 정상적으로 보이는지
  console.log('props', props, props.title);
  return (
    // 반환하고 싶은 내용을 반환
    <header>
      <h1>
        <a href="/">
          {/* prop 값을 사용하고 싶을땐 {}:중괄호 사용 */}
          {props.title}
          {/* props.title */}
        </a>
      </h1>
    </header>
  );
}

// 리액트에선 사용자 정의 태그라는 표현을 쓰지 않고 '컴포넌트(Component)'라는 표현을 씀
function Nav(props) {
  const lis = []
  for (let i=0; i<props.topics.length; i++) {
    let t = props.topics[i];

    // lis.push(<li><a href={'/read/'+t.id}>{t.title}</a></li>)
    // Warning: Each child in a list should have a unique "key" prop. : 동적으로 만들어주는 태그들은 각자 'key'라는 prop을 가지고 있어야하고, 이는 반복문 안에서 고유해야 한다.
    
    lis.push(<li key={t.id}><a href={'/read/'+t.id}>{t.title}</a></li>)
    // lis가 const로 정의되었지만 push가 가능한 이유 : 배열의 이름이 C나 C++처럼 배열의 시작 주소를 의미한다고 생각하면 됨!
    // GPT : 배열이나 객체 같은 참조 타입(reference type)을 const로 선언하면 그 참조(주소)는 변경할 수 없지만, 참조하는 내용 자체는 변경할 수 있습니다.
    // GPT : JavaScript에서 const가 변수의 재할당을 막지만, 불변성(immutability)을 보장하지는 않는다는 점을 보여줍니다. 
    // GPT : 배열과 같은 참조 타입의 경우, 변수가 참조하는 객체의 내용은 const 선언에도 불구하고 변경될 수 있습니다.
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}
function Article(props) {
  return (
    <article>
      <h2>
        {props.title}
      </h2>
    {props.body}
    </article>
  );
}
function App() {
  // const : 함수 내에선 수정 불가능 -> 코드 안정성 높임
  // topics 라는 배열 정의 -> 객체 값들을 가짐
  // 객체(Object) : 객체는 중괄호 {} 안에 0개 이상의 속성(또는 "키-값" 쌍)을 포함할 수 있으며, 각 속성은 키(또는 이름)와 값으로 구성
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'},
  ]
  return (
    <div className="App">
      {/* Headet component에 title이라는 속성(prop)을 주고 싶음 -> title의 값이 보이도록*/}
      <Header title="REACT"></Header>
      {/* HTML 태그처럼, component에 속성을 정의하고 속성 값을 넣어 사용할 수 있게됨 */}
      
      {/* 이처럼 배열 같은 값을 전달할 때는 {}:중괄호를 사용 */}
      <Nav topics={topics}></Nav>

      <Article title="Hi" body="Hello World!"></Article>  
      {/* <Article title="Hello" body="Hello React!"></Article>  
      <Article title="Welcome" body="Hello, WEB!"></Article> */}
    </div>
  );
}

export default App;
