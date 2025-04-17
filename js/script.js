document.addEventListener('DOMContentLoaded', function () {
  // 산불 데이터 페이지네이션 처리
  let currentPage = 1; // 현재 페이지
  const pageSize = 10; // 페이지당 항목 개수

  // 산불 데이터 요청 함수
  function loadFireData(page) {
    fetch(`http://localhost:5000/api/fire?startDate=20201001&endDate=20240414&pageNo=${page}&numOfRows=${pageSize}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답에 실패했습니다.');
        }
        return response.json();
      })
      .then(data => {
        console.log('API 데이터:', data);

        const resultContainer = document.getElementById('result');
        resultContainer.innerHTML = `<p>불러온 산불 정보 ${data.length}건:</p>`;

        const disasterList = document.getElementById('disaster-list');
        disasterList.innerHTML = ''; // 기존 목록 초기화

        data.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>날짜:</strong> ${item.startyear}-${item.startmonth}-${item.startday}<br>
            <strong>시간:</strong> ${item.starttime}<br>
            <strong>장소:</strong> ${item.locsi} ${item.locgungu} ${item.locdong}<br>
            <strong>피해 면적:</strong> ${item.damagearea} ha<br>
            <strong>원인:</strong> ${item.firecause}
          `;
          disasterList.appendChild(li);
        });

        // 페이지네이션 버튼 활성화/비활성화 처리
        updatePaginationButtons(data.length);
      })
      .catch(error => {
        console.error('API 요청에 실패했습니다:', error);
        const resultContainer = document.getElementById('result');
        resultContainer.innerHTML = 'API 요청에 실패했습니다.';
      });
  }

  // 페이지네이션 버튼을 업데이트하는 함수
  function updatePaginationButtons(dataLength) {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    // 이전 버튼 활성화/비활성화
    prevButton.disabled = currentPage <= 1;

    // 다음 버튼 활성화/비활성화
    nextButton.disabled = dataLength < pageSize; // 데이터가 부족하면 다음 버튼 비활성화
  }

  // 이전 페이지로 이동
  document.getElementById('prev-button').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      loadFireData(currentPage);
    }
  });

  // 다음 페이지로 이동
  document.getElementById('next-button').addEventListener('click', () => {
    currentPage++;
    loadFireData(currentPage);
  });

  // 이미지 슬라이드 관련 처리
  let currentIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) slide.classList.add('active');
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // 자동 슬라이드
  setInterval(nextSlide, 5000); // 5초마다 자동 슬라이드

  // 초기 데이터 로드
  loadFireData(currentPage);
});
