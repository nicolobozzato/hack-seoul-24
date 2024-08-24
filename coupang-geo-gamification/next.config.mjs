/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        dbConnectionString: "postgres://postgres:postgres@localhost:5432/postgres"
    }
};

export default nextConfig;
