# Development Guidelines & Best Practices

## Code Style & Standards

### TypeScript
```typescript
// ✅ DO: Use strict typing
interface User {
  id: string
  email: string
  role: 'customer' | 'admin'
}

// ❌ DON'T: Use 'any' type
const user: any = {}
```

### React Components
```typescript
// ✅ DO: Functional components with hooks
export const MyComponent: React.FC<{ prop: string }> = ({ prop }) => {
  const [state, setState] = useState('')
  return <div>{state}</div>
}

// ❌ DON'T: Class components
class MyComponent extends React.Component { ... }
```

### Imports
```typescript
// ✅ DO: Absolute imports (configured in vite.config.ts)
import { useAuthStore } from '@/store'

// ✅ DO: Group imports
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { apiService } from '@/services/api'

// ❌ DON'T: Relative paths with excessive dots
import { something } from '../../../store'
```

---

## Component Structure

### Page Components
```typescript
// 1. Imports
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { apiService } from '@/services/api'

// 2. Types (if not in separate file)
interface Props {
  id: string
}

// 3. Component
export const MyPage: React.FC<Props> = ({ id }) => {
  // 3a. Hooks
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  // 3b. Effects
  useEffect(() => {
    // Load data
  }, [])
  
  // 3c. Event handlers
  const handleClick = () => {}
  
  // 3d. Render
  return <div>Content</div>
}
```

### Reusable Components
```typescript
interface ComponentProps {
  title: string
  onClick: () => void
}

export const MyComponent: React.FC<ComponentProps> = ({ 
  title, 
  onClick 
}) => {
  return <button onClick={onClick}>{title}</button>
}
```

---

## State Management (Zustand)

### Store Pattern
```typescript
import { create } from 'zustand'

interface MyStore {
  count: number
  increment: () => void
  decrement: () => void
}

export const useMyStore = create<MyStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))
```

### Usage in Components
```typescript
const MyComponent: React.FC = () => {
  const count = useMyStore((state) => state.count)
  const increment = useMyStore((state) => state.increment)
  
  return <button onClick={increment}>{count}</button>
}
```

---

## Styling with Tailwind CSS

### Common Patterns
```typescript
// ✅ DO: Use Tailwind classes
<div className="flex items-center gap-4 p-6 rounded-lg bg-white shadow-md">
  <h1 className="text-2xl font-bold text-gray-800">Title</h1>
</div>

// ❌ DON'T: Mix inline styles
<div style={{ display: 'flex', padding: '24px' }}>

// ❌ DON'T: Use CSS modules for simple layouts
```

### Responsive Design
```typescript
// Mobile-first approach
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4
">
  {items.map(item => (...))}
</div>
```

### Dark Mode Ready
```typescript
<div className="
  bg-white dark:bg-gray-900
  text-gray-800 dark:text-white
">
  Content
</div>
```

---

## Error Handling

### Try-Catch Pattern
```typescript
const handleSubmit = async (data: FormData) => {
  try {
    setLoading(true)
    const result = await apiService.submitForm(data)
    // Handle success
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    setError(message)
  } finally {
    setLoading(false)
  }
}
```

### Form Validation
```typescript
const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  
  if (!email) {
    setError('Email is required')
    return
  }
  
  if (!password) {
    setError('Password is required')
    return
  }
  
  // Submit form
}
```

---

## API Integration Pattern

### Service Method
```typescript
export const apiService = {
  async fetchData(id: string): Promise<Data> {
    try {
      // In real app, use axios/fetch
      const response = await fetch(`/api/data/${id}`)
      if (!response.ok) throw new Error('Failed to fetch')
      return response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }
}
```

### Component Usage
```typescript
const MyComponent: React.FC = () => {
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await apiService.fetchData('123')
        setData(result)
      } catch (err) {
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])
  
  if (loading) return <Spinner />
  if (error) return <Error message={error} />
  return <div>{data?.title}</div>
}
```

---

## Routing Pattern

### Route Definition
```typescript
// In App.tsx
<Routes>
  <Route path="/" element={<LoginPage />} />
  <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />
</Routes>
```

### Private Route
```typescript
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />
}
```

---

## Testing Guidelines

### Component Testing
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('LoginPage', () => {
  it('should login on form submit', async () => {
    render(<LoginPage />)
    
    const emailInput = screen.getByPlaceholderText('Email')
    await userEvent.type(emailInput, 'test@example.com')
    
    const button = screen.getByRole('button', { name: /login/i })
    await userEvent.click(button)
    
    expect(screen.getByText('Welcome')).toBeInTheDocument()
  })
})
```

---

## Performance Optimization

### Code Splitting
```typescript
// Lazy load heavy components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'))

