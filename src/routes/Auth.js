import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

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
      console.log(error);
    }
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
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
