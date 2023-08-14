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


const writing = document.querySelector('.writing a');
const wriPopup = document.querySelector('.writing_popup');
const resiger = document.getElementById('register');
const cancle = document.getElementById('cancle');

writing.addEventListener('click', () => {
  wriPopup.style.display = 'block'
})
cancle.addEventListener('click', function () {
  wriPopup.style.display = 'none'
})

const title = document.querySelector('.tit_inp input');
const content = document.querySelector('.cont_inp textarea');

resiger.addEventListener('click', (e) => {
  e.preventDefault();

  const valueCont = {
    title: title.value,
    content: content.value
  }

  const posts = JSON.parse(localStorage.getItem('value')) || [];
  posts.push(valueCont)

  localStorage.setItem('value', JSON.stringify(posts));

  renderPost();

  title.value = '';
  content.value = '';
})

function renderPost() {
  let date = new Date();
  const notiWrite = document.querySelector('.notice_box ul');
  notiWrite.innerHTML = '';
  const posts = JSON.parse(localStorage.getItem('value')) || [];

  posts.forEach((item, idx) => {
    const Li = document.createElement('li');
    Li.innerHTML = `
    <div>
      <span>${idx+1}</span>
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