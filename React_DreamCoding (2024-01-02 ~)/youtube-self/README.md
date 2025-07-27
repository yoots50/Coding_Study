# Youtube 클론코딩

드림코딩(DreamCoding)의 React 강의 중 유튜브 프로젝트를 하기 전 스스로 해기 위해 만든 Youtube 클론코딩 프로젝트.</br></br>
아래는 패치노트로, 기능의 수정, 추가, 제거 등을 기록함

## 2025-05-14

### App.js

- App.js에 Route 추가 (Root, ErrorPage, Home, Video)

### Root 페이지

- Root 페이지 추가
- Outlet 컴포넌트를 통해 Navbar가 항상 위에 있도록 함

### Home 페이지

- Home 페이지 추가
- fetch를 통해 data.json(더미 데이터)을 받아 영상들의 목록을 보여줌

### Components

- Navbar 추가
- youtube 글자를 누르면 home 페이지로 가게하고 검색바를 추가함, 검색바의 기능은 향후 추가될 예정

### Video 페이지

- Video 페이지 추가
- Video 페이지의 기능은 향후 추가될 예정

### 그 외

- CSS 개선

## 2025-05-19

### Video 페이지

- Youtube API를 활용하기 위해 fetch 함수로 GET요청을 보내 영상정보를 받아오고 페이지에 영상, 영상의 제목과 설명란을 표시함

### 그 외

- CSS 개선

## 2025-05-21

### Search 페이지

- 검색 기능 추가

### Video 페이지

- Video 페이지 내 사이드 바 추가
- Video 페이지 채널 정보 추가
- fetching 단계에서 loading 변수를 통해 에러를 막음

### Channel 페이지

- Channel 페이지 추가

### Componenets

- VideoPlayer, VideoList, VideoInfo, SearchList 추가

### 그 외

- 페이지에 있던 기능들을 컴포넌트로 옮김 (VideoPlayer, VideoList, VideoInfo)
- CSS 개선 (Home 페이지 반응형 레이아웃 추가)

## 2025-05-26

### Home 페이지

- channelData를 fetching함
- fetch 함수를 비동기 함수로 만듬

### Video 페이지

- channelData를 fetching함

### Search 페이지

- isLoading 변수를 추가

### Components

- VideoList와 SearchList를 없애고 VideoThumbnail 컴포넌트를 만들어 이를 Home.jsx, Video.jsx, Search.jsx에 재사용함
- VideoThumbnail에서 받은 data를 사용하여 channelData를 불러오고 채널 썸네일을 img태그를 통해 만듬

### 그 외

- CSS 개선

## 2025-06-27

### Context

- 다크모드 기능을 만들기 위해 DarkModeContext.jsx를 만듬

### App.jsx

- DarkModeProvider 추가

### 모든 하위 컴포넌트 및 페이지들

- isDarkMode, onDarkModeChange 변수를 받게하여 다크모드 테마를 적용시킬 수 있도록 함

### CSS

- index.css 파일에 html태그가 dark 클래스가 붙으면 적용할 색을 추가
