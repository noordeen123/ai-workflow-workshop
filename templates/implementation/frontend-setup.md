# Frontend Implementation Setup Guide

## 🎯 Purpose
This guide provides a structured approach to implementing frontend features using AI tools. Use this as a template when prompting AI assistants to ensure consistent, high-quality code generation.

## 📋 Pre-Implementation Checklist
Before asking AI to implement any frontend feature:

- [ ] **PRD Reviewed:** Feature requirements are clear and documented
- [ ] **Technical Requirements:** Implementation approach and architecture decisions documented in PRD
- [ ] **Design Available:** UI mockups or component designs are ready
- [ ] **API Contract:** Backend API endpoints are defined
- [ ] **Dependencies:** Required packages are identified
- [ ] **MCP Tools:** Relevant Model Context Protocol tools are configured and available

## 🏗️ Implementation Context Template

### Available Model Context Protocol (MCP) Tools
The workspace has the following MCP servers configured in `.vscode/mcp.json` to inform AI assistants about available capabilities:

1. **GitHub MCP** (`@modelcontextprotocol/server-github@2025.4.8`)
   - Repository management and analysis
   - Pull request creation and review
   - Issue tracking and management
   - Code search and file operations
   - Requires: GitHub Personal Access Token

2. **ClickUp MCP** (`@taazkareem/clickup-mcp-server@latest`)
   - Project management integration
   - Task tracking and updates
   - Document management (enabled)
   - Team collaboration features
   - Configured with: Team ID 37484951, Document support enabled

3. **PostgreSQL MCP** (`@modelcontextprotocol/server-postgres`)
   - Database queries and analysis
   - Schema exploration
   - Data modeling support
   - Configured for: localhost:5432 database

4. **Shadcn/UI MCP** (`@jpisnice/shadcn-ui-mcp-server`)
   - Component library integration
   - UI component generation
   - Design system consistency
   - Component documentation access
   - Requires: GitHub API key for component access

5. **Playwright MCP** (`@playwright/mcp@latest`)
   - Automated browser interactions
   - UI automation and workflows
   - Web scraping capabilities
   - Isolated browser contexts with storage state

> **Note:** These MCPs are configured to inform AI assistants about available tools and capabilities, not for direct project integration.

### Project Structure Context
```
# Current Frontend Stack
- Framework: React 19.1.0 with TypeScript
- Build Tool: Vite 7.0.4
- Styling: [ShacdCn]
- State Management: [Zustand | Redux | Context API]
- Routing: [React Router | Next.js Router | etc.]
- Form Handling: [React Hook Form | Formik | etc.]
- HTTP Client: [Fetch | Axios | TanStack Query]

# Project Structure
frontend/
├── src/
│   ├── components/           # Reusable UI components
│   ├── pages/               # Page components
│   ├── hooks/               # Custom React hooks
│   ├── store/               # State management
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── services/            # API services
│   └── styles/              # Global styles
```

### Existing Patterns and Conventions
```typescript
// Component Structure Pattern
interface ComponentProps {
  // Props interface
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Hooks at the top
  // Event handlers
  // Render logic
  
  return (
    // JSX
  );
}

// State Management Pattern (example with Zustand)
interface StoreState {
  // State interface
}

interface StoreActions {
  // Actions interface
}

export const useStore = create<StoreState & StoreActions>((set, get) => ({
  // State and actions
}));

// API Service Pattern
export class FeatureService {
  static async getItems(): Promise<Item[]> {
    // API call implementation
  }
}
```

## 🤖 AI Prompting Templates

### Component Implementation Prompt
```
# Context
I need to implement [COMPONENT_NAME] for a React TypeScript application.

## Requirements
[Paste relevant sections from PRD/Feature requirements]

## Technical Context
- React 19.1.0 with TypeScript
- Current project structure: [describe relevant folders/files]
- Existing components to reference: [list similar components]
- State management: [describe current approach]
- Styling approach: [CSS modules/styled-components/etc.]

## Implementation Requirements
1. Component should follow existing patterns in [reference component]
2. Props interface with proper TypeScript types
3. Handle loading, error, and success states
4. Implement proper accessibility (ARIA labels, keyboard navigation)
5. Mobile-responsive design
6. Error boundaries for graceful degradation

## API Integration
- Endpoint: [API endpoint details]
- Request/Response format: [data structures]
- Error handling: [specific error scenarios]

## MCP Integration
- Use GitHub MCP for repository operations and code analysis
- Leverage Shadcn/UI MCP for consistent component implementation
- Utilize ClickUp MCP for project tracking and documentation

Please implement the component with:
- Clean, readable code with comments
- Proper error handling
- Loading states
- TypeScript interfaces
```

