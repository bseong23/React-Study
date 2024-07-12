import './App.css';
import { useState } from 'react';

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a href={"/content/"+t.id} onClick={(e) => {
        e.preventDefault();
        props.onchageMode(t.id);
      }}>{t.title}</a></li>);};
  return (
  <nav>
    <ol>
      {lis}
    </ol>
  </nav>)
}

function Article(props) {
  return <article>
    <h1>{props.title}</h1>
    <p>{props.body}</p>
  </article>
}

function Header(props) {
  return <header> 
    <h1><a href="/" onClick={(e) => {
      e.preventDefault();
      props.onchageMode();
    }}>{props.tilte}</a>
    </h1>
  </header>
}

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={e => {
      e.preventDefault();
      const title = e.target.title.value;
      const body = e.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"></input></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type='submit' value="Create"></input></p>
    </form>
  </article>
}

function App() {
  // const _mode = useState("WELCOME")
  // const mode = _mode[0];
  // const setMode = _mode[1];
  // 위의 세 줄을 아래 한 줄로 줄일 수 있음
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4); 
  const [topics, setTopics] = useState([
    {id : 1, title : "HTML", body: "HTML is ..."},
    {id : 2, title : "CSS", body: "CSS is ..."},
    {id : 3, title : "JavaScript", body: "JavaScript is ..."},
  ]);

  let content = null;
  // WELCOME, READ, CREATE
  if(mode === "WELCOME") {
    content = <Article title="WELCOME" body="Hello, React"></Article>
  } else if(mode === "READ") {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id)
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
        break;
      }
    }
    content = <Article title={title} body={body}></Article>
  } else if (mode === "CREATE") {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = {id: nextId, title: _title, body: _body};
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);

      // 1. 기존의 topics를 복사
      // const newTopics = [...topics];
      // newTopics.push({id: nextId, title: _title, body: _body});

      // 2. 복사한 topics에 새로운 topic을 추가
      // topics.push({id: nextId, title: _title, body: _body});
      // setTopics(
      //   (prev) => [...prev, {id: nextId, title: _title, body: _body}],
      // );
      
      setTopics(newTopics);
      setId(nextId);  
      setMode("READ");
      // setTopics(topics);
      setNextId(nextId + 1);
    }}></Create>
  }


  return (
    <div>
      <Header tilte="React" onchageMode={() => {
        setMode("WELCOME");
        // mode = "WELCOME";
        // console.log(mode);
      }}></Header> 
      <Nav topics={topics} onchageMode={(_id) => {
        setMode("READ");
        setId(_id);
        // mode = "READ";
        // console.log(mode);
      }}></Nav>
      {content}
      <a href="/content" onClick={(e) => {
        e.preventDefault();
        setMode("CREATE");
      }}>Create</a>
    </div>
  );
}

export default App;
