import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myBase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  //authService.currentUser를 통해서 현재 접근하는 User가
  //권한이 있는 User면 User객체를 반환하고 권한이 없으면 null을 반환한다.
  //그렇기 때문에 isLoggedIn의 초기값으로 줄 수 있다.

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; React_Twitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
