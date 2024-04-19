Connect to server

```bash
ssh -i ~/.ssh/digital-ocean-new root@139.59.28.100
```

Run npm run build and rsync the folder to the server

```bash
sh rsync_dist_to_droplet.sh
```

Adding a nginx configuration

```bash
# create a new file in the sites-available directory
sudo vi /etc/nginx/sites-available/{the-name-of-the-site}

# you have to enable the site by creating a symbolic link to the sites-enabled directory
ln -s /etc/nginx/sites-available/{the-name-of-the-site} /etc/nginx/sites-enabled/{the-name-of-the-site}

# check if the configuration is correct
sudo nginx -t

# restart the nginx server
nginx -s reload

```

Expanding certbot

```bash

# expand certbot certification to include the new domain
sudo certbot --nginx --expand -d {new-domain} -d {old-domain}
```
