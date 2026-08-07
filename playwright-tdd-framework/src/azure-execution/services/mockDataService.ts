import { TestCase } from '../types/execution.types.js';

export function getMockTestCases(planId: string, suiteId: string): TestCase[] {
  return [
    {
      id: 'TC-13571',
      title: 'Verify Cookies pop-up display and header contents on Creatio CRM',
      areaPath: 'Creatio CRM',
      assignedTo: 'Bharath Tech Academy <bharattechacademy3@outlook.com>',
      state: 'Design',
      steps: [
        {
          stepId: '1',
          stepNumber: 1,
          action: 'Launch Chrome browser and navigate to Creatio CRM login page (https://accounts.creatio.com/login/alm)',
          expectedResult: 'Application launches successfully and Cookies pop-up banner is displayed.'
        },
        {
          stepId: '2',
          stepNumber: 2,
          action: 'Verify visibility of Cookies pop-up header, description, and action buttons',
          expectedResult: 'Pop-up header text, policy description, Allow All, and Selection buttons are clearly visible.'
        }
      ]
    },
    {
      id: 'TC-13572',
      title: 'Verify Cookies pop-up disappearance after clicking Allow All button',
      areaPath: 'Creatio CRM',
      assignedTo: 'Bharath Tech Academy <bharattechacademy3@outlook.com>',
      state: 'Design',
      steps: [
        {
          stepId: '1',
          stepNumber: 1,
          action: 'Navigate to Creatio CRM login page and wait for Cookies pop-up',
          expectedResult: 'Cookies pop-up banner is displayed on screen.'
        },
        {
          stepId: '2',
          stepNumber: 2,
          action: 'Click on Allow All button in Cookies pop-up',
          expectedResult: 'Cookies pop-up disappears and Login form input fields become active.'
        }
      ]
    },
    {
      id: 'TC-13573',
      title: 'Verify Show Details link expands full cookie category choices',
      areaPath: 'Creatio CRM',
      assignedTo: 'Bharath Tech Academy <bharattechacademy3@outlook.com>',
      state: 'Design',
      steps: [
        {
          stepId: '1',
          stepNumber: 1,
          action: 'Navigate to Creatio CRM login page',
          expectedResult: 'Cookies pop-up is displayed.'
        },
        {
          stepId: '2',
          stepNumber: 2,
          action: 'Click on "Show Details" link on Cookies pop-up',
          expectedResult: 'Expanded view of cookie categories (Necessary, Analytics, Marketing) is displayed.'
        }
      ]
    },
    {
      id: 'TC-13574',
      title: 'Verify successful login with valid business email and password',
      areaPath: 'Creatio CRM',
      assignedTo: 'Bharath Tech Academy <bharattechacademy3@outlook.com>',
      state: 'Design',
      steps: [
        {
          stepId: '1',
          stepNumber: 1,
          action: 'Launch application and accept cookies pop-up',
          expectedResult: 'Login page displayed with Business Email and Password fields.'
        },
        {
          stepId: '2',
          stepNumber: 2,
          action: 'Enter valid email "bharattechacademy5@outlook.com" and password "BharathTechAcademy#1234"',
          expectedResult: 'Input fields accept valid credentials without inline error.'
        },
        {
          stepId: '3',
          stepNumber: 3,
          action: 'Click Log In button',
          expectedResult: 'User is authenticated successfully and redirected to Creatio CRM main dashboard.'
        }
      ]
    },
    {
      id: 'TC-13575',
      title: 'Verify login failure with invalid credentials',
      areaPath: 'Creatio CRM',
      assignedTo: 'Bharath Tech Academy <bharattechacademy3@outlook.com>',
      state: 'Design',
      steps: [
        {
          stepId: '1',
          stepNumber: 1,
          action: 'Navigate to Creatio CRM login page',
          expectedResult: 'Login form is displayed.'
        },
        {
          stepId: '2',
          stepNumber: 2,
          action: 'Enter invalid email "invalid_user@gmail.com" and password "WrongPass123" and click Log In',
          expectedResult: 'Error message "Invalid email or password" is displayed at bottom of login page.'
        }
      ]
    },
    {
      id: 'TC-13576',
      title: 'Verify email field validation error when missing @ symbol',
      areaPath: 'Creatio CRM',
      assignedTo: 'Bharath Tech Academy <bharattechacademy3@outlook.com>',
      state: 'Design',
      steps: [
        {
          stepId: '1',
          stepNumber: 1,
          action: 'Navigate to login page',
          expectedResult: 'Login page loaded.'
        },
        {
          stepId: '2',
          stepNumber: 2,
          action: 'Enter "userdomain.com" in Business Email field and blur input',
          expectedResult: 'Email input field is highlighted red with "Invalid email format" error text.'
        }
      ]
    },
    {
      id: 'TC-13577',
      title: 'Verify email field validation error when domain format is invalid',
      areaPath: 'Creatio CRM',
      assignedTo: 'Bharath Tech Academy <bharattechacademy3@outlook.com>',
      state: 'Design',
      steps: [
        {
          stepId: '1',
          stepNumber: 1,
          action: 'Navigate to login page',
          expectedResult: 'Login page loaded.'
        },
        {
          stepId: '2',
          stepNumber: 2,
          action: 'Enter "user@company" in Business Email field and blur input',
          expectedResult: 'Email field highlighted red with "Invalid email format" error message.'
        }
      ]
    },
    {
      id: 'TC-13578',
      title: 'Verify maximum length boundary check for Business Email field (400 chars)',
      areaPath: 'Creatio CRM',
      assignedTo: 'Bharath Tech Academy <bharattechacademy3@outlook.com>',
      state: 'Design',
      steps: [
        {
          stepId: '1',
          stepNumber: 1,
          action: 'Navigate to login page',
          expectedResult: 'Login page loaded.'
        },
        {
          stepId: '2',
          stepNumber: 2,
          action: 'Enter valid formatted email string of exactly 400 characters',
          expectedResult: 'No validation error displayed and email field remains in valid state.'
        }
      ]
    },
    {
      id: 'TC-13579',
      title: 'Verify email field validation failure when exceeding 400 characters (401 chars)',
      areaPath: 'Creatio CRM',
      assignedTo: 'Bharath Tech Academy <bharattechacademy3@outlook.com>',
      state: 'Design',
      steps: [
        {
          stepId: '1',
          stepNumber: 1,
          action: 'Navigate to login page',
          expectedResult: 'Login page loaded.'
        },
        {
          stepId: '2',
          stepNumber: 2,
          action: 'Enter 401-character email string in Business Email field',
          expectedResult: 'Field highlighted red with "Invalid email format" validation error.'
        }
      ]
    },
    {
      id: 'TC-13580',
      title: 'Verify maximum length boundary check for Password field (100 chars)',
      areaPath: 'Creatio CRM',
      assignedTo: 'Bharath Tech Academy <bharattechacademy3@outlook.com>',
      state: 'Design',
      steps: [
        {
          stepId: '1',
          stepNumber: 1,
          action: 'Navigate to login page',
          expectedResult: 'Login page loaded.'
        },
        {
          stepId: '2',
          stepNumber: 2,
          action: 'Enter valid password string of exactly 100 characters',
          expectedResult: 'No password length error displayed.'
        }
      ]
    },
    {
      id: 'TC-13581',
      title: 'Verify password field validation error when exceeding 100 characters (101 chars)',
      areaPath: 'Creatio CRM',
      assignedTo: 'Bharath Tech Academy <bharattechacademy3@outlook.com>',
      state: 'Design',
      steps: [
        {
          stepId: '1',
          stepNumber: 1,
          action: 'Navigate to login page',
          expectedResult: 'Login page loaded.'
        },
        {
          stepId: '2',
          stepNumber: 2,
          action: 'Enter 101-character password string in Password field',
          expectedResult: 'Password field highlighted red with error "Value must contain up to 100 characters".'
        }
      ]
    },
    {
      id: 'TC-13582',
      title: 'Verify clipboard paste validation behavior in Business Email field',
      areaPath: 'Creatio CRM',
      assignedTo: 'Bharath Tech Academy <bharattechacademy3@outlook.com>',
      state: 'Design',
      steps: [
        {
          stepId: '1',
          stepNumber: 1,
          action: 'Navigate to login page',
          expectedResult: 'Login page loaded.'
        },
        {
          stepId: '2',
          stepNumber: 2,
          action: 'Paste 450-character invalid string into Business Email field via clipboard',
          expectedResult: 'Field immediately validates pasted string and displays red border with error message.'
        }
      ]
    },
    {
      id: 'TC-13583',
      title: 'Verify simultaneous field error highlighting when email and password inputs are invalid',
      areaPath: 'Creatio CRM',
      assignedTo: 'Bharath Tech Academy <bharattechacademy3@outlook.com>',
      state: 'Design',
      steps: [
        {
          stepId: '1',
          stepNumber: 1,
          action: 'Navigate to login page',
          expectedResult: 'Login page loaded.'
        },
        {
          stepId: '2',
          stepNumber: 2,
          action: 'Enter "userdomain" in email field and 105-character password, then click Log In',
          expectedResult: 'Both Email and Password input boxes display red highlight with respective error labels.'
        }
      ]
    },
    {
      id: 'TC-13584',
      title: 'Verify user logout functionality from home page profile dropdown',
      areaPath: 'Creatio CRM',
      assignedTo: 'Bharath Tech Academy <bharattechacademy3@outlook.com>',
      state: 'Design',
      steps: [
        {
          stepId: '1',
          stepNumber: 1,
          action: 'Log in with valid credentials and navigate to home dashboard',
          expectedResult: 'Home page loaded with profile avatar icon.'
        },
        {
          stepId: '2',
          stepNumber: 2,
          action: 'Click profile avatar icon and select Log Out option',
          expectedResult: 'User session is terminated and redirected back to login screen.'
        }
      ]
    },
    {
      id: 'TC-13585',
      title: 'Verify session termination and back-button security after logout',
      areaPath: 'Creatio CRM',
      assignedTo: 'Bharath Tech Academy <bharattechacademy3@outlook.com>',
      state: 'Design',
      steps: [
        {
          stepId: '1',
          stepNumber: 1,
          action: 'Complete logout action from dashboard',
          expectedResult: 'Login page is displayed.'
        },
        {
          stepId: '2',
          stepNumber: 2,
          action: 'Click browser Back button',
          expectedResult: 'User is prevented from viewing cached dashboard and remains on Login page.'
        }
      ]
    }
  ];
}
