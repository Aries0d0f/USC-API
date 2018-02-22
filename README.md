# USC-ClassTabel-API
實踐大學非官方課表 API

## Usage
```http
GET https://uscapi.aries0d0f.me/學號/欲查詢學年/上下學期（上學期 1，下學期 2）
```
## Data Structure
```javascript
[
  {
    "classID": 科目序號,
    "year": 學年,
    "term": 學期,
    "class": 班別,
    "classCode": 科目代碼,
    "className": 科目名稱,
    "termType": 學期別,
    "state": 修別,
    "unit": 學分數,
    "credit": 上課時數,
    "teacher": 教師,
    "room": 教室,
    "time": {
      "day": 星期,
      "part": [堂次]
     },
     "exempt": 是否抵免,
     "cancel": 是否停修
  },
  ...
  {
    ...
  }
]
```
