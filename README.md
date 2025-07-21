# AI Workflow Workshop - Kanban Board Application

A comprehensive workshop teaching developers how to effectively use AI tools (Cursor, Copilot, Claude) in a structured software development workflow. Built around a full-stack kanban board application with React (TypeScript) frontend and NestJS backend.

## 🎯 Workshop Overview

This workshop teaches developers how to effectively use AI tools in a structured software development workflow. Participants will learn to be software architects who leverage AI for implementation while maintaining quality, consistency, and maintainability.

### 🎓 Learning Objectives
By the end of this workshop, you will:
- **Design First:** Learn to think architecturally before coding
- **Context is King:** Master providing effective context to AI tools
- **Structured Workflow:** Follow a proven Design → PRD → ADR → Implementation → Testing → Release cycle
- **MCP Integration:** Leverage Model Context Protocol for enhanced AI capabilities
- **Quality Assurance:** Maintain code quality when using AI assistance
- **Version Control:** Manage AI-generated code changes effectively

## 🏗️ Workshop Architecture

### Core Workflow
```
Design Phase → PRD Creation → ADR Documentation → Implementation → Testing → Release → Iterate
     ↓              ↓               ↓              ↓           ↓         ↓
  Research       Document      Technical      AI-Assisted   Test      Deploy
  & Plan        Requirements   Decisions      Development   Quality   & Monitor
```

### Key Principles
1. **AI as Implementation Partner:** You architect, AI implements
2. **Documentation Driven:** Clear requirements lead to better AI output
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
- **Cypress MCP** for testing automation

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
- Configure Cypress MCP for testing

## 📁 Project Structure

```
ai-workflow-workshop/
├── frontend/               # React TypeScript frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── backend/                # NestJS TypeScript backend
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── docs/                   # Workshop documentation
│   ├── ai-workflow-process.md
│   ├── mcp-setup.md
│   └── workshop-guide.md
├── templates/              # Templates for PRDs, ADRs, implementation
│   ├── adr/
│   ├── implementation/
│   ├── prd/
│   └── testing/
├── .mcp/                   # MCP configurations
├── package.json            # Root workspace config
├── .env.example            # Environment template
└── README.md               # This file
```

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
   - Configure Cypress MCP for testing

3. **AI Tool Setup** (5 min)
   - Configure your preferred AI tool
   - Test basic AI interaction
   - Verify MCP connections

**Deliverables:**
- Working development environment
- Configured MCP connections
- Baseline understanding of the codebase

### Module 2: Design & Documentation (45 minutes)
**Objective:** Learn to create comprehensive PRDs and ADRs

**Activities:**
1. **Feature Analysis** (15 min)
   - Choose a feature to implement (Todo CRUD, Tagging, Search, etc.)
   - Analyze user needs and business requirements
   - Define success criteria

2. **PRD Creation** (20 min)
   - Use the PRD template from `/templates/prd/`
   - Document user stories and acceptance criteria
   - Define technical requirements
   - Upload to ClickUp using MCP integration

3. **Technical Decision Making** (10 min)
   - Create ADR for key technical decisions
   - Document architecture choices
   - Consider implementation approaches

**Deliverables:**
- Complete PRD for chosen feature
- ADR documenting technical decisions
- Clear implementation roadmap

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
   - Write E2E tests for user workflows
   - Use Cypress MCP for test automation

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

### Exercise 1: Todo CRUD Operations (Beginner)
**Goal:** Add update and delete functionality to existing todos

**Steps:**
1. Create PRD using feature template
2. Design API endpoints in ADR
3. Implement backend CRUD operations
4. Create frontend update/delete components
5. Write comprehensive tests
6. Deploy and verify functionality

**Key Learning:** Basic AI-assisted development workflow

### Exercise 2: Tagging System (Intermediate)
**Goal:** Add ability to tag todos and filter by tags

**Steps:**
1. Design tag data model and relationships
2. Create comprehensive PRD with user stories
3. Document technical decisions in ADR
4. Implement tag management API
5. Build tag UI components with ShadCN
6. Create filtering and search functionality
7. Test all user workflows

**Key Learning:** Complex feature design and implementation

### Exercise 3: Authentication Flow (Advanced)
**Goal:** Implement user authentication and authorization

**Steps:**
1. Research authentication strategies
2. Create security-focused ADR
3. Implement JWT-based auth system
4. Build login/register components
5. Add authorization guards
6. Create comprehensive security tests
7. Document security considerations

**Key Learning:** Security implementation with AI assistance

## 🔧 Best Practices & Tips

### Effective AI Prompting
1. **Provide Complete Context**
   - Share relevant PRDs and ADRs
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
   - Keep ADRs current with decisions
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
- [ ] Can create comprehensive PRDs with clear requirements
- [ ] Able to document technical decisions in ADRs
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
- **Documentation:** Complete PRDs and ADRs for all features
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

### Additional Resources
- [AI Workflow Process Documentation](./docs/ai-workflow-process.md)
- [MCP Setup Guide](./docs/mcp-setup.md)
- [Templates Directory](./templates/)
- [Community Examples and Patterns](#)

### Support and Community
- Workshop GitHub Issues for questions
- Community Discord for ongoing support
- Regular follow-up sessions for advanced topics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes following the AI workflow process
4. Test your changes comprehensively
5. Submit a pull request with detailed documentation

## 📝 Workshop Feedback

Please provide feedback on:
- Workshop pacing and content
- Template effectiveness
- AI tool integration quality
- Additional topics you'd like to see

**Remember:** The goal is not to replace your thinking with AI, but to amplify your capabilities as a software architect and developer.

## 📄 License

MIT License - feel free to use this project for your own purposes.
