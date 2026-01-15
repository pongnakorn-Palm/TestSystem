// Migration script to drop selected_product column from affiliates table
import postgres from "postgres";

const connectionString = Bun.env.DATABASE_URL;

if (!connectionString) {
    console.error("❌ DATABASE_URL not found in environment");
    process.exit(1);
}

const sql = postgres(connectionString, { ssl: "require" });

async function migrate() {
    console.log("🔄 Starting migration: Drop selected_product column");

    try {
        // Drop the selected_product column
        await sql`
            ALTER TABLE affiliates
            DROP COLUMN IF EXISTS selected_product
        `;

        console.log("✅ Migration completed: selected_product column dropped");
        console.log("🎉 Database migration successful!");
    } catch (error) {
        console.error("❌ Migration failed:", error);
        process.exit(1);
    } finally {
        await sql.end();
    }
}

migrate();
