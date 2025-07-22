# AI Workflow Workshop - Kanban Board Application

A comprehensive workshop teaching developers how to effectively use AI tools (Cursor, Copilot, Claude) in a structured software development workflow. Built around a full-stack kanban board application with React (TypeScript) frontend and NestJS backend.

## 🎯 Workshop Overview

This workshop teaches developers how to effectively use AI tools in a structured software development workflow. Participants will learn to be software architects who leverage AI for implementation while maintaining quality, consistency, and maintainability.

### 🎓 Learning Objectives
By the end of this workshop, you will:
- **Design First:** Learn to think architecturally before coding
- **Context is King:** Master providing effective context to AI tools
- **Structured Workflow:** Follow a proven PRD Analysis → Technical Requirements → Implementation → Testing → Release cycle
- **MCP Integration:** Leverage Model Context Protocol for enhanced AI capabilities
- **Quality Assurance:** Maintain code quality when using AI assistance
- **Version Control:** Manage AI-generated code changes effectively

## 🏗️ Workshop Architecture

### Core Workflow
```
PRD Analysis → Technical Requirements → Implementation → Testing → Release → Iterate
     ↓              ↓                    ↓           ↓         ↓
  Analyze        Technical            AI-Assisted   Test      Deploy
  Requirements   Planning (ADR)             Development   Quality   & Monitor
```

### Key Principles
1. **AI as Implementation Partner:** You architect, AI implements
2. **PRD-Driven Development:** Clear requirements lead to better AI output
3. **Context Rich:** More context = better AI assistance
4. **Quality Gates:** Maintain standards through testing and review
5. **Iterative Process:** Continuous improvement and learning

## 🛠 Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for build tooling
- **ESLint** for code linting

### Backend
- **NestJS** with TypeScript
- **TypeORM** for database management
- **PostgreSQL** database
- **Express** server

### Development
- **Node.js** 22.15.1 (pinned)
- **npm workspaces** for monorepo management
- **concurrently** for running both apps

### AI Tools & MCP Integration
- **ClickUp MCP** for PRD management
- **ShadCN MCP** for UI components
- **Postgres MCP** for database operations
- **Playwright MCP** for browser automation and test generation

## 🚀 Quick Start & Workshop Setup

### Prerequisites
- Node.js 22.15.1 (use `.nvmrc` for version management)
- PostgreSQL database
- npm (comes with Node.js)
- AI tool of choice (Cursor, Copilot, Claude)
- Basic knowledge of React and NestJS

