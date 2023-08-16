/* function mobileSide() {
  const menuBar = document.querySelector('.side_nav_icon');
  const menuIcon = document.querySelector('.side_nav_icon i');
  const sideMenu = document.querySelector('.lnb');
  let state = 0;

  menuBar.addEventListener('click', () => {
    if (state === 0) {
      sideMenu.classList.add('open');
      menuIcon.className = 'fas fa-times';
      state = 1;
    } else {
      sideMenu.classList.remove('open');
      menuIcon.className = 'fas fa-bars';
      state = 0;
    }
  })
}
mobileSide(); */


const list = document.querySelector('.list ul');
const listLi = document.querySelectorAll('.list ul li');

function addList() {
  let addhtml = '';
  let count = 0;
  const adlist = setInterval(() => {
    if (count > 4) {
      clearInterval(adlist)
    } else {
      addhtml += `<li>테스트${count}</li>`;
      list.innerHTML = addhtml;
      count++;
    }
  }, 1000)

  /* listLi.forEach((item,idx)=>{
    item.style.opacity=1
  }) */
}

// addList();

function countPlus() {
  let countp = 0;
  const span = document.querySelector('.count span');
  const plus = setInterval(() => {
    if (countp > 100) {
      clearInterval(plus);
    } else {
      span.innerHTML = countp
      countp++
    }
  }, 30)
}
// countPlus();


const tab = document.querySelectorAll('.tab a');
const tabImg = document.querySelectorAll('.img_box div');

tab.forEach((item, idx) => {

  item.addEventListener('click', (e) => {
    e.preventDefault();
    const dataTab = e.target.dataset.tab;
    const tabId = tabImg[idx].id;
    for (let el of tab) {
      el.classList.remove('on');
    }
    for (let el of tabImg) {
      el.classList.remove('on');
    }
    if (dataTab === tabId) {
      tab[idx].classList.add('on');
      tabImg[idx].classList.add('on');
    }
  });
});



const popupBox = document.querySelector('.popupbox');
const tomorrowClose = document.getElementById('tomorrow');
const closePopup = document.getElementById('close');

closePopup.addEventListener('click', (e) => {
  e.preventDefault();
  popupBox.style.display = 'none'
})

const togglePopup = function () {
  let handleStorage = {
    setStorage: function (name, exp) {
      let date = new Date();
      date = date.setTime(date.getTime() + exp * 1000);

      localStorage.setItem(name, date)
    },
    getStorage: function (name) {
      let now = new Date();
      now = now.setTime(now.getTime());

      //스토리지의 지정한 date(시각)와 현재시간 비교하여 true, false리턴
      return parseInt(localStorage.getItem(name)) > now
    }
  }

  //로컬스토리지의 popup이름을 getStorage로 받아오기
  if (handleStorage.getStorage('popup')) {
    popupBox.style.display = 'none';
  } else {
    popupBox.style.display = 'block';
  }
  tomorrowClose.addEventListener('click', () => {
    //setStorage로 (name, exp) 매개변수값 할당
    handleStorage.setStorage('popup', 10);
    popupBox.style.display = 'none'
  })
}

togglePopup();



//로컬스토리지 받은값을 DOM엘리먼트에 추가
function renderPost() {
  let date = new Date();
  const notiWrite = document.querySelector('.notice_box ul');
  notiWrite.innerHTML = '';

  //value로컬스토리지 받아와서 parse후 있으면 posts변수에 저장 아니면 []값
  const posts = JSON.parse(localStorage.getItem('value')) || [];

  posts.forEach((item, idx) => {
    const Li = document.createElement('li');
    Li.innerHTML = `
    <div>
      <span>${posts.length - idx}</span>
    </div>

    <div class='tit'>
      ${item.title}
    </div>

    <div class='cont'>
      ${item.content}
    </div>
    
    <div>
      ${date.getFullYear()+ '-'+ (date.getMonth()+1)+'-'+date.getDate()}
    </div>
    `
    notiWrite.appendChild(Li);
  })
}

renderPost();



//카카오 로그인

function loginWithKakao() {
  Kakao.Auth.authorize({
    //로그인성공시 리다이렉션uri
    redirectUri: 'http://127.0.0.1:5500/index.html',
  });
  Kakao.Auth.login({
    scope: 'profile_nickname, profile_image, gender, age_range, birthday',
    success: function (authObj) {
      console.log(authObj);
      Kakao.API.request({
        url: '/v2/user/me',
        success: res => {
          const kakao_account = res.kakao_account;
          console.log(kakao_account)
        }
      })
    }
  })
}

function logoutWithKakao() {
  Kakao.Auth.logout({
      redirectUri: 'http://127.0.0.1:5500/index.html'
    })
    .then(function () {
      alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken());
      deleteCookie();
    })
    .catch(function () {
      alert('Not logged in');
    });
}

function deleteCookie() {
  document.cookie = 'authorize-access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


// 아래는 데모를 위한 UI 코드입니다.
displayToken()

function displayToken() {
  let token = Kakao.Auth.getAccessToken();
  if (token) {
    Kakao.Auth.setAccessToken(token);
    Kakao.Auth.getStatusInfo()
      .then(function (res) {
        if (res.status === 'connected') {
          document.getElementById('token-result').innerText = 'login success, token: ' + Kakao.Auth.getAccessToken();
        }
      })
      .catch(function (err) {
        Kakao.Auth.setAccessToken(null);
      });
  }

}

function getCookie(name) {
  var parts = document.cookie.split(name + '=');
  if (parts.length === 2) {
    return parts[1].split(';')[0];
  }
}