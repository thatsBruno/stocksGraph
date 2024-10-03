## Backend
Run the BE with `node app.js`
- No .gitingnore was used on purpose.


## Database cmds 

```powershell
docker pull postgres

docker run --name postgresdb   -e POSTGRES_USER=myuser   -e POSTGRES_PASSWORD=mysecretpassword   -e POSTGRES_DB=postgresdb   -v $(pwd)/db:/docker-entrypoint-initdb.d/   -p 5432:5432   -d postgres
 
 ```

## Database 
- `http://localhost:80` adminpg
- User: `user@domain.com`
- Pass: `admin`
- Populated through the seed.sql on adminpg

![Untitled](https://github.com/user-attachments/assets/4fc6aba9-e9cf-4604-b2c0-fea1b393542b)


## Schema 

```javascript
  ticker: "string",
    securityName: "string",
    sector: "string",
    country: "string",
    trend: 0.01,
    prices: [
      { date: "1999-01-01", close: "number", volume: "number" },
      { date: "1999-01-01", close: "number", volume: "number" }
    ]
```

## Endpoints

```powershell
GET http://localhost:3000/api/stocks
GET http://localhost:3000/api/stocks/ticker/:ticker
```

