Kakao.init('2ddea2b753ef482cbb3d98c01e207468');
Kakao.isInitialized();
console.log(Kakao.isInitialized());

function loginWithKakao() {
  Kakao.Auth.authorize({
    redirectUri: 'http://127.0.0.1:5500/index.html',
    state: 'userme',
  });
}


function requestUserInfo() {
  Kakao.API.request({
      url: '/v2/user/me',
    })
    .then(function (res) {
      alert(JSON.stringify(res));
    })
    .catch(function (err) {
      alert(
        'failed to request user information: ' + JSON.stringify(err)
      );
    });
}

// 아래는 데모를 위한 UI 코드입니다.
displayToken()

function displayToken() {
  const token = getCookie('authorize-access-token');
  if (token) {
    Kakao.Auth.setAccessToken(token);
    Kakao.Auth.getStatusInfo()
      .then(function (res) {
        if (res.status === 'connected') {
          document.querySelector('.token-result').innerText = 'login success, token: ' + Kakao.Auth.getAccessToken();
          document.querySelector('.logout').style.display = 'block';
        }
      })
      .catch(function (err) {
        Kakao.Auth.setAccessToken(null);
      });
  }
}

function getCookie(name) {
  const parts = document.cookie.split(name + '=');
  if (parts.length === 2) {
    return parts[1].split(';')[0];
  }
}