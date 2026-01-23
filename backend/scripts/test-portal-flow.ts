#!/usr/bin/env bun

/**
 * Partner Portal Flow Verification Script
 * Tests the complete flow from registration to dashboard retrieval
 */

import postgres from "postgres";

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

const log = {
  info: (msg: string) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg: string) =>
    console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg: string) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warn: (msg: string) =>
    console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  step: (msg: string) =>
    console.log(`${colors.cyan}${colors.bright}${msg}${colors.reset}`),
};

// Configuration
const API_URL = process.env.API_URL || "http://localhost:3000";
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  log.error("DATABASE_URL environment variable is required");
  process.exit(1);
}

// Generate random test data
const generateTestData = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);

  return {
    name: `Test User ${randomNum}`,
    email: `testuser${timestamp}@test.com`,
    phone: `08${Math.floor(10000000 + Math.random() * 90000000)}`,
    affiliateCode: `TEST${randomNum}`,
    lineUserId: `U${timestamp}${randomNum}abcdef`,
    pdpaConsent: true,
  };
};

async function main() {
  console.log("\n");
  log.step("═══════════════════════════════════════════════════════");
  log.step("  Partner Portal Flow Verification Script");
  log.step("═══════════════════════════════════════════════════════");
  console.log("\n");

  const testData = generateTestData();
  let testAffiliateId: number | null = null;

  // Connect to database for verification
  const sql = postgres(DATABASE_URL, {
    ssl: "require",
    max: 1,
  });

  try {
    // ========================================
    // STEP 1: Simulate Registration
    // ========================================
    log.step("\n📝 STEP 1: Simulate Registration");
    log.info(`Testing with data:`);
    console.log(`   Name: ${testData.name}`);
    console.log(`   Email: ${testData.email}`);
    console.log(`   Phone: ${testData.phone}`);
    console.log(`   Affiliate Code: ${testData.affiliateCode}`);
    console.log(`   LINE User ID: ${testData.lineUserId}`);

    const registerResponse = await fetch(`${API_URL}/api/register-affiliate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData),
    });

    const registerData = await registerResponse.json();

    if (!registerResponse.ok) {
      log.error(`Registration failed: ${registerData.message}`);
      throw new Error("Registration failed");
    }

    if (!registerData.success) {
      log.error(`Registration unsuccessful: ${registerData.message}`);
      throw new Error("Registration unsuccessful");
    }

    testAffiliateId = registerData.affiliateId;

    log.success(`Registration successful!`);
    console.log(`   Affiliate ID: ${registerData.affiliateId}`);
    console.log(`   Affiliate Code: ${registerData.affiliateCode}`);
    console.log(`   Email Sent: ${registerData.emailSent}`);

    // ========================================
    // STEP 2: Verify Database (Local)
    // ========================================
    log.step("\n🔍 STEP 2: Verify Database (Local)");
    log.info("Querying affiliates table by lineUserId...");

    const dbResult = await sql`
      SELECT id, name, email, phone, affiliate_code, line_user_id, created_at
      FROM affiliates
      WHERE line_user_id = ${testData.lineUserId}
      LIMIT 1
    `;

    if (dbResult.length === 0) {
      log.error("No record found in database!");
      throw new Error("Database verification failed");
    }

    const dbRecord = dbResult[0];

    log.success("Database record found!");
    console.log(`   ID: ${dbRecord.id}`);
    console.log(`   Name: ${dbRecord.name}`);
    console.log(`   Email: ${dbRecord.email}`);
    console.log(`   Phone: ${dbRecord.phone}`);
    console.log(`   Affiliate Code: ${dbRecord.affiliate_code}`);
    console.log(`   LINE User ID: ${dbRecord.line_user_id}`);
    console.log(`   Created At: ${dbRecord.created_at}`);

    // Assertions
    if (dbRecord.line_user_id !== testData.lineUserId) {
      log.error(
        `LINE User ID mismatch! Expected: ${testData.lineUserId}, Got: ${dbRecord.line_user_id}`
      );
      throw new Error("LINE User ID mismatch");
    }

    if (dbRecord.affiliate_code !== testData.affiliateCode) {
      log.error(
        `Affiliate Code mismatch! Expected: ${testData.affiliateCode}, Got: ${dbRecord.affiliate_code}`
      );
      throw new Error("Affiliate Code mismatch");
    }

    log.success("All database assertions passed!");

    // ========================================
    // STEP 3: Test Dashboard API
    // ========================================
    log.step("\n📊 STEP 3: Test Dashboard API");
    log.info(`Calling GET /api/affiliate/dashboard/${testData.lineUserId}...`);

    const dashboardResponse = await fetch(
      `${API_URL}/api/affiliate/dashboard/${testData.lineUserId}`
    );

    const dashboardData = await dashboardResponse.json();

    if (!dashboardResponse.ok) {
      log.error(`Dashboard API failed: ${dashboardData.message}`);
      throw new Error("Dashboard API failed");
    }

    if (!dashboardData.success) {
      log.error(`Dashboard API unsuccessful: ${dashboardData.message}`);
      throw new Error("Dashboard API unsuccessful");
    }

    log.success("Dashboard API successful!");
    console.log("\n   Affiliate Info:");
    console.log(`   - Name: ${dashboardData.data.affiliate.name}`);
    console.log(`   - Email: ${dashboardData.data.affiliate.email}`);
    console.log(`   - Phone: ${dashboardData.data.affiliate.phone}`);
    console.log(
      `   - Affiliate Code: ${dashboardData.data.affiliate.affiliateCode}`
    );

    console.log("\n   Stats:");
    console.log(
      `   - Total Registrations: ${dashboardData.data.stats.totalRegistrations}`
    );
    console.log(
      `   - Total Commission: ${dashboardData.data.stats.totalCommission}`
    );
    console.log(
      `   - Approved Commission: ${dashboardData.data.stats.approvedCommission}`
    );
    console.log(
      `   - Pending Commission: ${dashboardData.data.stats.pendingCommission}`
    );

    // Assertions
    if (
      dashboardData.data.affiliate.affiliateCode !== testData.affiliateCode
    ) {
      log.error(
        `Affiliate Code mismatch in dashboard! Expected: ${testData.affiliateCode}, Got: ${dashboardData.data.affiliate.affiliateCode}`
      );
      throw new Error("Dashboard affiliate code mismatch");
    }

    if (dashboardData.data.affiliate.email !== testData.email) {
      log.error(
        `Email mismatch in dashboard! Expected: ${testData.email}, Got: ${dashboardData.data.affiliate.email}`
      );
      throw new Error("Dashboard email mismatch");
    }

    log.success("All dashboard API assertions passed!");

    // Note about stats
    if (dashboardData.data.stats.totalRegistrations === 0) {
      log.warn(
        "Stats are zero (expected for new test affiliate not in Main System DB)"
      );
    }

    // ========================================
    // STEP 4: Cleanup
    // ========================================
    log.step("\n🧹 STEP 4: Cleanup");
    log.info("Deleting test user from database...");

    const deleteResult = await sql`
      DELETE FROM affiliates
      WHERE line_user_id = ${testData.lineUserId}
      RETURNING id
    `;

    if (deleteResult.length > 0) {
      log.success(`Test user deleted (ID: ${deleteResult[0].id})`);
    } else {
      log.warn("No test user found to delete");
    }

    // ========================================
    // Summary
    // ========================================
    log.step("\n═══════════════════════════════════════════════════════");
    log.step("  ✅ ALL TESTS PASSED!");
    log.step("═══════════════════════════════════════════════════════");
    console.log("\n");
    log.success("Partner Portal implementation is working correctly!");
    console.log("\n");

    process.exit(0);
  } catch (error: any) {
    log.step("\n═══════════════════════════════════════════════════════");
    log.step("  ❌ TEST FAILED");
    log.step("═══════════════════════════════════════════════════════");
    console.log("\n");
    log.error(`Error: ${error.message}`);
    console.error(error);

    // Cleanup on error
    if (testData.lineUserId) {
      try {
        log.info("\nAttempting cleanup...");
        await sql`
          DELETE FROM affiliates
          WHERE line_user_id = ${testData.lineUserId}
        `;
        log.success("Cleanup completed");
      } catch (cleanupError) {
        log.error("Cleanup failed");
      }
    }

    console.log("\n");
    process.exit(1);
  } finally {
    await sql.end();
  }
}

// Run the script
main();
