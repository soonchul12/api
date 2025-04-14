document.addEventListener('DOMContentLoaded', function () {
  let currentPage = 1; // 현재 페이지
  const pageSize = 10; // 페이지당 항목 개수

  // 페이지네이션을 위한 함수
  function loadFireData(page) {
    fetch(`http://localhost:5000/api/fire?startDate=20241001&endDate=20250414&pageNo=${page}&numOfRows=${pageSize}`)
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
        updatePaginationButtons();
      })
      .catch(error => {
        console.error('API 요청에 실패했습니다:', error);
        const resultContainer = document.getElementById('result');
        resultContainer.innerHTML = 'API 요청에 실패했습니다.';
      });
  }

  // 페이지네이션 버튼을 업데이트하는 함수
  function updatePaginationButtons() {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    // 이전 버튼 활성화/비활성화
    if (currentPage > 1) {
      prevButton.disabled = false;
    } else {
      prevButton.disabled = true;
    }

    // 다음 버튼 활성화/비활성화
    // (API에서 실제로 데이터를 몇 건 가져왔는지에 따라 조건을 추가해야 합니다.)
    nextButton.disabled = false; // 페이지가 끝나면 비활성화하는 로직 필요
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

  // 초기 데이터 로드
  loadFireData(currentPage);
});
