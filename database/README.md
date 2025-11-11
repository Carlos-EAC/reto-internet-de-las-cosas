# Terminal commands to create full database

To backup database, both structure and data:\
`mysqldump -u root -p iot_challenge > iot_challenge_dump.sql`\
To share with others, share iot_challenge_dump.sql.\
\
\
To restore database:\
`mysql -u root -p -e "DROP DATABASE IF EXISTS iot_challenge"`\
`mysql -u root -p -e "CREATE DATABASE iot_challenge"`\
`mysql -u root -p -D iot_challenge < iot_challenge_dump.sql`