### Repository Setup & Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd ai-workflow-workshop
   npm run install:all
   ```

2. **Database setup:**
   
   **Option 1: Using Docker (Recommended):**
   ```bash
   # Run PostgreSQL container
   docker run --name kanban-postgres -e POSTGRES_DB=kanban_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15
   
   # To stop the container
   docker stop kanban-postgres
   
   # To start existing container
   docker start kanban-postgres
   ```
   
   **Option 2: Using local PostgreSQL installation:**
   ```bash
   # Create PostgreSQL database
   createdb kanban_db
   
   # Or using PostgreSQL CLI
   psql -U postgres
   CREATE DATABASE kanban_db;
   ```

3. **Environment configuration:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### MCP Configuration
Set up Model Context Protocol integrations for enhanced AI capabilities:
- Set up ClickUp MCP for PRD management
- Configure ShadCN MCP for UI components  
- Set up Postgres MCP for database operations
- Configure Playwright MCP for browser automation

## 📁 Project Structure

```
ai-workflow-workshop/
├── frontend/               # React TypeScript frontend (foundation setup)
│   ├── src/
│   │   ├── components/     # To be built: KanbanBoard, TaskCard, etc.
│   │   ├── services/       # To be built: API client
│   │   ├── types/          # To be built: TypeScript definitions
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── backend/                # NestJS TypeScript backend (foundation setup)
│   ├── src/
│   │   ├── controllers/    # To be built: Task controllers
│   │   ├── dto/            # To be built: Data transfer objects
│   │   ├── entities/       # To be built: Database entities
│   │   ├── services/       # To be built: Business logic
│   │   └── modules/        # To be built: Feature modules
│   ├── package.json
│   └── tsconfig.json
├── cypress/                # E2E test framework (configured, tests TBD)
│   ├── e2e/               # Test specifications (to be generated)
│   └── support/
├── templates/              # Templates for PRDs, implementation guides
│   ├── implementation/     # Backend, frontend, E2E setup guides
│   └── prd/                # PRD templates for feature development
├── TaskFlow-*.md           # Pre-created PRD examples (6 features)
├── TODO-IMPLEMENTATION-PLAN.md # Workshop implementation roadmap
├── package.json            # Root workspace config
├── .env.example            # Environment template
└── README.md               # This file
```

### 📋 Pre-created PRD Examples
The workshop includes 6 ready-to-use PRD examples for different features:
- `TaskFlow-Auth-PRD.md` - User authentication and authorization
- `TaskFlow-Counter-PRD.md` - Task counter and statistics
- `TaskFlow-Homepage-PRD.md` - Landing page and dashboard
- `TaskFlow-Kanban-PRD.md` - Core kanban board functionality
- `TaskFlow-Search-Filter-PRD.md` - Search and filtering capabilities
- `TaskFlow-Tagging-PRD.md` - Task tagging system

### 🎯 Workshop Starting Point
This repository provides a **development foundation** with:
- 📋 **Project structure** and configuration files
- 🛠️ **Development toolchain** (React, NestJS, TypeScript)
- 🗃️ **Database setup** with PostgreSQL integration
- 🧪 **Testing framework** with Cypress and Playwright
- 🎨 **UI component library** (ShadCN) ready for use
- 📝 **Pre-written PRDs** for feature implementation

Participants will **build the kanban board from scratch** using AI-assisted development, starting with basic functionality and progressively adding advanced features.

## 📚 Workshop Modules

### Module 1: Foundation Setup (30 minutes)
**Objective:** Understand the project structure and development environment

**Activities:**
1. **Repository Tour** (10 min)
   - Explore project structure
   - Review existing code patterns
   - Understand the baseline kanban application

2. **MCP Configuration** (15 min)
   - Set up ClickUp MCP for PRD management
   - Configure ShadCN MCP for UI components
   - Set up Postgres MCP for database operations
   - Configure Playwright MCP for browser automation

3. **AI Tool Setup** (5 min)
   - Configure your preferred AI tool
   - Test basic AI interaction
   - Verify MCP connections

**Deliverables:**
- Working development environment
- Configured MCP connections
- Baseline understanding of the codebase

### Module 2: Design & Documentation (45 minutes)
**Objective:** Understand PRD analysis and technical requirements planning

**Activities:**
1. **PRD Analysis** (20 min)
   - Review pre-created TaskFlow PRDs (Auth, Counter, Homepage, Kanban, Search-Filter, Tagging)
   - Analyze user stories and acceptance criteria
   - Understand business requirements and success criteria
   - Choose a feature to implement based on PRD analysis

2. **Technical Requirements Planning** (20 min)
   - Extract technical requirements from chosen PRD
   - Define implementation approach and architecture choices
   - Create TODO implementation plan with clear steps
   - Set up proper context for AI-assisted development

3. **PRD Template Review** (5 min)
   - Review PRD template from `/templates/prd/` for future reference
   - Understand how PRDs can be created using ClickUp MCP integration
   - Learn PRD structure and best practices

**Deliverables:**
- Selected feature with clear understanding of requirements
- Technical implementation plan and TODO list
- Context preparation for AI-assisted development

### Module 3: AI-Assisted Implementation (60 minutes)
**Objective:** Implement features using AI tools with proper context

**Activities:**
1. **Context Preparation** (15 min)
   - Review implementation templates
   - Prepare context documents for AI
   - Set up proper prompting strategies

2. **Backend Implementation** (20 min)
   - Use backend setup guide as AI context
   - Implement API endpoints with AI assistance
   - Follow NestJS patterns and conventions
   - Include proper validation and error handling

3. **Frontend Implementation** (20 min)
   - Use frontend setup guide as AI context
   - Implement React components with AI assistance
   - Follow existing UI patterns
   - Integrate with backend APIs

4. **Review & Refactor** (5 min)
   - Review AI-generated code
   - Refactor for consistency and quality
   - Ensure adherence to project conventions

**Deliverables:**
- Working feature implementation
- Clean, maintainable code
- Proper integration between frontend and backend

### Module 4: Testing & Quality Assurance (45 minutes)
**Objective:** Ensure quality through comprehensive testing

**Activities:**
1. **Test Strategy Planning** (10 min)
   - Review testing strategy template
   - Plan unit, integration, and E2E tests
   - Identify critical test scenarios

2. **AI-Generated Tests** (25 min)
   - Use AI to generate unit tests for services/components
   - Create integration tests for API endpoints
   - **NLP to Test Workflow:**
     1. Define test scenarios in natural language
     2. Use Playwright MCP to execute browser actions
     3. Feed action context back to LLM to generate Cypress tests
   - Verify generated test coverage

3. **Quality Validation** (10 min)
   - Run all tests and verify coverage
   - Perform code quality checks
   - Review accessibility compliance
   - Validate performance requirements

**Deliverables:**
- Comprehensive test suite
- Passing quality gates
- Documentation of test coverage

### Module 5: Advanced Patterns (30 minutes)
**Objective:** Learn advanced AI collaboration techniques

**Activities:**
1. **Complex Feature Implementation** (20 min)
   - Implement a more complex feature (Authentication, Real-time updates)
   - Practice iterative AI collaboration
   - Handle edge cases and error scenarios

2. **Code Review & Optimization** (10 min)
   - Review AI-generated code critically
   - Identify optimization opportunities
   - Refactor for better maintainability

**Deliverables:**
- Advanced feature implementation
- Optimized, production-ready code

## 🛠️ Feature Implementation Exercises

### Exercise 1: Basic Kanban Board (Beginner)
**Goal:** Build the core kanban board functionality from scratch

**Steps:**
1. Review TaskFlow-Kanban-PRD.md for requirements
2. Create technical implementation plan using templates
3. Build backend API with task CRUD operations
4. Develop frontend kanban components with drag-and-drop
5. Generate E2E tests using NLP → Playwright → LLM workflow
6. Test and verify functionality

**Key Learning:** End-to-end AI-assisted development workflow

### Exercise 2: Tagging System (Intermediate)
**Goal:** Add ability to tag tasks and filter by tags

**Steps:**
1. Analyze TaskFlow-Tagging-PRD.md for requirements
2. Design tag data model and relationships
3. Document technical implementation plan
4. Implement tag management API
5. Build tag UI components with ShadCN
6. Create filtering and search functionality
7. **Generate E2E tests:**
   - Describe tag workflows in natural language
   - Use Playwright to record user interactions
   - Convert Playwright actions to Cypress tests via LLM

**Key Learning:** Complex feature design with AI-assisted testing

### Exercise 3: Authentication Flow (Advanced)
**Goal:** Implement user authentication and authorization

**Steps:**
1. Review TaskFlow-Auth-PRD.md for security requirements
2. Research authentication strategies and create technical plan
3. Implement JWT-based auth system
4. Build login/register components
5. Add authorization guards and middleware
6. **Advanced Testing Workflow:**
   - Define security test scenarios in natural language
   - Use Playwright to simulate authentication flows
   - Generate comprehensive Cypress security tests via LLM
7. Document security considerations and implementation

**Key Learning:** Security implementation with AI-assisted comprehensive testing

## 🔧 Best Practices & Tips

### Effective AI Prompting
1. **Provide Complete Context**
   - Share relevant PRDs and technical requirements
   - Include existing code patterns
   - Specify technology stack and versions

2. **Be Specific About Requirements**
   - Clear acceptance criteria
   - Specific error handling needs
   - Performance requirements
   - Accessibility standards

3. **Iterative Refinement**
   - Start with basic implementation
   - Iteratively improve with AI feedback
   - Ask AI to explain decisions
   - Request multiple implementation options

### Code Quality Maintenance
1. **Consistent Patterns**
   - Reference existing code examples
   - Follow established conventions
   - Maintain consistent file structure

2. **Testing First**
   - Generate tests alongside implementation
   - Verify AI-generated test coverage
   - Include edge case testing

3. **Documentation**
   - Update documentation as you build
   - Keep technical requirements current with decisions
   - Document any deviations from standards

### Common Pitfalls to Avoid
❌ **Don't:** Blindly accept all AI suggestions  
✅ **Do:** Review and understand AI-generated code

❌ **Don't:** Skip documentation and planning phases  
✅ **Do:** Follow the complete workflow cycle

❌ **Don't:** Ignore existing code patterns  
✅ **Do:** Maintain consistency with established conventions

❌ **Don't:** Forget to test AI-generated code  
✅ **Do:** Create comprehensive test coverage

## 📊 Workshop Assessment

### Self-Assessment Checklist
After each module, evaluate your progress:

**Design & Documentation:**
- [ ] Can analyze PRDs and extract clear requirements
- [ ] Able to create technical implementation plans
- [ ] Understand how to break down complex features

**AI Collaboration:**
- [ ] Provide effective context to AI tools
- [ ] Generate high-quality code with AI assistance
- [ ] Review and refactor AI-generated code appropriately

**Implementation Quality:**
- [ ] Follow established code patterns and conventions
- [ ] Implement proper error handling and validation
- [ ] Create maintainable, readable code

**Testing & QA:**
- [ ] Generate comprehensive test suites
- [ ] Verify code quality and coverage
- [ ] Ensure accessibility and performance standards

### Success Metrics
- **Feature Completion:** Fully functional implemented features
- **Code Quality:** Clean, maintainable, well-tested code
- **Documentation:** Complete PRDs analysis and technical implementation plans for all features
- **Process Adherence:** Following the complete workflow cycle
- **AI Effectiveness:** Efficient AI collaboration with good outcomes

## 🔧 Available Scripts

### Root Level Commands
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both applications for production
- `npm run install:all` - Install dependencies for all workspaces
- `npm run lint` - Run linting for frontend

### Frontend Commands
- `npm run dev:frontend` - Start frontend development server
- `npm run build:frontend` - Build frontend for production
- `npm run lint:frontend` - Run ESLint on frontend code

### Backend Commands
- `npm run dev:backend` - Start backend development server
- `npm run build:backend` - Build backend for production

## 🌍 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=kanban_db

# Application Environment
NODE_ENV=development

# Backend Configuration
BACKEND_PORT=3001

# Frontend Configuration
FRONTEND_PORT=5173
VITE_API_URL=http://localhost:3001/api
```

