const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

// 공공데이터포털 API 설정
const serviceKey = 'ESBuAj2a3I79bZceLkVQAclJJuGrijE0fvEvBUVpTOYToFP0H31wNTef%2F0ZXRXVakvQxEaawGbiPOj2D%2BfBpCA%3D%3D';
const apiUrl = 'https://apis.data.go.kr/1400000/forestStusService/getfireStatsSearch';

app.get('/api/disaster', async (req, res) => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        serviceKey: decodeURIComponent(serviceKey),
        numOfRows: 5,
        pageNo: 1,
        dataType: 'XML', // 응답 타입을 XML로 요청
        searchStDt: '20240101',
        searchEdDt: '20240413'
      },
      headers: {
        Accept: 'application/xml'
      }
    });

    // XML 파싱 후 JSON으로 변환
    xml2js.parseString(response.data, { explicitArray: false }, (err, result) => {
      if (err) {
        console.error('XML 파싱 오류:', err);
        return res.status(500).json({ error: 'XML 파싱 실패' });
      }

      const items = result.response.body.items.item;
      res.json({ data: items });
    });
  } catch (error) {
    console.error('🔥 API 요청 실패:', error.message);
    res.status(500).json({ error: 'API 요청 실패', fullResponse: error.response?.data });
  }
});

app.listen(port, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});
