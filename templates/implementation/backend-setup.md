# Backend Implementation Setup Guide

## 🎯 Purpose
This guide provides a structured approach to implementing backend features using AI tools. Use this as a template when prompting AI assistants to ensure consistent, scalable, and maintainable code generation.

## 📋 Pre-Implementation Checklist
Before asking AI to implement any backend feature:

- [ ] **PRD Reviewed:** Feature requirements and business logic are clear
- [ ] **Technical Requirements:** Implementation approach and architecture decisions documented in PRD
- [ ] **Database Schema:** Data models and relationships are defined
- [ ] **API Design:** Endpoints, request/response formats documented
- [ ] **Security Requirements:** Authentication, authorization, validation needs identified
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

### Current Backend Stack
```
# Tech Stack
- Framework: NestJS 11.1.5 with TypeScript
- Database: PostgreSQL with TypeORM 0.3.25
- Authentication: [JWT | Passport | Auth0 | etc.]
- Documentation: [Swagger | etc.]

# Project Structure
backend/
├── src/
│   ├── modules/             # Feature modules
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # Users module
│   │   └── todos/          # Todo module
│   ├── common/             # Shared utilities
│   │   ├── decorators/     # Custom decorators
│   │   ├── filters/        # Exception filters
│   │   ├── guards/         # Guards for auth/permissions
│   │   ├── interceptors/   # Request/response interceptors
│   │   ├── pipes/          # Validation pipes
│   │   └── dto/            # Shared DTOs
│   ├── config/             # Configuration
│   └── database/           # Database migrations and seeders
```

### Existing Patterns and Conventions
```typescript
// Entity Pattern (TypeORM)
@Entity('table_name')
export class EntityName {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  property: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// DTO Pattern
export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

// Controller Pattern
@Controller('api/items')
@UseGuards(JwtAuthGuard)
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post()
  async create(@Body() createDto: CreateItemDto, @User() user: UserEntity) {
    return this.itemService.create(createDto, user);
  }
}

// Service Pattern
@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  async create(createDto: CreateItemDto, user: UserEntity): Promise<ItemEntity> {
    // Business logic implementation
  }
}
```

## 🤖 AI Prompting Templates

### API Endpoint Implementation Prompt
```
# Context
I need to implement [FEATURE_NAME] API endpoints for a NestJS application.

## Requirements
[Paste relevant sections from PRD/Feature requirements]

## Technical Context
- NestJS 11.1.5 with TypeScript
- PostgreSQL database with TypeORM
- Current authentication: [describe auth setup]
- Existing modules to reference: [list similar modules]

## API Specification
- Base path: /api/[resource]
- Endpoints needed:
  - GET /api/[resource] - List items with pagination
  - GET /api/[resource]/:id - Get single item
  - POST /api/[resource] - Create new item
  - PUT /api/[resource]/:id - Update item
  - DELETE /api/[resource]/:id - Delete item

## Data Requirements
- Entity properties: [list properties with types]
- Relationships: [describe entity relationships]
- Validation rules: [business validation requirements]
- Access control: [who can access what]

## Implementation Requirements
1. Follow existing module structure in [reference module]
2. Implement proper validation with class-validator
3. Add Swagger documentation
4. Include error handling and proper HTTP status codes
5. Implement pagination for list endpoints
6. Add logging for debugging

Please implement:
- Entity class with TypeORM decorators
- DTOs for create/update operations
- Controller with all CRUD endpoints
- Service with business logic
- Module configuration
```

### Database Integration Prompt
```
# Context
I need to implement database operations for [FEATURE_NAME] using TypeORM.

## Current Database Schema
[Describe existing entities and relationships]

## New Entity Requirements
- Entity name: [entity name]
- Properties: [list all properties with types]
- Relationships: [describe relationships with other entities]
- Indexes needed: [performance optimization indexes]
- Constraints: [unique constraints, foreign keys]

## Migration Requirements
- Migration type: [create table | alter table | data migration]
- Rollback strategy: [how to undo changes]
- Data preservation: [existing data handling]

## Implementation Requirements
1. Follow existing entity patterns
2. Use TypeORM decorators properly
3. Define relationships with proper cascading
4. Add validation decorators
5. Include soft delete if applicable
6. Update repository methods

Please implement:
- TypeORM entity class
- Database migration file
- Repository methods (if custom queries needed)
```

### Business Logic Service Prompt
```
# Context
I need to implement business logic for [FEATURE_NAME] in a NestJS service.

## Business Requirements
[Describe business rules and logic from PRD]

## Service Responsibilities
- Data validation and transformation
- Business rule enforcement
- External service integration
- Error handling and logging
- Transaction management

## Integration Points
- Database entities: [list entities to work with]
- External APIs: [any third-party integrations]
- Other services: [dependencies on other services]
- Event publishing: [if using event-driven architecture]

## Implementation Requirements
1. Follow dependency injection patterns
2. Implement proper error handling with custom exceptions
3. Add comprehensive logging
4. Use transactions for data consistency
5. Validate business rules before database operations
6. Return proper response types
7. Handle edge cases and error scenarios

Please implement:
- Service class with all business methods
- Custom exception classes
- Input validation and transformation logic
- Transaction handling for complex operations
- Comprehensive error handling
```