## 🗄 Database

- **Type**: PostgreSQL
- **ORM**: TypeORM
- **Auto-sync**: Enabled in development (disabled in production)
- **Migration**: Handled by TypeORM

## 🔗 API Endpoints

Backend API is available at `http://localhost:3001/api`

- CORS enabled for frontend communication
- Global API prefix: `/api`

## 🚧 Development Workflow

1. **Start development environment:**
   ```bash
   npm run dev
   ```

2. **Make changes** to frontend (`/frontend/src`) or backend (`/backend/src`)

3. **Hot reload** is enabled for both applications

4. **Database changes** are automatically synchronized in development

## 📦 Production Build

```bash
# Build both applications
npm run build

# Frontend build output: frontend/dist/
# Backend build output: backend/dist/
```

## 🎯 Next Steps & Additional Resources

### After the Workshop
1. **Practice:** Continue implementing the remaining features
2. **Experiment:** Try different AI tools and approaches
3. **Share:** Document your learnings and share with the team
4. **Scale:** Apply these patterns to your real projects


## 📝 Workshop Feedback

Please provide feedback on:
- Workshop pacing and content
- Template effectiveness
- AI tool integration quality
- Additional topics you'd like to see

**Remember:** The goal is not to replace your thinking with AI, but to amplify your capabilities as a software architect and developer.

## 📄 License

MIT License - feel free to use this project for your own purposes.
