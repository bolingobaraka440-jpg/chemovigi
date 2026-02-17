// Email Validation Utility - Ensures only REAL emails can register

/**
 * Validates email format and checks against common fake email patterns
 * @param email - Email address to validate
 * @returns Object with isValid boolean and error message if invalid
 */
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  // 1. Check if email is provided
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }

  // 2. Basic format validation (RFC 5322 compliant)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address (e.g., name@example.com)' };
  }

  // 3. Extract domain from email
  const domain = email.split('@')[1]?.toLowerCase();
  
  if (!domain) {
    return { isValid: false, error: 'Invalid email format - missing domain' };
  }

  // 4. Block common fake/temporary email domains
  const fakeDomains = [
    'fake.com',
    'test.com',
    'example.com',
    'localhost',
    'temp-mail.org',
    'guerrillamail.com',
    '10minutemail.com',
    'throwaway.email',
    'mailinator.com',
    'maildrop.cc',
    'tempmail.com',
    'yopmail.com',
    'fakeinbox.com',
    'trashmail.com',
    'sharklasers.com',
  ];

  if (fakeDomains.includes(domain)) {
    return { 
      isValid: false, 
      error: 'Please use a real email address. Temporary/fake email services are not allowed.' 
    };
  }

  // 5. Block emails without proper TLD
  const domainParts = domain.split('.');
  if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) {
    return { isValid: false, error: 'Please use a valid email domain (e.g., gmail.com, outlook.com)' };
  }

  // 6. Block common typos in popular domains
  const typoMap: { [key: string]: string } = {
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
  };

  if (typoMap[domain]) {
    return { 
      isValid: false, 
      error: `Did you mean ${email.split('@')[0]}@${typoMap[domain]}?` 
    };
  }

  // 7. All checks passed - email is valid
  return { isValid: true };
};

/**
 * List of trusted email providers (for display purposes)
 */
export const trustedEmailProviders = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'yahoo.com',
  'icloud.com',
  'protonmail.com',
  'aol.com',
  'zoho.com',
  'mail.com',
  'yandex.com',
];

/**
 * Checks if email domain is from a trusted provider
 * @param email - Email address to check
 * @returns boolean
 */
export const isTrustedProvider = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  return trustedEmailProviders.includes(domain);
};
