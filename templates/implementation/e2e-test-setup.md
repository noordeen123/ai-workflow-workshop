# E2E Test Generation Guide

## 🎯 Purpose
This guide provides a structured approach to generating comprehensive E2E tests by analyzing PRDs from ClickUp and code changes from GitHub PRs. The workflow uses Playwright with NLP for quick validation, then generates formal Cypress test suites.

## 📋 Pre-Test Generation Checklist
Before generating E2E tests:

- [ ] **PRD Available:** Feature requirements documented in ClickUp
- [ ] **PR Created:** Code changes available in GitHub PR
- [ ] **Feature Implemented:** Backend and frontend changes complete
- [ ] **Basic Manual Testing:** Core functionality verified manually
- [ ] **MCP Tools:** ClickUp MCP and GitHub MCP configured and available

## 🏗️ Test Generation Workflow

### Available Model Context Protocol (MCP) Tools
The workspace has the following MCP servers configured in `.vscode/mcp.json` to inform AI assistants about available capabilities:

1. **ClickUp MCP** (`@taazkareem/clickup-mcp-server@latest`)
   - PRD document access and analysis
   - Feature requirement extraction
   - Acceptance criteria identification
   - User story mapping
   - Configured with: Team ID 37484951, Document support enabled

2. **GitHub MCP** (`@modelcontextprotocol/server-github@2025.4.8`)
   - PR analysis and file changes
   - Code diff examination
   - Implementation verification
   - Test scope determination
   - Requires: GitHub Personal Access Token

3. **Playwright MCP** (`@playwright/mcp@latest`)
   - Natural language test generation
   - Browser automation with NLP
   - Quick validation and exploration
   - Test scenario discovery
   - Isolated browser contexts with storage state

> **Note:** These MCPs are configured to inform AI assistants about available tools and capabilities, not for direct project integration.

### Test Generation Process
```
1. PRD Analysis (ClickUp MCP) → Extract requirements and acceptance criteria
2. PR Analysis (GitHub MCP) → Understand implementation changes  
3. NLP Testing (Playwright MCP) → Quick validation with natural language
4. User Verification → Validate test scenarios are correct
5. Cypress Generation → Create formal test suite
```

## 🤖 AI Prompting Templates

### Step 1: PRD Analysis with ClickUp MCP
```
# Context
Analyze the PRD document from ClickUp to extract testable requirements for [FEATURE_NAME].

## ClickUp MCP Integration
Use the following MCP tools to gather PRD context:
- mcp_clickup_get_document: Get the main PRD document
- mcp_clickup_get_document_pages: Get specific sections/pages
- mcp_clickup_list_documents: Find related documents

## PRD Analysis Template
Please analyze the PRD and extract:

### Feature Requirements
- **Primary User Stories:** What are the main user workflows?
- **Acceptance Criteria:** What defines success for each user story?
- **Business Rules:** What logic needs to be validated?
- **Edge Cases:** What error conditions should be tested?
- **UI/UX Requirements:** What visual/interaction elements need validation?

### Test Scenarios Identification
From the PRD, identify:
1. **Happy Path Scenarios:** Core functionality working as expected
2. **Alternative Flows:** Different ways users might achieve the same goal
3. **Error Handling:** How the system should behave when things go wrong
4. **Boundary Conditions:** Limits, constraints, and edge cases
5. **Integration Points:** How this feature interacts with others

## Expected Output
Generate a structured test plan with:
- User journey maps
- Acceptance criteria checklist
- Test scenario priorities (Critical/High/Medium/Low)
- Data requirements for testing
- Environment/setup prerequisites

Please analyze the PRD at document ID: [DOCUMENT_ID] and generate comprehensive test scenarios.
```

### Step 2: PR Analysis with GitHub MCP
```
# Context
Analyze the GitHub PR changes to understand implementation scope for [FEATURE_NAME] testing.

## GitHub MCP Integration
Use the following MCP tools to analyze implementation:
- mcp_github_get_pull_request: Get PR details and description
- mcp_github_get_pull_request_files: Get list of changed files
- mcp_github_get_file_contents: Examine specific file changes
- mcp_github_get_pull_request_commits: Review commit history

## PR Analysis Template
Based on the PR analysis, determine:

### Implementation Scope
- **Frontend Changes:** Which UI components/pages were modified?
- **Backend Changes:** Which APIs/endpoints were added/modified?
- **Database Changes:** Any schema or data model updates?
- **Configuration Changes:** Environment or build configuration updates?

### Test Impact Analysis
Identify what needs testing based on changes:
1. **New Functionality:** Features that didn't exist before
2. **Modified Behavior:** Existing features with changed behavior  
3. **Integration Points:** How changes affect other parts of the system
4. **Regression Risk:** Existing functionality that might be impacted

### Test Data Requirements
Based on implementation changes:
- **Database Setup:** What test data is needed?
- **API Mocking:** Which external services need mocking?
- **User Roles:** What types of users/permissions are needed?
- **Environment Config:** What environment setup is required?

## Expected Output
Generate implementation-aware test strategy:
- Files/components that need testing
- API endpoints to validate
- User flows affected by changes
- Regression test requirements
- Test environment setup needs

Please analyze PR #[PR_NUMBER] in repository [OWNER/REPO] and generate test strategy.
```

