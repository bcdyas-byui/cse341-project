const usernames = [];

const requestHandler = (req, res) => {
   const url = req.url;
   const method = req.method;
   

   if (url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>Prove 01</title></head>');
      res.write('<body>');
      res.write('<h1>Create a username</h1>');
      res.write('<form action="/create-user" method="POST">');
      res.write('<input type="text" name="newUsername">');
      res.write('<button type="submit">Submit</button>');
      res.write('</form>');
      res.write('</body>');
      res.write('</html>');
      return res.end();
   }
   if (url === '/users') {

      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>Users</title></head>');
      res.write('<body>');
      res.write('<h1>Usernames</h1>');
      
      res.write('<ul>');
      for (const username of usernames) {
        res.write(`<li>${username}</li>`);
      }
      res.write('</ul>');

      res.write('</body>');
      res.write('</html>');
      return res.end();
   }
   if (url === '/create-user' && method === 'POST') {
      const body = [];
      req.on('data', (chunk) => {
         body.push(chunk);
      });
      return req.on('end', () => {
         const parsedBody = Buffer.concat(body).toString();
         const newUsername = parsedBody.split('=')[1];
         console.log(newUsername);
         
         usernames.push(newUsername);

         console.log(`from create-user: ${usernames}`);
         
         res.writeHead(302, { Location: '/' });
         res.end();
      });
   }
};

module.exports = requestHandler;