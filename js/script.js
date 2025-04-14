document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:5000/api/disaster')
    .then(response => {
      if (!response.ok) throw new Error('네트워크 응답 실패');
      return response.json();
    })
    .then(data => {
      const resultContainer = document.getElementById('result');
      const disasterList = document.getElementById('disaster-list');

      if (!data || !data.data) {
        resultContainer.innerHTML = '데이터가 없습니다.';
        return;
      }

      resultContainer.innerHTML = '<p>데이터를 성공적으로 불러왔습니다.</p>';

      const items = Array.isArray(data.data) ? data.data : [data.data];

      items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>발생일자:</strong> ${item.occrde || 'N/A'}<br>
          <strong>시도명:</strong> ${item.sido || 'N/A'}<br>
          <strong>소재지:</strong> ${item.gnrloc || 'N/A'}<br>
          <strong>피해면적:</strong> ${item.dmgarea || 'N/A'} ha<br>
        `;
        disasterList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('API 요청에 실패했습니다:', error);
      document.getElementById('result').innerHTML = 'API 요청에 실패했습니다.';
    });
});