### Step 3: NLP Validation with Playwright MCP
```
# Context
Use Playwright MCP to quickly validate [FEATURE_NAME] with natural language testing before creating formal test suites.

## Playwright MCP Natural Language Testing
Use Playwright's NLP capabilities to:
- Navigate the application using natural language descriptions
- Validate functionality through conversational testing
- Explore edge cases interactively
- Generate test insights for formal test creation

## NLP Validation Template
Based on PRD requirements and PR changes, perform exploratory testing:

### Quick Validation Scenarios
Using natural language, test the following:

1. **Primary User Journey**
   ```
   Scenario: [Describe main user workflow in plain English]
   Steps:
   - Navigate to [starting point]
   - [Action 1 in natural language]
   - [Action 2 in natural language]
   - Verify [expected outcome]
   ```

2. **Error Handling Validation**
   ```
   Scenario: [Describe error condition]
   Steps:
   - Set up [error condition]
   - Attempt [action that should fail]
   - Verify [appropriate error handling]
   ```

3. **Integration Testing**
   ```
   Scenario: [Describe feature interaction]
   Steps:
   - Use [Feature A]
   - Then use [Feature B]  
   - Verify [combined behavior]
   ```

## NLP Testing Pattern
```typescript
// Playwright MCP Natural Language Testing
import { test, expect } from '@playwright/test';

test.describe('NLP Validation for [Feature]', () => {
  test('validate primary user journey', async ({ page }) => {
    // Use natural language to describe actions
    await page.goto('/app');
    
    // Natural language interaction
    await page.getByRole('button', { name: /create new/i }).click();
    await page.getByLabel(/title/i).fill('Test Item');
    await page.getByRole('button', { name: /save/i }).click();
    
    // Natural language assertion
    await expect(page.getByText('Test Item')).toBeVisible();
  });
  
  test('explore edge cases interactively', async ({ page }) => {
    // Interactive testing - let AI explore
    // Based on PRD requirements and implementation
  });
});
```

## Expected Output
Generate validation report with:
- What works as expected
- What doesn't match requirements
- Edge cases discovered
- Performance observations
- Accessibility issues found
- Recommendations for formal test suite

Please validate the implementation against PRD requirements using natural language testing.
```

### Step 4: User Verification Prompt
```
# Context
Review the NLP validation results and confirm test scenarios before generating formal Cypress test suite.

## Validation Review
Based on the Playwright NLP validation results:

### Review Questions
1. **Requirement Coverage:** Do the test scenarios cover all PRD requirements?
2. **Implementation Alignment:** Do tests match the actual PR implementation?
3. **Edge Case Coverage:** Are important edge cases included?
4. **User Experience:** Do tests reflect realistic user workflows?
5. **Test Data Validity:** Is the test data realistic and comprehensive?

### Scenario Verification
For each identified test scenario:
- ✅ **Approved:** Scenario accurately tests requirement
- ⚠️ **Needs Adjustment:** Scenario needs modification
- ❌ **Remove:** Scenario not needed or incorrect
- ➕ **Add:** Additional scenario needed

### Expected Feedback Format
```
Scenario: [Scenario Name]
Status: [Approved/Needs Adjustment/Remove/Add]
Comments: [Specific feedback or modifications needed]
Priority: [Critical/High/Medium/Low]
```

## Next Steps
Once scenarios are verified:
1. Finalize test scenario list
2. Prioritize test execution order
3. Confirm test data requirements
4. Proceed to Cypress test generation

Please review the validation results and provide scenario approval.
```

### Step 5: Cypress Test Suite Generation
```
# Context
Generate comprehensive Cypress test suite based on verified scenarios from NLP validation.

## Cypress Test Generation Requirements
Based on approved scenarios, generate:

### Test Structure
```typescript
// Cypress Test Suite Pattern
describe('[Feature Name] - E2E Tests', () => {
  beforeEach(() => {
    // Setup test environment
    cy.setupTestData('[feature-test-data]');
    cy.login('[test-user]');
  });

  afterEach(() => {
    // Cleanup test data
    cy.cleanupTestData('[feature-test-data]');
  });

  describe('Critical User Journeys', () => {
    it('should complete primary workflow successfully', () => {
      // Test implementation based on verified scenarios
    });
  });

  describe('Error Handling', () => {
    it('should handle [specific error] gracefully', () => {
      // Error scenario testing
    });
  });

  describe('Integration Testing', () => {
    it('should work with [related feature]', () => {
      // Integration testing
    });
  });
});
```

### Page Object Models
Generate reusable page objects:
```typescript
// Page Object Model for new feature
export class FeaturePage {
  // Selectors based on actual implementation
  private selectors = {
    mainContainer: '[data-testid="feature-container"]',
    actionButton: '[data-testid="action-button"]',
    resultDisplay: '[data-testid="result-display"]'
  };

