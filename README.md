https://github.com/yezihaohao/react-admin


#To fix 400 error, add
location /wsapp/ {
     proxy_pass http://wsbackend;  # change the url to your proxy
     proxy_http_version 1.1;
     proxy_set_header Upgrade $http_upgrade;
     proxy_set_header Connection "upgrade";
}
