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
  let obj = [];

  regiBtn.addEventListener('click', () => {
    //입력된 글
    const Title = title.value;
    const Content = content.value;

    obj.push({
      title: Title,
      content: Content
    })

    localStorage.setItem('글', JSON.stringify(obj));

    //json형태로 내보내기
    // localStorage.setItem('저장', JSON.stringify(obj));

    // alert('게시글이 등록되었습니다.')
    // location.href = 'index.html'
  })

}

register();