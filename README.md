# 🤖 NOVA — 딥노이드 임직원 전용 AI 도우미

## 📦 포함 파일
```
nova-chatbot/
├── index.html        ← NOVA 챗봇 메인 화면
├── api/
│   └── chat.js       ← Anthropic API 프록시 (서버)
├── vercel.json       ← Vercel 설정
├── package.json
└── README.md
```

---

## 🚀 Vercel 배포 가이드 (처음부터 끝까지)

### 준비물
- 이메일 계정 (GitHub + Vercel 가입용)
- Anthropic API 키 (Claude 콘솔에서 확인)

---

### STEP 1 — GitHub 계정 만들기
1. https://github.com 접속
2. "Sign up" 클릭 → 이메일로 가입

### STEP 2 — GitHub에 파일 올리기
1. https://github.com/new 접속
2. Repository name: `nova-chatbot` 입력
3. "Create repository" 클릭
4. "uploading an existing file" 클릭
5. `nova-chatbot` 폴더 안의 **모든 파일**을 드래그&드롭
   - index.html
   - api/chat.js (api 폴더째로)
   - vercel.json
   - package.json
6. "Commit changes" 클릭

### STEP 3 — Vercel 가입 및 배포
1. https://vercel.com 접속 → "Sign Up" → "Continue with GitHub"
2. 로그인 후 "Add New → Project" 클릭
3. `nova-chatbot` 저장소 선택 → "Import" 클릭
4. 설정은 기본값 유지 → **"Deploy" 클릭**

### STEP 4 — Anthropic API 키 등록 (⭐ 핵심)
1. Vercel 대시보드에서 `nova-chatbot` 프로젝트 클릭
2. "Settings" 탭 → "Environment Variables" 클릭
3. 아래 내용 입력:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: `sk-ant-...` (본인의 API 키)
4. "Save" 클릭
5. "Deployments" 탭 → 최신 배포 옆 `...` → "Redeploy" 클릭

### STEP 5 — URL 확인 및 공유
1. Vercel 대시보드 상단에서 URL 확인
   - 예시: `https://nova-chatbot-deepnoid.vercel.app`
2. 이 URL을 임직원에게 공유하면 끝! 🎉

---

## 🔑 기본 로그인 계정

| 아이디    | 비밀번호       | 이름    | 권한   |
|----------|--------------|--------|-------|
| sh.lee   | deepnoid1234 | 이성훈  | 관리자 |
| yrkim    | deepnoid1234 | 김유리  | 일반   |
| khbaek   | deepnoid1234 | 백경현  | 일반   |
| hyjung   | deepnoid1234 | 정희영  | 일반   |
| majin    | deepnoid1234 | 진민아  | 일반   |
| jhyun    | deepnoid1234 | 현지훈  | 일반   |

> 계정 추가/수정: `index.html` 파일의 `ACCOUNTS` 섹션 수정

---

## 🛠 계정 추가 방법

`index.html`에서 아래 부분을 찾아서 추가:

```js
const ACCOUNTS = {
  "sh.lee": { pw:"deepnoid1234", name:"이성훈", dept:"P&C팀", title:"과장", role:"admin" },
  // 여기에 추가:
  "새아이디": { pw:"비밀번호", name:"홍길동", dept:"소속팀", title:"직급", role:"user" },
};
```

---

## ❓ 자주 묻는 질문

**Q: URL이 너무 길어요**
→ Vercel 대시보드 Settings → Domains → 커스텀 도메인 연결 가능 (사내 도메인 사용 가능)

**Q: NOVA 답변 내용을 수정하고 싶어요**
→ `index.html`의 `SYS` 변수(시스템 프롬프트) 수정

**Q: FAQ를 추가하고 싶어요**
→ `index.html`의 `FAQS` 배열에 항목 추가

**Q: 보안이 걱정돼요**
→ 현재는 프론트엔드에 계정 정보가 있습니다. 완전한 보안이 필요하다면 별도 사용자 DB 구축 필요 (고도화 단계)

---

## 📞 문의
P&C팀 이성훈 과장: sh.lee@deepnoid.com / 010-9588-0153