### Authentication & Authorization Prompt
```
# Context
I need to implement authentication and authorization for [FEATURE_NAME].

## Security Requirements
- Authentication method: [JWT | Session | OAuth]
- User roles and permissions: [describe role system]
- Resource-level permissions: [who can access what]
- Rate limiting: [API rate limiting requirements]

## Current Auth Setup
[Describe existing authentication implementation]

## Implementation Requirements
1. Create custom guards for authorization
2. Implement role-based access control (RBAC)
3. Add request validation and sanitization
4. Implement rate limiting
5. Add security headers
6. Log security events
7. Handle auth errors gracefully

Please implement:
- Custom guards for endpoint protection
- Decorators for role/permission checking
- Middleware for request validation
- Rate limiting configuration
- Security event logging
```

## 🗄️ Database Best Practices

### Entity Design Guidelines
```typescript
// Best Practices Example
@Entity('todos')
@Index(['userId', 'status']) // Composite index for common queries
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  @Index() // Index for search functionality
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.TODO
  })
  status: TodoStatus;

  @ManyToOne(() => UserEntity, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
```

### Migration Best Practices
```typescript
// Migration Example
export class CreateTodosTable1699999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'todos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          // ... other columns
        ],
        indices: [
          new Index('IDX_todos_user_id_status', ['user_id', 'status']),
        ],
        foreignKeys: [
          new ForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('todos');
  }
}
```

## 🔒 Security Implementation

### Input Validation Pattern
```typescript
// DTO with Validation
export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus = TodoStatus.TODO;
}

// Custom Validation Decorator
@ValidatorConstraint({ name: 'isUniqueTitle', async: true })
export class IsUniqueTitleConstraint implements ValidatorConstraintInterface {
  constructor(private todoService: TodoService) {}

  async validate(title: string, args: ValidationArguments) {
    const existingTodo = await this.todoService.findByTitle(title);
    return !existingTodo;
  }
}
```

### Authentication Guard Example
```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }
    return user;
  }
}

// Usage in Controller
@Controller('api/todos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TodoController {
  // ... endpoints
}
```

## 📊 Performance Optimization

### Database Query Optimization
```typescript
// Efficient pagination
async findTodosPaginated(userId: string, page: number, limit: number) {
  const [todos, total] = await this.todoRepository.findAndCount({
    where: { userId },
    order: { createdAt: 'DESC' },
    skip: (page - 1) * limit,
    take: limit,
    relations: ['user'],
  });

  return {
    data: todos,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// Query builder for complex queries
async findTodosWithFilters(filters: TodoFilters) {
  const queryBuilder = this.todoRepository
    .createQueryBuilder('todo')
    .leftJoinAndSelect('todo.user', 'user')
    .where('todo.userId = :userId', { userId: filters.userId });

  if (filters.status) {
    queryBuilder.andWhere('todo.status = :status', { status: filters.status });
  }

  if (filters.search) {
    queryBuilder.andWhere(
      '(todo.title ILIKE :search OR todo.description ILIKE :search)',
      { search: `%${filters.search}%` }
    );
  }

  return queryBuilder.getMany();
}
```

### Caching Strategy
```typescript
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
    private cacheManager: Cache,
  ) {}

  async findOne(id: string): Promise<TodoEntity> {
    const cacheKey = `todo:${id}`;
    const cached = await this.cacheManager.get<TodoEntity>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (todo) {
      await this.cacheManager.set(cacheKey, todo, { ttl: 300 }); // 5 minutes
    }

    return todo;
  }
}
```

## � MCP Context for AI Assistants

### Available Model Context Protocol Tools
The following MCPs are configured to provide AI assistants with enhanced capabilities and context:

**GitHub MCP**: Repository operations, code analysis, pull request management, and issue tracking
**ClickUp MCP**: Project management context, task tracking, and document management  
**PostgreSQL MCP**: Database query capabilities and schema exploration
**Shadcn/UI MCP**: Component library access and UI consistency guidance
**Playwright MCP**: Browser automation context for web-related development

These tools inform AI assistants about available capabilities but are not integrated into the project codebase.

## �🔧 Development Workflow

### Implementation Steps
1. **Planning Phase**
   - Review PRD and technical requirements
   - Design database schema and API endpoints
   - Create ADR for technical decisions

2. **Setup Phase**
   - Create module structure
   - Set up database entities and migrations
   - Configure dependency injection

3. **Implementation Phase**
   - Implement service layer with business logic
   - Create controller with API endpoints
   - Add validation and error handling
   - Implement authentication and authorization

4. **Documentation Phase**
   - Generate Swagger API documentation
   - Update README with setup instructions
   - Document environment variables and configuration

### AI Collaboration Tips
- Always provide complete context about existing codebase and architecture
- Ask for explanations of generated code to understand decisions
- Request multiple implementation options for complex features
- Iterate on generated code with specific feedback
- Verify AI suggestions against established patterns and security best practices
- Leverage available MCP tools for enhanced development capabilities

---

**Remember:** Customize this template for your specific project needs, including your actual tech stack, patterns, and conventions.