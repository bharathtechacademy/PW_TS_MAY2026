/**
 * Re-run failed cases from previous suite 1514 execution with fixed locators.
 */
import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';

// Reuse executor helpers by dynamic import of patched file logic is heavy;
// Instead spawn the same file with FILTER_TC_IDS env.
const prev = JSON.parse(fs.readFileSync('ai-generated/_suite_1514_results.json', 'utf8'));
const failedIds = prev.testCases.filter((t) => t.status === 'Fail').map((t) => t.testCaseId);
console.log('Failed IDs to rerun:', failedIds.join(','));
fs.writeFileSync('ai-generated/_rerun_ids.json', JSON.stringify(failedIds));