  // Actions based on user workflows
  createItem(data: ItemData) {
    cy.get(this.selectors.actionButton).click();
    // Implementation based on verified scenarios
  }

  verifyResult(expectedResult: string) {
    cy.get(this.selectors.resultDisplay)
      .should('contain.text', expectedResult);
  }
}
```

### Custom Commands
Generate reusable commands:
```typescript
// Custom Cypress commands for feature
Cypress.Commands.add('setupFeatureTestData', (scenario: string) => {
  // Setup test data based on scenarios
});

Cypress.Commands.add('validateFeatureState', (expectedState: any) => {
  // Validation helpers
});
```

### Test Data Management
```typescript
// Test fixtures based on verified scenarios
export const testData = {
  validInputs: [
    { /* realistic test data */ }
  ],
  invalidInputs: [
    { /* error condition data */ }
  ],
  edgeCases: [
    { /* boundary condition data */ }
  ]
};
```

## Implementation Requirements
1. **Comprehensive Coverage:** All approved scenarios implemented
2. **Maintainable Code:** Clean, reusable page objects and commands
3. **Realistic Data:** Test data that matches production scenarios
4. **Error Handling:** Robust error condition testing
5. **Performance Aware:** Tests that validate reasonable response times
6. **Accessibility:** Include accessibility validation where applicable

## Expected Output
Generate complete Cypress test suite with:
- All test files implementing approved scenarios
- Page Object Models for new components
- Custom commands for reusable actions
- Test fixtures with realistic data
- Configuration for CI/CD integration
- Documentation for test maintenance

Please generate the Cypress test suite based on the verified scenarios.
```

## 📝 MCP Context for AI Assistants

### Available Model Context Protocol Tools
The following MCPs are configured to provide AI assistants with enhanced capabilities and context:

**ClickUp MCP**: PRD document access, requirement extraction, and user story analysis
**GitHub MCP**: PR analysis, code change detection, and implementation verification
**Playwright MCP**: Natural language testing, browser automation, and validation workflows

These tools inform AI assistants about available capabilities but are not integrated into the project codebase.

## 🔧 Development Workflow

### Implementation Steps
1. **PRD Analysis Phase**
   - Extract requirements from ClickUp documents
   - Identify acceptance criteria and user stories
   - Map business rules to test scenarios

2. **PR Analysis Phase**
   - Analyze code changes and implementation scope
   - Identify affected components and APIs
   - Determine test coverage requirements

3. **NLP Validation Phase**
   - Use Playwright MCP for quick exploratory testing
   - Validate requirements against implementation
   - Identify gaps and edge cases

4. **User Verification Phase**
   - Review and approve test scenarios
   - Prioritize test execution order
   - Finalize test data requirements

5. **Cypress Generation Phase**
   - Generate formal test suite based on approved scenarios
   - Create maintainable page objects and commands
   - Set up CI/CD integration

### AI Collaboration Tips
- Always start with PRD analysis to understand requirements
- Use PR analysis to focus testing on actual changes
- Leverage NLP testing for quick validation before formal test creation
- Verify scenarios with stakeholders before generating final test suite
- Iterate between validation and formal test generation as needed

---

**Remember:** This template focuses on AI-driven test generation workflow. Customize the prompts and process based on your specific project needs, PRD format, and testing requirements.

### Setup Phase
- [ ] Install Playwright and Cypress
- [ ] Configure test environments
- [ ] Set up GitHub MCP integration
- [ ] Create base Page Object Models
- [ ] Configure CI/CD pipeline

### Development Phase  
- [ ] Analyze PR changes using GitHub MCP
- [ ] Generate test scenarios with Playwright MCP
- [ ] Create comprehensive test suites
- [ ] Implement cross-browser testing
- [ ] Add accessibility and performance tests

### Execution Phase
- [ ] Run tests in parallel across browsers
- [ ] Generate detailed test reports
- [ ] Analyze test coverage and gaps
- [ ] Update documentation
- [ ] Monitor test stability and performance

---

**Remember:** This template integrates AI-powered test generation with traditional E2E testing best practices. Customize the prompts and configurations based on your specific project needs, PR workflows, and testing requirements.