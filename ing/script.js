// 1. 텍스트 타이핑 효과 구현
(function() {
    // span 요소 노드 가져오기
    const spanE1 = document.querySelector("main h2 span");
    // const txtArr = ['Web Publisher', 'Front-End Developer', 'Web UI Designer', 'UX Designer', 'Back-End Developer'];
    const txtArr = ['Full Stack Developer !', 'Front-End Developer !', 'Back-End Developer !', 'Web Designer !'];
    let index = 0;
    // 화면에 표시할 문장 배열에서 요소를 하나 가져온 뒤, 배열로 만들기
    let currentTxt = txtArr[index].split("");

    function writeTxt() {
        spanE1.textContent += currentTxt.shift();
        if(currentTxt.length !== 0) {
            // 아직 글자가 다 타이핑되지 않은 상태(타이핑진행중)
            setTimeout(writeTxt, Math.floor(Math.random() * 100));
        } else {
            currentTxt = spanE1.textContent.split("");
            setTimeout(deleteTxt, 3000);
        }
    }

    function deleteTxt() {
        currentTxt.pop();
        spanE1.textContent = currentTxt.join("");
        if(currentTxt.length !== 0) {
            // 아직 글자가 다 지워지지 않은 상태(타이핑 삭제 진행중)
            setTimeout(deleteTxt, Math.floor(Math.random() * 100));
        } else {
            index = (index + 1) % txtArr.length;
            currentTxt = txtArr[index].split("");
            writeTxt();
        }
    }

    writeTxt();
})();

// 2. 스크롤 이동 시 헤더 영역에 스타일 적용하기
// 수직 스크롤이 발생하면 header 태그에 active 클래스 추가 or 삭제
const headerE1 = document.querySelector("header");
window.addEventListener('scroll', function() {
    requestAnimationFrame(scrollCheck);
});

function scrollCheck () {
    let browerScrollY = window.scrollY ? window.scrollY : window.pageYOffset;
    if (browerScrollY > 0) {
        // pageYOffset으로 수직 스크롤의 위치를 참조하고 그게 0보다 크면 스크롤이 되었다는 의미
        headerE1.classList.add("active");
    } else {
        headerE1.classList.remove("active");
    }
}

// 3. 부드러운 이동 애니메이션 효과
const animationMove = (selector) => {
    // 매개변수로 이동할 대상 요소 노드 가져오기기
    const targetE1 = document.querySelector(selector);
    // 현재 웹 브라우저의 스크롤 정보(y값)
    const browerScrollY = window.pageYOffset;
    // 이동할 대상의 위치(y값)
    const targetScrollY = targetE1.getBoundingClientRect().top + browerScrollY;
    window.scrollTo({top: targetScrollY, behavior: 'smooth'});
}
// 스크롤 이벤트 연결
const scollMoveEl = document.querySelectorAll("[data-animation-scroll='true']"); 
for(let i = 0; i < scollMoveEl.length; i++){
  scollMoveEl[i].addEventListener('click', function(e) {
    const target = this.dataset.target;
    animationMove(target);
  });
}

// scroll percentage
const getScrollPercent = () => {
    const scrolled = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    const viewHeight = document.documentElement.clientHeight;

    const percentage = scrolled / (pageHeight - viewHeight) * 100;
    document.querySelector('#scrollBar').style.width = `${percentage}%`;
};
window.addEventListener('scroll', getScrollPercent);