### State Management Implementation Prompt
```
# Context
I need to implement state management for [FEATURE_NAME] using [Zustand/Redux/Context].

## Current State Architecture
[Describe existing state structure]

## New State Requirements
- State shape: [describe the data structure needed]
- Actions needed: [list CRUD operations and other actions]
- Side effects: [API calls, localStorage, etc.]
- Computed values: [any derived state or selectors]

## Integration Points
- Components that will use this state: [list components]
- API services to integrate: [list services]
- Persistence requirements: [localStorage, sessionStorage, etc.]

## Implementation Requirements
1. Follow existing state management patterns
2. TypeScript interfaces for state and actions
3. Proper error handling and loading states
4. Optimistic updates where appropriate
5. State normalization for complex data
6. Devtools integration for debugging

Please implement:
- Store/context setup
- Actions and reducers
- Selectors or hooks for component integration
- Type definitions
```

### API Integration Prompt
```
# Context
I need to integrate with the [API_NAME] API for [FEATURE_NAME].

## API Details
- Base URL: [API base URL]
- Endpoints: [list relevant endpoints]
- Authentication: [auth method and headers]
- Request/Response format: [JSON schemas]

## Integration Requirements
1. HTTP client setup (axios/fetch)
2. Request/response TypeScript interfaces
3. Error handling and retry logic
4. Loading state management
5. Caching strategy (if applicable)
6. Request cancellation for cleanup

## Current Patterns
- Existing API services: [reference existing services]
- Error handling approach: [describe current error handling]
- Loading state pattern: [how loading is currently handled]

Please implement:
- Service class with typed methods
- Error boundary integration
- Loading state hooks
- Response data transformations
```

## 🎨 UI/UX Implementation Guidelines

### Component Design Principles
1. **Accessibility First**
   - Proper ARIA labels and roles
   - Keyboard navigation support
   - Screen reader compatibility
   - Color contrast compliance

2. **Responsive Design**
   - Mobile-first approach
   - Flexible layouts with CSS Grid/Flexbox
   - Touch-friendly interaction areas
   - Performance on mobile devices

3. **User Experience**
   - Clear loading states
   - Informative error messages
   - Smooth transitions and animations
   - Intuitive user flows

### Styling Best Practices
```css
/* CSS Modules Example */
.container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
}

.button {
  /* Follow design system tokens */
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
}

/* Responsive breakpoints */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
```

## 📝 MCP Context for AI Assistants

### Available Model Context Protocol Tools
The following MCPs are configured to provide AI assistants with enhanced capabilities and context:

**GitHub MCP**: Repository operations, code analysis, pull request management, and issue tracking
**ClickUp MCP**: Project management context, task tracking, and document management  
**PostgreSQL MCP**: Database query capabilities and schema exploration
**Shadcn/UI MCP**: Component library access and UI consistency guidance
**Playwright MCP**: Browser automation context for web-related development

These tools inform AI assistants about available capabilities but are not integrated into the project codebase.

## 📊 Performance Considerations

### Optimization Strategies
1. **Code Splitting**
   - Lazy load components with React.lazy()
   - Route-based code splitting
   - Dynamic imports for large dependencies

2. **State Management**
   - Minimize re-renders with proper state structure
   - Use selectors to subscribe to specific state slices
   - Debounce expensive operations

3. **Network Optimization**
   - Request caching and deduplication
   - Optimistic updates for better UX
   - Pagination and infinite scrolling for large lists

## 🔧 Development Workflow

### Implementation Steps
1. **Setup Phase**
   - Review PRD and technical requirements
   - Identify existing patterns to follow
   - Set up development environment

2. **Implementation Phase**
   - Create TypeScript interfaces first
   - Implement core functionality
   - Add error handling and loading states
   - Implement responsive design
   - Integrate with available MCP tools

3. **Quality Assurance Phase**
   - Code review and quality checks
   - Accessibility compliance verification
   - Cross-browser compatibility
   - Mobile device optimization

4. **Review Phase**
   - Code review checklist
   - Performance audit
   - Accessibility audit
   - Documentation updates

### AI Collaboration Tips
- Always provide complete context about existing codebase
- Ask for explanations of generated code to understand decisions
- Request multiple implementation options for complex features
- Iterate on generated code with specific feedback
- Verify AI suggestions against established patterns
- Leverage available MCP tools for enhanced development capabilities

---

**Remember:** This template should be customized for your specific project needs. Update the patterns, technologies, and conventions to match your actual codebase.