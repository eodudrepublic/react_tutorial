import './App.css'; // App  UI 디자인
import { useState } from 'react'; // useState : react에서 제공하는 함수 -> 컴포넌트에 상태 변수 추가 (중요!!)
                                  // -> 컴포넌트의 상태와 생명 주기 기능을 연결한다 해서 Hook이라 한다 카더라 : 개념 참고

function Header(props) {
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
            event.preventDefault(); // 원래 a 태그를 클릭했을때 기본적인 기능(이 경우 refresh)을 막음
            props.onChangeMode();   // 막은 원래 기능 대신 props로 전달받은 onChangeMode() 기능 실행
          }
        }>
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const lis = []
  for (let i=0; i<props.topics.length; i++) {
    let t = props.topics[i];
    // lis.push(<li><a href={'/read/'+t.id}>{t.title}</a></li>)
    // Warning: Each child in a list should have a unique "key" prop. : 동적으로 만들어주는 태그들은 각자 'key'라는 prop을 가지고 있어야하고, 이는 반복문 안에서 고유해야 한다.
    
    lis.push(
      <li key={t.id}>
        <a href={'/read/'+t.id} onClick={
          event => {
            event.preventDefault();
            props.onChangeMode(
              t.id, 
              // event.target.id,
              // t.id(직접 참조 방식) : 현재 항목의 정확한 값을 가져옴 -> 더 안전하고, 확실함
              // event.target.id(동적 참조 방식) : 이벤트가 실제로 발생한 DOM 요소를 가져옴 ->  이벤트가 발생한 요소의 속성에 의존 
              //  => 동적으로 생성된 요소의 속성을 참고할땐 유용할 수 있지만 (코드의 유연성 증가), 코드의 명확성을 저하시킬 수 있음
            );
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
  // const _mode = useState('WELCOME');
  // // State(: [State Variable : 상태 변수, State Setter Function : 상태 업데이트 함수]) = useState(Initial State : 초기 상태);
  // console.log('_mode', _mode);
  // const mode = _mode[0];
  // // State[0] : 상태 변수(State Variable)
  // const setMode = _mode[1];
  // // State[1] : 상태 업데이트 함수(State Setter Function)
  const [mode, setMode] = useState('WELCOME');  // 한 줄로 요약 (위랑 내용 같음)

  // 실습 : 클릭한 topic 내용을 본문에 표시
  const [id, setId] = useState(null); // 선택한 topic id를 저장하는 state
  
  // topics 라는 배열 정의 -> 객체 값들을 가짐
  // 객체(Object) : 객체는 중괄호 {} 안에 0개 이상의 속성(또는 "키-값" 쌍)을 포함할 수 있으며, 각 속성은 키(또는 이름)와 값으로 구성
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'},
  ]

  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title="WELCOME" body="Hello WEB!"></Article>  
  } else if (mode === 'READ') {
    // // 뭐냐 왜 id가 1이면 html 뭐시기 나와야 하는데 css가 나오지? -> 지금 출력되는 id의 다음게 나오고 있음
    // // 이런 문제가 발생하는 이유 : 씻팔 대괄호로 접근하면 id가 아니라 index로 접근하니까 그렇지 병신 대영아
    // console.log('topic', id, topics[id].title, topics[id].body)
    // content = <Article title={topics[id].title} body={topics[id].body}></Article>  

    // 선택한 id 출력
    console.log('id', id)
    for (let i=0; i<topics.length; i++) {
      // i번째 객체의 id와 id(state) 값이 같다면 -> i번째 객체의 내용으로 본문 업데이트
      if (topics[i].id === id) {
        // 적용시킬 topic의 내용 확인
        console.log('topic', i, topics[i].title, topics[i].body)
        content = <Article title={topics[i].title} body={topics[i].body}></Article> 
      } 
    }
  }

  return (
    <div className="App">
      {/* Headet component에 title이라는 속성(prop)을 주고 싶음 -> title의 값이 보이도록*/}
      <Header title="REACT" onChangeMode={
        ()=>{
          // 상태 업데이트 함수(setter)를 통해 mode의 값을 'WELCOME'으로 변경
          setMode('WELCOME');
        }
      }></Header>
      <Nav topics={topics} onChangeMode={
        (_id)=>{
          // 상태 업데이트 함수(setter)를 통해 mode의 값을 'READ'으로 변경
          setMode('READ');
          setId(_id);
        }
      }></Nav>
      {/* setMode를 통해 mode의 값이 바뀌면 (State이 바뀌면) mode와 연결된 content 부분이 자동으로 Re-rendering됨! */}

      {content} 
    </div>
  );
}

export default App;