export const App = () => (
  <Suspense fallback={<Spinner />}>
    <HeavyComponent />
  </Suspense>
)
```

### Memoization
```typescript
// Prevent unnecessary re-renders
const MyComponent = React.memo(({ item }: { item: Item }) => {
  return <div>{item.name}</div>
})
```

### useCallback
```typescript
const handleClick = useCallback(() => {
  // This function won't change on every render
  doSomething()
}, []) // Empty dependency array
```

---

## Naming Conventions

### Files
```
✅ Components/pages: PascalCase (LoginPage.tsx, ScratchCard.tsx)
✅ Services/utils: camelCase (apiService.ts, fraudDetection.ts)
✅ Types: PascalCase (User.ts, Campaign.ts)
✅ Styles: kebab-case (main.css)
```

### Variables & Functions
```typescript
✅ const userName = 'John'
✅ const isLoading = false
✅ const getUserData = () => {}
✅ const API_BASE_URL = 'https://api.example.com'

❌ const name = 'John'
❌ const loading = false
❌ const get_user_data = () => {}
```

### Event Handlers
```typescript
✅ const handleClick = () => {}
✅ const handleSubmit = (e) => {}
✅ const onSuccess = () => {}
✅ const onError = () => {}

❌ const click = () => {}
❌ const processForm = () => {}
```

---

## Environment Variables

### .env.local
```
VITE_API_BASE_URL=https://api.example.com
VITE_PAYMENT_KEY=your_payment_key
VITE_ENABLE_DEMO_MODE=true
```

### Usage
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL
const isDemoMode = import.meta.env.VITE_ENABLE_DEMO_MODE === 'true'
```

---

## Git Workflow

### Branch Naming
```
feature/qr-scanner
bugfix/payment-validation
refactor/api-service
docs/api-documentation
```

### Commit Messages
```
✅ "Add QR code validation"
✅ "Fix payment error handling"
✅ "Update README with setup instructions"

❌ "fix stuff"
❌ "update"
❌ "work in progress"
```

### Before Committing
```bash
# Format code
npm run format  # (if configured)

# Check types
npm run type-check  # (if configured)

# Build to verify
npm run build
```

---

## Debugging Tips

### VS Code Setup
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### Console Logging
```typescript
// ✅ DO: Use descriptive logs
console.log('[LoginPage] User login attempt:', email)

// ❌ DON'T: Use generic logs
console.log('error')
console.log(data)
```

### React DevTools
```typescript
// Install React DevTools Chrome extension
// Inspect component props and state
// Track component re-renders
```

---

## Common Pitfalls & Solutions

### State Not Updating
```typescript
// ❌ WRONG: Direct mutation
state.count = 5

// ✅ CORRECT: Create new object
setState({ ...state, count: 5 })
setState(prev => ({ ...prev, count: 5 }))
```

### Stale Closures
```typescript
// ❌ WRONG: Missing dependency
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count) // Always 0
  }, 1000)
}, [])

// ✅ CORRECT: Include dependency
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count) // Updates correctly
  }, 1000)
}, [count])
```

### Memory Leaks
```typescript
// ❌ WRONG: Missing cleanup
useEffect(() => {
  const subscription = subscribe()
}, [])

// ✅ CORRECT: Cleanup function
useEffect(() => {
  const subscription = subscribe()
  return () => subscription.unsubscribe()
}, [])
```

---

## Useful Resources

### Official Docs
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs/
- Tailwind CSS: https://tailwindcss.com/docs
- React Router: https://reactrouter.com
- Zustand: https://github.com/pmndrs/zustand

### Tools
- ESLint: Code quality
- Prettier: Code formatting
- Vitest: Unit testing
- Cypress: E2E testing

---

## Code Review Checklist

- [ ] TypeScript types are correct
- [ ] No unused imports
- [ ] Components are properly memoized
- [ ] Error handling is implemented
- [ ] Responsive design is tested
- [ ] Accessibility is considered
- [ ] Performance is optimized
- [ ] Code is documented
- [ ] Tests are passing
- [ ] Build succeeds

---

## Questions?

Refer to:
1. Component examples in `src/pages/`
2. Service implementation in `src/services/`
3. Store pattern in `src/store/`
4. Type definitions in `src/types/`

