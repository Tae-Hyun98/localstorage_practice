Kakao.init('2ddea2b753ef482cbb3d98c01e207468');
Kakao.isInitialized();
console.log(Kakao.isInitialized());

function loginWithKakao() {
  Kakao.Auth.authorize({
    redirectUri: 'http://127.0.0.1:5500/index.html',
    state: 'userme',
  })
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



requestUserInfo()

function requestUserInfo() {
  Kakao.API.request({
      url: '/v2/user/me',
      data: {
        grant_type: 'authorization_code',
        //REST API키 입력
        client_id: '73b344e027790c81033aa3a2801a1e84',
        //redirect uri입력
        redirect_uri: 'http://127.0.0.1:5500/index.html',
        code: 'D3MJi6VGS_mEu0IDQJThZG6cYX1eEsRX6ZqfW7v-FW2SrdSHRO-8ZKXD0cM9GV2F21yQvAorDR4AA'
      }
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