TABIST APP
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Configuration
1. cd folder project after clone from git repository
2. Use command: `copy .env.example .env` to terminal and run it.
3. Use command: `docker-compose up -d`
4. Use Dbeaver or Phpmyadmin or Mysql Workbench connect to `tabist` database amd use sql is:
```
  CREATE TABLE players (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    score DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL
  );
```
5. Run app use command: `npm run start`
6. Import file `Tabist.postman_collection.json` in source code to Postman GUI
7. You can test API RestFul in Postman GUI 
8. Run test app use command: `npm run test`
9. Check test coverage app use command: `npm run test:cov`

## Regards
Tks you for read my README.md