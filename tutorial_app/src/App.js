import './App.css'; // App  UI 디자인

// 리액트에서 사용자 정의 태그를 만들때는 반드시 '대문자'로 시작해야 함
function Header(props) {
  // 개발자 도구의 concole에서 props에 들어가는 값 확인 -> title 값이 정상적으로 보이는지
  console.log('props', props, props.title);
  return (
    <header>
      <h1>
        {/* 여기서의 a 태그는 '유사' HTML임 -> 리액트가 HTML로 변환해주는거기 때문에 문법이 같지 않음! */}
        {/* 그래서 onclick이 아니라 onClick이고, onClick={함수} : a 태그가 클릭됐을때 함수가 호출 */}
        <a href="/" onClick={
          // function(event) {
          // 간결하게 arrow function으로 변경
          (event)=>{
            // event 객체에 대한 내용 : notion 정리 참고
            event.preventDefault(); // 원래 a 태그를 클릭했을때 기본적인 기능(이 경우 refresh)을 막음
            props.onChangeMode();   // 막은 원래 기능 대신 props로 전달받은 onChangeMode() 기능 실행
          }
        }>
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
    
    lis.push(
      <li key={t.id}>
        <a href={'/read/'+t.id} onClick={
          // event 실습
          // 하나인 경우 괄호 생략 가능?
          event => {
            event.preventDefault();
            props.onChangeMode(
              t.id, 
              t.title,
              // event.target.id,
              // event.target.title,
              // 2가지 전달방식의 차이는 notion 정리 참고
              // t.id(직접 참조 방식) : 현재 항목의 정확한 값을 가져옴 -> 더 안전하고, 확실함
              // event.target.id(동적 참조 방식) : 이벤트가 실제로 발생한 DOM 요소를 가져옴 ->  이벤트가 발생한 요소의 속성에 의존 
              //  => 동적으로 생성된 요소의 속성을 참고할땐 유용할 수 있지만 (코드의 유연성 증가), 코드의 명확성을 저하시킬 수 있음
            );  // onChangeMode에 parameter을 안 넣어줄뻔함
          }
        }>
          {t.title}
        </a>
      </li>
    )
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
      <Header title="REACT" onChangeMode={
        // function(){
        ()=>{
          alert('Header : event testing')
        }
      }></Header>
      {/* 이 Header 컴포넌트를 클릭했을때, 경고창을 띄우고 싶음 -> 원하는 '기능'을 넣은 function(함수) 추가 */}
      {/* 이럴 경우 Header의 props에는 title과 onChangeMode가 전달됨 */}
      
      {/* 이처럼 배열 같은 값을 전달할 때는 {}:중괄호를 사용 */}
      {/* event 실습 */}
      <Nav topics={topics} onChangeMode={(id, topic)=>{alert(id + ' : ' + topic)}}></Nav>

      <Article title="Hi" body="Hello World!"></Article>  
    </div>
  );
}

export default App;
