FROM albertoferbcn/docker-nginx-node-yarn:latest
# Copy folder and install npm deps
COPY . /app/

COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app/

RUN npm install

CMD npx webpack && cp -r ./dist/* /usr/share/nginx/html && ls /usr/share/nginx/html && nginx
EXPOSE 80
