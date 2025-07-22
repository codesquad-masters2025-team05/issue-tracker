# issue-tracker
## 📌 프로젝트 소개

**2025 마스터즈 팀 프로젝트**로 진행한 이슈 트래커입니다.

이슈 상태, 담당자, 마일스톤, 라벨 등 다양한 속성을 기준으로 이슈를 체계적으로 관리할 수 있도록 직접 설계 및 구현하였습니다.

---

## 🚀 주요 기능

- **회원 가입 / 로그인 (JWT 기반 인증)**
- **이슈 CRUD** (생성 / 조회 / 수정 / 삭제)
- **마일스톤 및 라벨 관리**
- **담당자 및 작성자 지정**
- **이슈 필터링 및 검색**
- **GitHub OAuth2 로그인**

## 팀원 
|                                                    나고                                                     |                                                    디노                                                    |                                                    배찌                                                    |
|:---------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------:|
| <img src="https://github.com/user-attachments/assets/ddd213ef-3201-4e89-8da6-1493ee23571a" width="120"/>  | <img src="https://github.com/user-attachments/assets/4af9272e-159b-4e81-b4a2-4269f47a2288" width="120"/> | <img src="https://github.com/user-attachments/assets/63cd6dfb-b3d1-40da-ab7b-d60433cef57b" width="120"/> |
🦊 frontend|                                                🦖 backend                                                |                                                🐯 backend                                                |                                                                                                           |


## 링크

- [🍡 프로젝트 사이트](https://www.issue-tracker.online)
- [🐈‍⬛ Github 링크](https://github.com/codesquad-masters2025-team05/issue-tracker.git)
- [📖  Notion 링크](https://flowery-unicorn-313.notion.site/CodeSquard-team05-1909003424f180438a2dd668361f3bf4?pvs=4)

## 브랜치 구조

```
main                ← 최종 배포 브랜치
├─ dev-be           ← 전체 기능 통합 브랜치
│  ├─ be/CS-11/feature-auth/login
│  └─ be/CS-12/feature-auth/signup
└─ dev-fe
    └─ fe/CS-15/feature-auth/login-ui
```

## 🧑‍💻 백엔드 스택

### 🛠️ 기술 스택
- Java 21 / Spring Boot 3.4.5
- Gradle
- MySQL
- JDBC
- GitHub Actions (CI/CD)
- AWS EC2, RDS, S3
- Ngnix

### 📁 시스템 아키텍처

<img src="https://github.com/user-attachments/assets/0c016136-279c-4937-9a52-4d660fd0b93c" width="600" />


### 🍎 ERD
<img src="https://github.com/user-attachments/assets/eb231848-16ef-49fa-b854-95650fae9e03" width="600" />

---

## 🧑‍💻 프론트엔드 

### 🛠️ 기술 스택
- React 19.1.0
- Vite 6.3.5
- TypeScript 5.8.3
- Tailwind CSS 4.1.6 (shadcn/ui)
- Biome 1.9.4 (lint & format)
- react-router-dom 7.6.0
- Zustand 5.0.4
- Immer 10.1.1

### 📁 프로젝트 구조

```aiignore
src/
    └── app/
        ├── layout/                  # AppLayout, NoHeaderLayout 등 레이아웃 컴포넌트
        ├── providers/               # Router.tsx 등
        ├── main.tsx                 # ReactDOM.render 진입점
        └── App.tsx                  # 최상위 진입점 (Router 설정 등)
    └── pages/
        ├── IssueListPage/           # /issues
        ├── IssueDetailPage/         # /issues/:id
        ├── LoginPage/               # /login
        ├── LabelListPage/           # /labels
        └── MilestoneListPage/       # /milestones
    └── entities/
        ├── issue/                   # model, api, hooks, fixtures
        ├── user/                    # model, api, hooks, fixtures
        ├── label/                   # model, api, hooks, fixtures
        └── milestone/               # model, api, hooks, fixtures
    └── features/
        ├── issueList/               # issue filters, sort, search 등 비즈니스 로직 컴포넌트
    └── shared/
        ├── api/                     # client.ts, types.ts, mockData.ts
        ├── auth/                    # AuthGuard.tsx (Router에서 감쌈)
        ├── theme/                   # Globals.css ThemeToggleButton.tsx 등 테마 정의 및 테마 변경 컴포넌트
        ├── ui/                      # Button, CustomDropdownPanel, Input 등 재사용 컴포넌트
        └── utils/                   # shadcn-utils, date-format, classname merge 등
    └── widgets/
        └── Header/                  # Header 위젯

```


---
