Initial setup

prisma

<!-- Initial setup -->

- npx prisma init --datasource-provider databasename
- npx prisma init --datasource-provider postgresql
- npx prisma init --datasource-provider mysql

<!-- Whenever you do changes to prisma -->
<!-- ! Dev only -->

npx prisma migrate dev --name init

<!-- To format prisma file -->

npx primsa format
