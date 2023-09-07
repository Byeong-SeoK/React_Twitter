import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myBase";

function App() {
  const [init, setInit] = useState(false);
  //이 init은 사용자 정보가 초기화 됐는지 받는 state이다.
  //즉, firebase로 부터 데이터를 받아왔을 때 이 init이 true가 된다.

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //authService.currentUser를 통해서 현재 접근하는 User가
  //권한이 있는 User면 User객체를 반환하고 권한이 없으면 null을 반환한다.
  //그렇기 때문에 isLoggedIn의 초기값으로 줄 수 있다.
  //다만 React app 시작과 동시에 currentUser 정보를 넘겨주는 것이 아니고
  //처음에는 null값을 넘겨준다. 그리고 시간이 조금 지난 이후에 currentUser값을
  //넘겨주기 때문에 이 isLoggedIn을 통해서 처음에 바로 log in 창이 뜨지 못하고
  //항상 새로운 계정을 만들도록 유도 된다. 또 새로운 계정을 만들고 난 이후에도
  //로그인을 할 수 없다는 단점이 있다. 그래서 별도의 useState를 만들어서 해결한다.

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
    //이 authService의 onAuthStateChanged를 통해서 로그인 여부를 알 수 있다.
    //authService의 currentUser는 단순히 이 웹사이트에 저장된 사용자 정보만
    //알 수 있지, 해당 사용자가 로그인 되어있는지는 알 수 없다.
    //하지만 이 onAuthStateChanged를 통해서 해당 사용자가 로그인 되어있는지 알 수 있다.
    //로그인 되어있는지 여부는 모든 컴포넌트가 마운트 되기 전에 실행되어야 하므로
    //useEffect를 사용해서 그 정보를 받아오고 그 정보를 isLoggedIn과 init에 넣으면 된다.
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializaing..."}
      <footer>&copy; React_Twitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
