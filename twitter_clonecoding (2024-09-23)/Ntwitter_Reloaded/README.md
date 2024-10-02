# 📖 Nwitter Reloaded (트위터 클론코딩) 𝕏

노마드 코더 (https://nomadcoders.co/nwitter)의 강의를 보고 만든 트위터 클론코딩

📖 $<$ 표시 된 것은 직접 만든 코드 챌린지임

## 1. #1.0 ~ #1.3 에서 배우거나 만든 기능

- 프로젝트를 시작하기 전에 React, Vue를 세팅함

## 2. #2.0 ~ #2.3 에서 배우거나 만든 기능

- React에서 createBrowserRouter() ( router를 생성해주는 reacter의 메소드 )를 통해 Routing을 설정함
- useState()를 이용하여 어떤 함수의 기능이 시작하고 끝날 때 로딩 화면이 생기고 없어지게 함
- Firebase에서 프로젝트를 만들어 Firebase와 내 프로젝트를 연결함

## 3. #3.0 ~ #3.6 에서 배우거나 만든 기능

- Firebase의 <b>initializeApp() ( 저장된 Firebase의 config으로 Firebase 초기화 )</b>과 <b>getAuth() ( 초기화 된 Firebase를 인자로 받아 인증 서비스 생성 )</b>를 통해 Firebase의 인증 서비스를 구축함
- form에서 input이 여러개일 때 하나의 value 변수로 여러 input값을 받음
- Firebase의 <b>createUserWithEmailAndPassword() ( auth, email, password를 받아 계정을 생성 ), updateProfile() ( 계정의 프로필 정보를 수정 ) </b>을 사용하여 Firebase의 인증 서비스를 기반으로 한 계정생성 기능을 가진 페이지 생성
- <b>auth.currentUser (현재 로그인 된 유저의 정보를 가진 변수, 로그인이 안되어있다면 null)</b> 변수를 이용하여 현재 로그인한 상태인지를 판별하고 로그인하지 않은 사용자가 특정 라우트로 못 들어오게 함
- <b>signInWithEmailAndPassword() ( auth, email, password를 받아 계정 로그인 )</b> 로 Firebase를 이용한 로그인 페이지 생성
- <b>GithubAuthProvider() ( Github로 부터 provider를 받음 ), signInWithRedirect() ( auth, provider를 받아 계정 로그인 페이지를 열음 ), signInWithPopup() ( 위에서의 기능이 팝업으로 나타남 )</b> 과 Github의 Oauth 서비스를 통해 Firebase의 소셜 로그인 기능을 추가
- 📖 <b>sendPasswordResetEmail() ( 인자로 받은 email로 비밀번호 초기화 메일을 보냄 )</b> 로 비밀번호를 잃어버린 사용자에게 비밀번호 초기화 메일을 보내는 페이지

## 4. #4.0 ~ #4.7 에서 배우거나 만든 기능

- <b>Outlet() ( 해당 부모 route의 자식 route를 보여줌 )</b> 으로 홈, 프로필, 로그아웃 버튼이 있는 네비게이션 바를 구성함
- <b>getStorage() ( auth를 받아 storage와 연결 ), getFirestore() ( auth를 받아 db와 연결 )</b>로 Firebase의 DB와 Storage에 연결함
- <b>collection() ( db와 특정 주소를 받아 db속 특정 주소를 가리키는 reference를 반환 ), addDoc() ( 특정 reference에 data를 저장)</b> Firebase db에 사용자의 이름, uid, 트윗내용, 만들어진 시각을 담은 Tweet을 저장
- <b>ref() ( storage와 특정 주소를 받아 특정 주소를 가리키는 reference를 반환 ), uploadBytes() ( reference와 file을 받아 reference가 가리키는 주소에 file을 저장 ), getDownloadUrl() ( reference가 가리키는 주소에 존재하는 파일을 다운로드 할 수 있는 url 반환 )</b> 을 사용하여 유저가 Tweet을 사진과 함께 올릴 때 사진이 storage에 저장되도록 하고 db에 해당 사진을 다운로드 할 수 있는 url을 추가함
- 📖 업로드 되는 파일에 크기를 제한함 (1mb)
- <b>query() ( reference와 규칙을 받고 해당 규칙에 따라 reference안의 데이터를 반환함 )</b> 메소드를 사용하여 타임라인에 만들어진 시간 순으로 정렬된 Tweet을 띄움
- <b>onSnapshot() ( query와 이벤트 콜백 함수를 받아 query에 생긴 이벤트를 리스닝하여 콜백 함수를 부름, 함수가 종료되면 이벤트 리스닝을 해제하는 함수를 반환함 )</b>으로 유저가 타임라인을 볼 때 실시간으로 트윗에 대한 변경사항이 반영되고 타임라인을 보지 않으면 변경사항에 대한 이벤트 리스닝을 해제함으로써 낭비되는 비용을 없앰
- <b>deleteObject() ( reference를 받아 해당 데이터를 삭제함 )</b> 를 사용하여 Firebase db에 저장된 트윗을 삭제하는 버튼 생성
- 📖 유저가 올린 트윗을 수정할 수 있는 수정 버튼 생성

## #5.0 ~ #5.2 에서 배우거나 만든 기능

- 유저의 프로필 페이지를 만들고 유저가 직접 자신의 프로필 사진을 바꿀수 있게 만듬
- 쿼리를 이용하여 유저의 프로필 페이지에 유저가 올린 트윗들만 나올 수 있도록 함, 이때 Firebase에 규칙을 설정해주어야 함
- 📖 프포필 페이지에서 닉네임을 바꿀 수 있게 만듬

## #6.0 ~ #6.3 에서 배우거나 만든 기능

- Firebase의 배포기능을 통해 여태까지 만들었던 프로젝트를 domain을 가진 웹사이트로 만듬
- Firebase의 보안설정으로 로그인 된 사용자만 트윗을 읽고 만들수 있게 만들고 자신의 트윗만을 수정, 삭제할 수 있게 설정함
- Firebase로 생성한 API 키를 특정 주소에서만 쓸 수 있도록 설정함
