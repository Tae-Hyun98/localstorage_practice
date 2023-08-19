//취소버튼
function cancle() {
  const cancelBtn = document.querySelector('.cancle');
  cancelBtn.addEventListener('click', () => {
    location.href = 'index.html'
  })
}
cancle();


//등록버튼
function register() {
  const regiBtn = document.querySelector('.register');
  const title = document.getElementById('title');
  const content = document.getElementById('content');

  regiBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //입력된 글
    const valueItem = {
      title: title.value,
      content: content.value
    };

    const posts = JSON.parse(localStorage.getItem('value')) || [];
    posts.unshift(valueItem)

    localStorage.setItem('value', JSON.stringify(posts));

    title.value = '';
    content.value = '';

    //json형태로 내보내기
    alert('게시글이 등록되었습니다.')
    location.href = 'index.html'
  })

}

register();