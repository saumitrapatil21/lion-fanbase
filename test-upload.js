#!/usr/bin/env node

/**
 * Test Runner for Upload Functionality
 * 
 * This script runs comprehensive tests for the lion website upload functionality.
 * It includes unit tests, integration tests, and edge case testing.
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🦁 Lion Website Upload Functionality Test Suite 🦁\n');

const testCommands = [
  {
    name: 'Gallery Component Tests',
    command: 'npm test -- --testPathPattern=Gallery.test.js --verbose',
    description: 'Tests the main Gallery component with upload functionality'
  },
  {
    name: 'Upload Functionality Unit Tests',
    command: 'npm test -- --testPathPattern=UploadFunctionality.test.js --verbose',
    description: 'Tests upload functionality in isolation'
  },
  {
    name: 'All Upload Related Tests',
    command: 'npm test -- --testPathPattern="(Gallery|Upload)" --verbose',
    description: 'Runs all upload-related tests'
  }
];

function runTest(testConfig) {
  console.log(`\n📋 Running: ${testConfig.name}`);
  console.log(`📝 Description: ${testConfig.description}`);
  console.log(`⚡ Command: ${testConfig.command}\n`);
  
  try {
    const output = execSync(testConfig.command, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log(`✅ ${testConfig.name} - PASSED\n`);
    return true;
  } catch (error) {
    console.log(`❌ ${testConfig.name} - FAILED\n`);
    console.error(error.message);
    return false;
  }
}

function runAllTests() {
  console.log('🚀 Starting Upload Functionality Test Suite...\n');
  
  let passedTests = 0;
  let totalTests = testCommands.length;
  
  for (const testConfig of testCommands) {
    if (runTest(testConfig)) {
      passedTests++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 ALL TESTS PASSED! Upload functionality is working perfectly! 🎉');
    console.log('🦁 Your lion website upload feature is ready for kids to use! 🦁');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the output above for details.');
  }
  
  console.log('\n📋 Test Coverage Areas:');
  console.log('  • File upload via click');
  console.log('  • Drag and drop functionality');
  console.log('  • Multiple file handling');
  console.log('  • Success message display');
  console.log('  • Image removal functionality');
  console.log('  • Gallery filter integration');
  console.log('  • Lightbox integration');
  console.log('  • Error handling');
  console.log('  • Accessibility features');
  console.log('  • Performance optimization');
  console.log('  • State management');
  console.log('  • Edge cases and validation\n');
}

// Check if specific test is requested
const args = process.argv.slice(2);
if (args.length > 0) {
  const testIndex = parseInt(args[0]) - 1;
  if (testIndex >= 0 && testIndex < testCommands.length) {
    runTest(testCommands[testIndex]);
  } else {
    console.log('❌ Invalid test number. Available tests:');
    testCommands.forEach((test, index) => {
      console.log(`  ${index + 1}. ${test.name}`);
    });
  }
} else {
  runAllTests();
}

// Export for programmatic use
module.exports = {
  runAllTests,
  runTest,
  testCommands
};
