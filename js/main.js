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






function logoutWithKakao() {
  Kakao.Auth.logout()
    .then(function () {
      alert('로그아웃되었습니다 \n access token -> ' + Kakao.Auth.getAccessToken());
      deleteCookie();
      document.getElementById('kakao-login-btn').style.visibility = 'visible';
    })
    .catch(function () {
      alert('로그인되어 있지 않습니다.');
      document.getElementById('kakao-login-btn').style.visibility = 'visible';
    });

}

function deleteCookie() {
  document.cookie = 'authorize-access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


$.ajax({
  type: "POST",
  url: 'https://kauth.kakao.com/oauth/token',
  contentType: 'application/x-www-form-urlencoded;charset=utf-8',
  data: {
    grant_type: 'authorization_code',
    //REST API키 입력
    client_id: '73b344e027790c81033aa3a2801a1e84',
    //redirect uri입력
    redirect_uri: 'http://127.0.0.1:5500/index.html',
    code: 'D3MJi6VGS_mEu0IDQJThZG6cYX1eEsRX6ZqfW7v-FW2SrdSHRO-8ZKXD0cM9GV2F21yQvAorDR4AAAGKCVWLvw'
  },

  dataType: null,
  success: function (response) {
    Kakao.Auth.setAccessToken(response.access_token);
    document.querySelector('button.api-btn').style.visibility = 'visible';
    document.getElementById('kakao-login-btn').style.visibility = 'hidden';
    document.querySelector('.token-result').innerText = 'login success, token: ' + Kakao.Auth.getAccessToken();
    document.querySelector('.logout').style.display = 'block';

  },
  error: function (jqXHR, error) {

  }
});