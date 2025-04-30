// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // CORS 설정을 위해 필요

const app = express();
const port = 5000;

// CORS 허용 (프론트에서 요청 가능하게 함)
app.use(cors());

// /api/fire API 라우트
app.get('/api/fire', async (req, res) => {
  const { startDate, endDate, pageNo = 1, numOfRows = 10 } = req.query; // 기본값은 페이지 1, 한 번에 10개 항목

  // 공공데이터포털 서비스 키 (이미 encodeURIComponent 처리됨)
  const serviceKey = 'pDunhrdNvnd/g4M+urxAC5hOdq+UxIjUt9LBKxqyl+EiGPiXnghtXwMJYV6v40CXOeZ6iiGf9IilPOUrYfuoRQ==';

  // API 요청 URL
  const url = `https://apis.data.go.kr/1400000/forestStusService/getfirestatsservice?serviceKey=${encodeURIComponent(serviceKey)}&searchStDt=${startDate}&searchEdDt=${endDate}&pageNo=${pageNo}&numOfRows=${numOfRows}`;

  try {
    // API 요청
    const response = await axios.get(url);
    console.log('✅ 응답 성공!');
    
    // 결과 반환
    res.json(response.data.response.body.items.item);
  } catch (error) {
    console.error('❌ API 요청 실패:', error.message);
    res.status(500).json({ error: 'API 요청 실패', details: error.message });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});
