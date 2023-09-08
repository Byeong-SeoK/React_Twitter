import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "myBase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
      //아래의 input을 통해서 여러 개의 data를 한번에 받아온다.
    } = e;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    //async await을 통해서 서버로 부터 data가 올 때까지
    //이 함수의 실행을 대기시키고 다른 작업을 할 수 있게 한다.

    e.preventDefault();

    try {
      let data;
      const auth = getAuth();
      //getAuth를 통해서 firebase의 auth API를 사용할 수 있다.

      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
        //firebase의 내장함수를 통해서 새로운 계정을 만든다.
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
        //firebase의 내장함수를 통해서 로그인을 하도록 해준다.
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  //이 toggleAccount는 log in과 create account를 바꿀 수 있게 해주는 것이다.

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    //button의 onClick에서 발생한 event 객체안의 target key에 대한 value값을
    //받아서 객체 안에 저장하도록 한다.

    let provider;
    //provider는 firebase의 social login API를 받는 변수이다.
    //각 social login 함수마다 가지고 있는 값이 다른다.

    if (name === "google") {
      provider = new GoogleAuthProvider();
      console.log(provider);
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in." : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
