import {
  useEffect,
  useState,
  useContext,
  useRef,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import Sl91994Context from ".";
import "./App.css";
import SomeChild from "./SomeChild";
import useLocalStorage from "./useLocalStorage";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};

function App() {
  const ref = useRef();

  // useReducer
  const [state, dispatch] = useReducer(reducer, 0);

  // useContext
  const sl91994Info = useContext(Sl91994Context);

  // useState
  // 変更されたときに処理と再レンダリングを行える｡
  // 前と後のVDOMの差分を見ることで､一部だけをレンダリングでき､パフォーマンスが上がる｡
  const [countUp, setCoutnUp] = useState(0);

  const handleCountUp = () => {
    setCoutnUp(countUp + 1);
  };

  // useEffect
  // 処理の発火のタイミングを決める｡
  // 第二引数に[]ブラケットを置くことで､ページがマウントされたときに処理が行われる｡
  useEffect(() => {
    console.log("Hello Hooks");
  }, [countUp]);

  // useRef
  // reference(参照する)
  const handleRef = () => {
    console.log(ref.current.value);
    console.log(ref.current.offsetHeight);
    console.log(ref.current.offsetWidth);
  };

  // useMemo{ブラウザーのメモリに保存(メモ)する}
  // 値のメモ化
  // 無駄な処理を実行しないようにして､パフォーマンスを上げる｡
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  // 重い処理
  // const square = () => {
  //   let i = 0;
  //   while (i < 2) {
  //     i++;
  //   }
  //   return count02 * count02;
  // };

  // 重い処理
  // count02が変更されたときにcout02の処理を見る
  const square = useMemo(() => {
    let i = 0;
    while (i < 2) {
      i++;
    }
    return count02 * count02;
  }, [count02]);

  // useCallback
  // 関数のメモ化
  const [counter, setCounter] = useState(0);

  // const showCount = () => {
  //   alert("これは重い処理です");
  // };

  const showCount = useCallback(() => {
    alert("これは重い処理です");
  }, [counter]);

  // カスタムフック
  const [age, setAge] = useLocalStorage("age", 24);

  const [changeAge, setChangeAge] = useState("");
  const handleAgeChange = (e) => {
    setChangeAge(e.target.value);
  };

  return (
    <>
      <div>
        <h1>react-hooksについて学ぼう！</h1>
        <h2>useState, useEffect</h2>
        <button onClick={handleCountUp}>++</button>
        <p>{countUp}</p>

        <hr />

        <h2>useContext</h2>
        <p>名前: {sl91994Info.name}</p>
        <p>年齢: {sl91994Info.age}歳</p>

        <hr />

        <h2>useRef</h2>
        <input type="text" ref={ref} />
        <button onClick={handleRef}>useRef</button>

        <hr />

        {/* Reduxの考えが必要 */}
        <h2>useReducer</h2>
        <p>カウント: {state}</p>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>

        <hr />

        {/* useMemoは値をメモ化する */}
        <h2>useMemo</h2>
        <div>カウント1: {count01}</div>
        <div>カウント2: {count02}</div>
        <div>結果: {square}</div>
        <button onClick={() => setCount01(count01 + 1)}>+</button>
        <button onClick={() => setCount02(count02 + 1)}>+</button>

        <hr />

        {/* useCallbackは関数をメモ化する */}
        <h2>useCallback</h2>
        <SomeChild showCount={showCount} />

        <hr />

        {/* 自作Hooksを作る */}
        <h2>カスタムフック</h2>
        <p>{age}</p>
        <input type="text" onChange={handleAgeChange} />
        <button onClick={() => setAge(changeAge)}>年齢をセット</button>
      </div>
    </>
  );
}

export default App;

// Reactでは､親コンポーネントがレンダリングされると､子コンポーネントもレンダリングされる｡
