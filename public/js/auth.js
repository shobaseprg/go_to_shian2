let loginUser;

firebase.auth().onAuthStateChanged((user) => {
  let status = document.querySelector('h3');
  let info = document.querySelector('#info');
  loginUser = user;

  if (user) {
    status.innerText = 'ログイン中';
    info.innerHTML = `uid : ${user.uid}`;
  }
  else {
    location.href = "/";
  }

  let logout = document.getElementById("logout");

  logout.addEventListener("click", () => {
    firebase.auth().signOut().then(() => {
      console.log("ログアウトしました");
      location.href = "/";
    })
      .catch((error) => {
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });
  });
});
