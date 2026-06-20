import { test, expect } from '@playwright/test';

test('Test Case 1', {tag: '@smoke'},async () => {
    console.log('This is test case 1');
});

test('Test Case 2',{tag: '@sanity'}, async () => {
    console.log('This is test case 2');
});

test('Test Case 3',{tag:[ '@smoke', '@sanity']}, async () => {
    console.log('This is test case 3');
});