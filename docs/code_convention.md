# Code convention

# 1. 변수명 컨벤션

## a. 변수명 규칙
- CamelCase를 사용.
- 명확하고 직관적인 이름을 사용.
- 약어와 축약형은 지양 (btn 대신 button, usr 대신 user).

예시:
```typescript
const userName: string = "John Doe";
const isLoggedIn: boolean = true;
const userAge: number = 30;
```

## b. 상수
- 상수는 UPPER_SNAKE_CASE로 작성.
- 설정값이나 환경변수 등 변경되지 않는 값에만 사용.

예시:
```typescript
const API_BASE_URL = "https://api.example.com";
const MAX_ITEMS_PER_PAGE = 20;
```

# 2. 폴더 및 파일명

## a. 폴더 구조 (Feature-First)

기능별로 디렉토리를 나누고, 관련 파일을 한 곳에 모음.
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   ├── types.ts
│   │   ├── context/
│   │   │   ├── AuthContext.tsx
│   │   ├── authSlice.ts
│   │   └── index.ts
├── shared/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Header.tsx
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   ├── utils/
│   │   ├── helpers.ts
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
```

## b. 파일명 규칙
#### 1.	컴포넌트 파일
- React 컴포넌트는 PascalCase로 작성.
> 예: LoginForm.tsx, DashboardCard.tsx

#### 2.	Hook 파일
- Hook은 camelCase로 작성하며 use로 시작.
> 예: useAuth.ts, usePagination.ts

#### 3.	유틸리티 파일:
- 함수 등은 camelCase로 작성.
> 예: helpers.ts, formatDate.ts

#### 4.	타입 파일:
- 특정 엔티티의 타입은 PascalCase, 공통 타입은 camelCase.
> 예: User.ts, apiResponse.ts

#### 5.	Context 파일:
- Context 관련 파일은 PascalCase.
> 예: AuthContext.tsx, ThemeContext.tsx

--- 

# 3. 코드 스타일

### a. 컴포넌트 작성 방식
- Functional Component를 기본으로 사용.
- 상태 관리와 로직 분리를 위해 Custom Hooks와 Context 활용.

```typescript
// LoginForm.tsx
import React from "react";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit("username", "password");
    }}>
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
```


## b. 스타일링 규칙
- Tailwind CSS 사용.

```
<button className="bg-blue-500">Click Me</button>
```

## c. 주석 방식
- 주석은 꼭 필요한 경우에만 작성.
- 함수/컴포넌트에는 JSDoc 스타일 주석을 사용하여 타입과 의도를 설명.

```javascript
/**
 * Fetches user data from the API.
 * @param userId - ID of the user to fetch.
 * @returns A promise that resolves to the user data.
 */
async function getUser(userId: string): Promise<User> {
  const response = await fetch(`/api/users/${userId}`);
  return await response.json();
}
```

# 4. 상태 관리 및 Context

## a. 상태 관리 규칙
- Feature-Specific한 상태는 useState와 useReducer로 관리.
- 전역 상태는 Zustand 활용

```typescript
// features/auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
```

# 5. ESLint & Prettier 설정
- ESLint로 코드 품질 검사.
- Prettier로 코드 스타일 자동 정리.

기본 설정 예시:

```json
// .eslintrc.json
{
  "extends": [
    "react-app",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "react/jsx-filename-extension": ["warn", { "extensions": [".tsx"] }],
    "@typescript-eslint/no-unused-vars": ["error"]
  }
}
```

```json
// .prettierrc
{
  "singleQuote": true,
  "trailingComma": "es5",
  "semi": true
}
```

# 6. 기타 컨벤션
## 1.	테스트:
- 파일명: [ComponentName].test.tsx
- 단위 테스트는 Jest 및 React Testing Library 사용.

## 2.	Import 순서:
- 절대 경로(src/shared 등) -> 상대 경로(../ or ./).

## 3.	Error Handling:
- 공통 에러 처리 유틸리티를 shared/utils/에 작성.