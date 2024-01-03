import './App.css'; // App  UI 디자인
import { useState } from 'react'; // useState : react에서 제공하는 함수 -> 컴포넌트에 상태 변수 추가 (중요!!)

function Header(props) {
  console.log('props', props, props.title);
  return (
    <header>
      <h1>
        {/* 여기서의 a 태그는 '유사' HTML임 -> 리액트가 HTML로 변환해주는거기 때문에 문법이 같지 않음! */}
        {/* 그래서 onclick이 아니라 onClick이고, onClick={함수} : a 태그가 클릭됐을때 함수가 호출 */}
        <a href="/" onClick={
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

function Create(props) {
  return <article>
    <h2>Create</h2>
    {/* onSubmit : submit 버튼을 눌렀을때 form 태그에서 발생하는 이벤트 */}
    <form onSubmit={event=>{
      // 기본 기능 : 페이지가 리로드됨 (http://localhost:3000/?title=test+title&body=test+body)
      event.preventDefault(); // 기본 기능 막음
      // event.target : 이벤트가 일어나는 태그 -> 여기서는 form 태그를 가리킴
      // event.target.title.value : 이벤트가 일어나는 태그에서 'title'이란 태그의 값을 불러옴
      const title = event.target.title.value;
      const body = event.target.body.value;

      // props를 통해 onCreate 함수 호출
      props.onCreate(title, body);
    }}>
      <p>
        {/* text로 title 입력받는 창 */}
        <input type="text" name="title" placeholder="title"/>
      </p>
      {/* title입력창과 body입력창을 다른 줄에 위치시키기 위해 p태그로 감쌈 */}
      <p>
        {/* HTML에서 여러 줄을 입력받을땐 textarea */}
        <textarea name="body" placeholder="body"></textarea>
      </p>
      <p>
        {/* 폼 데이터를 서버로 전송하는 기능 : submit */}
        <input type="submit" value="Create" />
      </p>
    </form>
  </article>
}
function App() {
  // // State(: [State Variable : 상태 변수, State Setter Function : 상태 업데이트 함수]) = useState(Initial State : 초기 상태);
  const [mode, setMode] = useState('WELCOME');  // 한 줄로 요약 (위랑 내용 같음)

  // 실습 : 클릭한 topic 내용을 본문에 표시
  const [id, setId] = useState(null); // 선택한 topic id를 저장하는 state
  
  // 생성 버튼을 누르면 topics 배열에 새로운 원소를 추가하고, 목록을 업데이트 해야함
  // -> topics를 state로 업그레이드
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'},
  ]);

  // 다음에 들어갈 원소(객체)의 id를 state로 따로 관리
  const [nextId, setNextId] = useState(4);  // 초기값 : topics의 마지막 id + 1 -> 4

  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title="WELCOME" body="Hello WEB!"></Article>  
  } else if (mode === 'READ') {
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
  } else if (mode === 'CREATE') {
    // 입력 폼이 복잡하기 때문에, Create 컴포넌트를 외부에서 정의해 사용
    content = <Create onCreate={(_title, _body)=>{
      // onCreate : 생성 버튼을 눌렀을때, 후속 작업을 할 수 있는 인터페이스를 제공
      console.log('next id', nextId, 'title', _title, 'body', _body);

      // topics에 들어갈 새로운 원소(객체) 생성
      const newTopic = {id:nextId, title:_title, body:_body}

      // State의 value가 객체 타입일 경우 : 불변성을 고려하여 setValue
      const newTopics = [...topics] // topics 복제본 생성
      newTopics.push(newTopic);      // topics의 복제본 수정 : newTopic push
      setTopics(newTopics);         // 수정한 topics의 복제본을 topics로 set

      // 추가된 topic의 상세 페이지로 넘어가기
      setId(nextId);
      setMode('READ');

      // 다음에 들어갈 id값 증가
      setNextId(nextId+1);
    }}></Create>
  }

  return (
    <div className="App">
      {/* Headet component에 title이라는 속성(prop)을 주고 싶음 -> title의 값이 보이도록*/}
      <Header title="WEB" onChangeMode={
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

      {/* js를 jsx로 바꾸니까 태그 자동완성 작동함!! */}
      <a href="/create" onClick={event=>{
        event.preventDefault(); // '/create'로 이동하지 않도록 막음
        setMode('CREATE');      // mode 상태를 'CREATE'으로 설정
      }}>Create</a>
    </div>
  );
}

export default App;
